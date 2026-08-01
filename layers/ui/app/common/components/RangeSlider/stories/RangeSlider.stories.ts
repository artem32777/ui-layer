import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import MultiRangeSlider from '../MultiRangeSlider.vue'
import RangeSlider from '../RangeSlider.vue'

type RangeSliderStoryArgs = ComponentProps<typeof RangeSlider>

const meta = {
	title: 'UI/RangeSlider',
	component: RangeSlider,
	argTypes: {
		modelValue: { control: 'object' },
		label: { control: 'text' },
		additionalText: { control: 'text' },
		variant: { control: 'select', options: ['line', 'block'] },
		state: { control: 'select', options: ['default', 'touched'] },
		type: { control: 'select', options: ['double', 'one-range'] },
		min: { control: 'number' },
		max: { control: 'number' },
		step: { control: 'number' },
		disabled: { control: 'boolean' },
	},
	args: {
		modelValue: [20, 80],
		label: 'Диапазон',
		additionalText: '%',
		variant: 'line',
		state: 'default',
		type: 'double',
		min: 0,
		max: 100,
		step: 1,
		disabled: false,
	} satisfies RangeSliderStoryArgs,
	render: (args: RangeSliderStoryArgs) => ({
		components: { RangeSlider },
		setup() { return { args } },
		template: '<RangeSlider v-model="args.modelValue" v-bind="args" />',
	}),
} satisfies Meta<typeof RangeSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Double: Story = {}
export const Block: Story = { args: { variant: 'block', state: 'touched' } }
export const OneRange: Story = { args: { modelValue: [40], type: 'one-range' } }
export const Disabled: Story = { args: { disabled: true } }
export const MultipleRanges: Story = {
	render: () => ({
		components: { MultiRangeSlider },
		data: () => ({ values: [10, 30, 60, 90] }),
		template: '<MultiRangeSlider v-model="values" :step="5" />',
	}),
}

export const Tests: Story = {
	play: async ({ canvas, userEvent }) => {
		const [minimum, maximum] = canvas.getAllByRole('slider') as [HTMLElement, HTMLElement]

		await expect(minimum).toHaveAttribute('aria-valuenow', '20')
		await expect(maximum).toHaveAttribute('aria-valuenow', '80')

		await userEvent.click(minimum)
		await userEvent.keyboard('{ArrowRight}')
		await expect(minimum).toHaveAttribute('aria-valuenow', '21')

		await userEvent.click(maximum)
		await userEvent.keyboard('{ArrowLeft}')
		await expect(maximum).toHaveAttribute('aria-valuenow', '79')
	},
}
