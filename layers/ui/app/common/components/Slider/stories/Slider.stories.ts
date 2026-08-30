import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import { ref } from 'vue'
import MultiSlider from '../MultiSlider.vue'
import Slider from '../Slider.vue'
import { sliderSizes, sliderVariants } from '../Slider.types.ts'
import SliderStoryForm from './SliderStoryForm.vue'
import SliderStoryStates from './SliderStoryStates.vue'
import { formFieldArgTypes, type FormFieldProps } from '#layers/ui/app/modules/form'

type SliderStoryArgs = ComponentProps<typeof Slider> & Omit<FormFieldProps, 'name'>

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
		additionalText: { control: 'text' },
		variant: { control: 'select', options: sliderVariants },
		size: { control: 'select', options: sliderSizes },
		min: { control: 'number' },
		max: { control: 'number' },
		step: { control: 'number' },
		percent: { control: 'boolean' },
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
	},
	args: {
		modelValue: [20, 80],
		additionalText: 'm²',
		variant: 'two-points',
		size: 'medium',
		min: 0,
		max: 100,
		step: 1,
		percent: false,
		disabled: false,
		invalid: false,
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

export const Form: Story = {
	argTypes: {
		...formFieldArgTypes,
	},
	args: {
		label: 'Площадь',
		hint: 'Подсказка',
	},
	render: (args: SliderStoryArgs) => ({
		components: { SliderStoryForm },
		setup() {
			return { args }
		},
		template: '<SliderStoryForm v-bind="args" :show-error="args.invalid" />',
	}),
}

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.slider-story--hovered .slider__body',
			focusWithin: '.slider-story--focused .slider',
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

export const FormDocsExample: Story = {
	tags: ['!dev'],
	args: {
		label: 'Площадь',
		hint: 'Подсказка',
	},
	render: (args: SliderStoryArgs) => ({
		components: { SliderStoryForm },
		setup() {
			return { args }
		},
		template: '<SliderStoryForm v-bind="args" />',
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

export const FormTests: Story = {
	args: {
		label: 'Площадь',
	},
	render: (args: SliderStoryArgs) => ({
		components: { SliderStoryForm },
		setup() {
			return { args }
		},
		template: '<SliderStoryForm v-bind="args" />',
	}),
	play: async ({ canvas, userEvent }) => {
		const [minimum] = canvas.getAllByRole('slider') as [HTMLElement]

		await expect(canvas.queryByText('Минимальное значение — 25')).toBeNull()

		await userEvent.click(minimum)
		await userEvent.tab()
		await userEvent.tab()
		await expect(await canvas.findByText('Минимальное значение — 25')).toBeVisible()

		await userEvent.click(minimum)
		await userEvent.keyboard('{ArrowRight}{ArrowRight}{ArrowRight}{ArrowRight}{ArrowRight}')
		await userEvent.tab()
		await userEvent.tab()
		await expect(canvas.queryByText('Минимальное значение — 25')).toBeNull()
	},
}
