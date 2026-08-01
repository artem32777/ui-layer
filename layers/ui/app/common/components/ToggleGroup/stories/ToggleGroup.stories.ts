import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import ToggleGroup from '../ToggleGroup.vue'
import toggleGroupTypesSource from '../ToggleGroup.types.ts?raw'

type ToggleGroupStoryArgs = ComponentProps<typeof ToggleGroup>

const options = [
	{ label: 'L', value: 'left' },
	{ label: 'C', value: 'center' },
	{ label: 'R', value: 'right' },
]

const meta = {
	title: 'UI/ToggleGroup',
	component: ToggleGroup,
	argTypes: {
		modelValue: { control: 'object' },
		options: {
			control: 'object',
			table: {
				type: {
					summary: 'ToggleOption[]',
					detail: toggleGroupTypesSource.trim(),
				},
			},
		},
		type: { control: 'select', options: ['single', 'multiple'] },
	},
	args: {
		modelValue: 'center',
		options,
		type: 'single',
	} satisfies ToggleGroupStoryArgs,
	render: (args: ToggleGroupStoryArgs) => ({
		components: { ToggleGroup },
		setup() { return { args } },
		template: '<ToggleGroup v-model="args.modelValue" :options="args.options" :type="args.type" />',
	}),
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {}
export const Multiple: Story = {
	args: {
		modelValue: ['left', 'right'],
		type: 'multiple',
	},
}
export const WithDisabledOption: Story = {
	args: {
		options: [...options.slice(0, 2), { label: 'R', value: 'right', disabled: true }],
	},
}

export const Tests: Story = {
	play: async ({ canvas, userEvent }) => {
		const left = canvas.getByRole('button', { name: 'L' })
		const center = canvas.getByRole('button', { name: 'C' })

		await expect(left).toHaveAttribute('aria-pressed', 'false')
		await expect(center).toHaveAttribute('aria-pressed', 'true')

		await userEvent.click(left)
		await expect(left).toHaveAttribute('aria-pressed', 'true')
		await expect(center).toHaveAttribute('aria-pressed', 'false')
	},
}
