import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ConcreteComponent } from 'vue'
import Carousel from '../Carousel.vue'
import type { CarouselProps } from '../Carousel.types.ts'
import carouselTypesSource from '../Carousel.types.ts?raw'

interface CarouselStoryItem {
	title: string
	text: string
}

type CarouselStoryArgs = CarouselProps<CarouselStoryItem>

const slides = [
	{ title: 'Первый слайд', text: 'Краткое описание первого слайда.' },
	{ title: 'Второй слайд', text: 'Краткое описание второго слайда.' },
	{ title: 'Третий слайд', text: 'Краткое описание третьего слайда.' },
]

const meta = {
	title: 'UI/Carousel',
	component: Carousel as unknown as ConcreteComponent<CarouselStoryArgs>,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		slides: {
			control: 'object',
			table: {
				type: {
					summary: 'T[]',
					detail: carouselTypesSource.trim(),
				},
			},
		},
		swiperOptions: {
			control: 'object',
			table: {
				type: {
					summary: 'SwiperVueOptions',
					detail: carouselTypesSource.trim(),
				},
			},
		},
		options: {
			control: 'object',
			table: {
				type: {
					summary: 'CarouselOptions',
					detail: carouselTypesSource.trim(),
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
	} satisfies CarouselStoryArgs,
	render: (args: CarouselStoryArgs) => ({
		components: { Carousel: Carousel as unknown as ConcreteComponent<CarouselStoryArgs> },
		setup() { return { args } },
		template: `
			<div style="width: 100%; height: 400px">
				<Carousel
					:slides="args.slides"
					:swiper-options="args.swiperOptions"
					:options="args.options"
				>
					<template #slide="{ slide }">
						<div style="background-color: blue">
							<h3>{{ slide.title }}</h3>
							<p>{{ slide.text }}</p>
						</div>
					</template>
				</Carousel>
			</div>
		`,
	}),
} satisfies Meta<CarouselStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {}
