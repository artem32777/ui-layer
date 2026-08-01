import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ConcreteComponent } from 'vue'
import Slider from '../Slider.vue'
import type { SliderProps } from '../types'
import sliderTypesSource from '../types.ts?raw'

interface SliderStoryItem {
	title: string
	text: string
}

type SliderStoryArgs = SliderProps<SliderStoryItem>

const slides = [
	{ title: 'Первый слайд', text: 'Краткое описание первого слайда.' },
	{ title: 'Второй слайд', text: 'Краткое описание второго слайда.' },
	{ title: 'Третий слайд', text: 'Краткое описание третьего слайда.' },
]

const meta = {
	title: 'UI/Slider',
	component: Slider as unknown as ConcreteComponent<SliderStoryArgs>,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		slides: {
			control: 'object',
			table: {
				type: {
					summary: 'T[]',
					detail: sliderTypesSource.trim(),
				},
			},
		},
		swiperOptions: {
			control: 'object',
			table: {
				type: {
					summary: 'SwiperVueOptions',
					detail: sliderTypesSource.trim(),
				},
			},
		},
		options: {
			control: 'object',
			table: {
				type: {
					summary: 'SliderOptions',
					detail: sliderTypesSource.trim(),
				},
			},
		},
	},
	args: {
		slides,
		options: {
			hasNav: true,
			hasPagination: true,
		},
	} satisfies SliderStoryArgs,
	render: (args: SliderStoryArgs) => ({
		components: { Slider: Slider as unknown as ConcreteComponent<SliderStoryArgs> },
		setup() { return { args } },
		template: `
			<div style="width: 640px; height: 260px">
				<Slider
					:slides="args.slides"
					:swiper-options="args.swiperOptions"
					:options="args.options"
				>
					<template #slide="{ slide }">
						<div style="display: grid; place-content: center; height: 100%; padding: 32px; text-align: center">
							<h3>{{ slide.title }}</h3>
							<p>{{ slide.text }}</p>
						</div>
					</template>
				</Slider>
			</div>
		`,
	}),
} satisfies Meta<SliderStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {}
export const WithoutNavigation: Story = {
	args: {
		options: {
			hasNav: false,
			hasPagination: true,
		},
	},
}
export const WithoutPagination: Story = {
	args: {
		options: {
			hasNav: true,
			hasPagination: false,
		},
	},
}
