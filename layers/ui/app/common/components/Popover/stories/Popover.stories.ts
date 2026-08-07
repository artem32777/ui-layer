import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, waitFor, within } from 'storybook/test'
import { ref } from 'vue'
import Button from '../../Button/Button.vue'
import Input from '../../Input/Input.vue'
import Popover from '../Popover.vue'

type PopoverStoryArgs = ComponentProps<typeof Popover>

const meta = {
	title: 'UI/Popover',
	component: Popover,
	parameters: { a11y: { test: 'error' } },
	argTypes: { modelValue: { description: 'Открыт ли поповер.' } },
	args: {
		modelValue: false,
		offset: 6,
		side: 'bottom',
	} satisfies PopoverStoryArgs,
	render: (args: PopoverStoryArgs) => ({
		components: { Button, Input, Popover },
		setup() {
			const link = ref('https://example.com/docs/share/abc123')
			return { args, link }
		},
		template: `
			<Popover v-model="args.modelValue" v-bind="args">
				<Button text="Share" />

				<template #content="{ close }">
					<div style="display: flex; flex-direction: column; gap: 16px; width: 280px;">
						
						<div style="display: flex; flex-direction: column; gap: 4px;">
							<p style="margin: 0; font-weight: 600;">Share document</p>
							<p style="margin: 0; font-size: 14px; line-height: 1.4; opacity: 0.65;">
								Anyone with the link can view this document. Copy it or send it to your team.
							</p>
						</div>

						<label style="display: flex; flex-direction: column; gap: 6px; font-size: 13px;">
							Link
							<Input v-model="link" size="sm" />
						</label>

						<div style="display: flex; justify-content: flex-end; gap: 8px;">
							<Button text="Copy link" variant="outline" />
							<Button text="Done" @click="close" />
						</div>
					</div>
				</template>
			</Popover>
		`,
	}),
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {}

export const Opened: Story = {
	args: {
		modelValue: true,
		side: 'top',
	},
	parameters: {
		layout: 'centered',
	},
}

export const Tests: Story = {
	args: {
		side: 'top',
	},
	play: async ({ canvas, canvasElement, userEvent }) => {
		const trigger = canvas.getByRole('button', { name: 'Share' })
		const body = within(canvasElement.ownerDocument.body)

		await userEvent.click(trigger)
		await waitFor(() => expect(body.getByRole('dialog')).toBeVisible())
		await expect(body.getByRole('dialog')).toHaveAttribute('data-side', 'bottom')
		await expect(body.getByText('Share document')).toBeVisible()
		await expect(body.getByLabelText('Link')).toBeVisible()

		await userEvent.click(body.getByRole('button', { name: 'Done' }))
		await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument())
		await expect(trigger).toHaveFocus()
	},
}
