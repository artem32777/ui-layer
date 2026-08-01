import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import Switch from '../Switch.vue'

type SwitchStoryArgs = ComponentProps<typeof Switch>

const meta = {
	title: 'UI/Switch',
	component: Switch,
	argTypes: {
		modelValue: {
			description: 'Включённое состояние переключателя.',
			control: 'boolean',
			table: { type: { summary: 'boolean' } },
		},
		disabled: { control: 'boolean' },
	},
	args: {
		modelValue: false,
		disabled: false,
	} satisfies SwitchStoryArgs,
	render: (args: SwitchStoryArgs) => ({
		components: { Switch },
		setup() { return { args } },
		template: '<Switch v-bind="args" v-model="args.modelValue" />',
	}),
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Unchecked: Story = {}

export const Checked: Story = {
	args: {
		modelValue: true,
	} satisfies Partial<SwitchStoryArgs>,
}
//
// export const Disabled: Story = {
// 	args: {
// 		disabled: true,
// 	} satisfies Partial<SwitchStoryArgs>,
// }

export const Tests: Story = {
	play: async ({ canvas, userEvent }) => {
		const switchControl = canvas.getByRole('switch')

		await expect(switchControl).not.toBeChecked()
		await userEvent.click(switchControl)
		await expect(switchControl).toBeChecked()
		await userEvent.keyboard(' ')
		await expect(switchControl).not.toBeChecked()
	},
}
