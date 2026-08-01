import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, waitFor } from 'storybook/test'
import Tabs from '../Tabs.vue'

type TabsStoryArgs = ComponentProps<typeof Tabs>

const meta = {
	title: 'UI/Tabs',
	component: Tabs,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		modelValue: { control: 'select', options: ['account', 'password'] },
	},
	args: {
		modelValue: 'account',
	} satisfies TabsStoryArgs,
	render: (args: TabsStoryArgs) => ({
		components: { Tabs },
		setup() { return { args } },
		template: '<Tabs v-model="args.modelValue" />',
	}),
} satisfies Meta<typeof Tabs>

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
