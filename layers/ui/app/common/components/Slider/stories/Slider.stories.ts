import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import { ref } from 'vue'
import MultiSlider from '../MultiSlider.vue'
import Slider from '../Slider.vue'
import { sliderSizes, sliderVariants } from '../Slider.types.ts'
import SliderStoryStates from './SliderStoryStates.vue'

type SliderStoryArgs = ComponentProps<typeof Slider>

const meta = {
	title: 'UI/Slider',
	component: Slider,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		modelValue: {
			description: 'Текущие значения ползунков.',
			control: 'object',
			table: { type: { summary: 'number[]' } },
		},
		label: { control: 'text' },
		additionalText: { control: 'text' },
		variant: { control: 'select', options: sliderVariants },
		size: { control: 'select', options: sliderSizes },
		min: { control: 'number' },
		max: { control: 'number' },
		step: { control: 'number' },
		disabled: { control: 'boolean' },
	},
	args: {
		modelValue: [20, 80],
		label: 'Slider label',
		additionalText: 'm²',
		variant: 'two-points',
		size: 'medium',
		min: 0,
		max: 100,
		step: 1,
		disabled: false,
	} satisfies SliderStoryArgs,
	render: (args: SliderStoryArgs) => ({
		components: { Slider },
		setup() { return { args } },
		template: '<Slider v-bind="args" v-model="args.modelValue" />',
	}),
} satisfies Meta<SliderStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const Base: Story = {
	render: (args: SliderStoryArgs) => ({
		components: { Slider },
		setup() {
			return { args }
		},
		template: '<Slider v-bind="args" v-model="args.modelValue" />',
	}),
}

export const States: Story = {
	parameters: {
		pseudo: {
			focusWithin: '.slider-story--focused .slider__body',
		},
	},
	render: (args: SliderStoryArgs) => ({
		components: { SliderStoryStates },
		setup() {
			return { args }
		},
		template: '<SliderStoryStates v-bind="args" />',
	}),
}

export const MultipleRanges: Story = {
	render: () => ({
		components: { MultiSlider },
		setup() {
			const values = ref([10, 30, 60, 90])
			return { values }
		},
		template: '<MultiSlider v-model="values" :step="5" />',
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
