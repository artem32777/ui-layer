import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, waitFor, within } from 'storybook/test'
import Modal from '../Modal.vue'

type ModalStoryArgs = ComponentProps<typeof Modal>

const meta = {
	title: 'UI/Modal',
	component: Modal,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		modelValue: {
			description: 'Открыто ли модальное окно.',
			control: 'boolean',
		},
	},
	args: {
		modelValue: false,
		hideCloseBtn: false,
		variant: 'fullscreen-mobile',
		title: 'Заголовок модального окна',
		subtitle: 'Заголовок модального окна',
	} satisfies ModalStoryArgs,
	render: (args: ModalStoryArgs) => ({
		components: { Modal },
		setup() { return { args } },
		template: `
			<Modal v-model="args.modelValue" v-bind="args">
				<template #trigger>
					<button type="button">Click Open modal</button>
				</template>

				<template #content>
					Modal content
				</template>
			</Modal>
		`,
	}),
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Opened: Story = {
	args: {
		modelValue: true,
	} satisfies Partial<ModalStoryArgs>,
}

export const Closed: Story = {}

export const Tests: Story = {
	play: async ({ canvas, canvasElement, userEvent }) => {
		const bodyElement = canvasElement.ownerDocument.body
		const initialBodyOverflow = bodyElement.style.overflow

		await userEvent.click(canvas.getByRole('button', { name: 'Click Open modal' }))

		const body = within(bodyElement)

		await waitFor(() => expect(body.getByRole('dialog', { name: 'Заголовок модального окна' })).toBeVisible())
		await waitFor(() => expect(bodyElement).toHaveStyle({ overflow: 'hidden' }))
		await userEvent.click(body.getByRole('button', { name: 'Close' }))
		await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument())
		await waitFor(() => expect(bodyElement.style.overflow).toBe(initialBodyOverflow))
	},
}
