import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import Toggle from '../Toggle.vue'

type ToggleStoryArgs = ComponentProps<typeof Toggle>

const meta = {
	title: 'UI/Toggle',
	component: Toggle,
	argTypes: {
		modelValue: { control: 'boolean' },
		disabled: { control: 'boolean' },
		variant: { control: 'select', options: [undefined, 'outline'] },
		size: { control: 'select', options: [undefined, 'sm', 'lg'] },
	},
	args: {
		modelValue: false,
		disabled: false,
	} satisfies ToggleStoryArgs,
	render: (args: ToggleStoryArgs) => ({
		components: { Toggle },
		setup() { return { args } },
		template: '<Toggle v-model="args.modelValue" v-bind="args">B</Toggle>',
	}),
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {}
export const Pressed: Story = { args: { modelValue: true } }
export const Outline: Story = { args: { variant: 'outline' } }
export const Disabled: Story = { args: { disabled: true } }

export const Tests: Story = {
	play: async ({ canvas, userEvent }) => {
		const toggle = canvas.getByRole('button', { name: 'B' })

		await expect(toggle).toHaveAttribute('aria-pressed', 'false')
		await userEvent.click(toggle)
		await expect(toggle).toHaveAttribute('aria-pressed', 'true')
		await userEvent.keyboard(' ')
		await expect(toggle).toHaveAttribute('aria-pressed', 'false')
	},
}
