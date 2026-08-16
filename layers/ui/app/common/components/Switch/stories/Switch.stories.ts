import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import Switch from '../Switch.vue'

type SwitchStoryArgs = ComponentProps<typeof Switch>

const renderStates = (args: SwitchStoryArgs) => ({
	components: { Switch },
	setup() { return { args } },
	template: `
		<div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 24px;">
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span style="color: #666; font-size: 12px; line-height: 1;">default</span>
				<Switch v-bind="args" v-model="args.modelValue"  />
			</div>
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span style="color: #666; font-size: 12px; line-height: 1;">disabled</span>
				<Switch v-bind="args" v-model="args.modelValue" disabled />
			</div>
		</div>
	`,
})

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

export const Base: Story = {
	render: renderStates,
}

export const Checked: Story = {
	args: {
		modelValue: true,
	} satisfies Partial<SwitchStoryArgs>,
	render: renderStates,
}

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
