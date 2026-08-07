import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ConcreteComponent } from 'vue'
import { expect, waitFor } from 'storybook/test'
import Tabs from '../Tabs.vue'
import tabsTypesSource from '../Tabs.types.ts?raw'
import type { ComponentProps } from 'vue-component-type-helpers'

type TabsStoryArgs = ComponentProps<typeof Tabs>

const meta = {
	title: 'UI/Tabs',
	component: Tabs as unknown as ConcreteComponent<TabsStoryArgs>,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		modelValue: {
			control: 'select',
			options: ['account', 'password'],
			description: 'Значение активной вкладки. Нужно только если необходимо управление табами из родителя.',
		},
		items: {
			control: 'object',
			table: {
				type: {
					summary: 'TabsTitle[]',
					detail: tabsTypesSource.trim(),
				},
			},
		},
	},
	args: {
		modelValue: 'account',
		items: [
			{ value: 'account', label: 'Account' },
			{ value: 'password', label: 'Password' },
		],
	} satisfies TabsStoryArgs,
	render: (args: TabsStoryArgs) => ({
		components: { Tabs },
		setup() { return { args } },
		template: `
			<Tabs
				v-model="args.modelValue"
				:items="args.items"
				:aria-label="args.ariaLabel"
			>
				<template #account>
					Make changes to your account here.
				</template>

				<template #password>
					Change your password here.
				</template>
			</Tabs>
		`,
	}),
} satisfies Meta<TabsStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Account: Story = {}
export const Password: Story = { args: { modelValue: 'password' } }

export const Tests: Story = {
	play: async ({ canvas, userEvent }) => {
		const accountTab = canvas.getByRole('tab', { name: 'Account' })
		const passwordTab = canvas.getByRole('tab', { name: 'Password' })

		await expect(accountTab).toHaveAttribute('aria-selected', 'true')
		await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Make changes to your account here.')

		await userEvent.click(passwordTab)
		await waitFor(() => expect(passwordTab).toHaveAttribute('aria-selected', 'true'))
		await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Change your password here.')

		await userEvent.keyboard('{ArrowLeft}')
		await waitFor(() => expect(accountTab).toHaveAttribute('aria-selected', 'true'))
		await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Make changes to your account here.')
	},
}
