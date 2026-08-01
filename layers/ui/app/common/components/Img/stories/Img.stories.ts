import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import Img from '../Img.vue'

type ImgStoryArgs = ComponentProps<typeof Img>

const DEMO_IMAGE = 'https://picsum.photos/seed/img/800/600'

const meta = {
	title: 'UI/Img',
	component: Img,
	argTypes: {
		src: { control: 'text' },
		width: { control: 'text' },
		height: { control: 'text' },
		alt: { control: 'text' },
		loading: {
			control: 'select',
			options: ['lazy', 'eager'],
		},
		fetchPriority: {
			control: 'select',
			options: [undefined, 'auto', 'high', 'low'],
		},
		decoding: {
			control: 'select',
			options: [undefined, 'auto', 'async', 'sync'],
		},
	},
	args: {
		src: DEMO_IMAGE,
		alt: 'Демонстрационное изображение',
		loading: 'lazy',
	} satisfies ImgStoryArgs,
	render: (args: ImgStoryArgs) => ({
		components: { Img },
		setup() { return { args } },
		template: `
			<div style="width: 320px; height: 240px; overflow: hidden;">
				<Img v-bind="args" />
			</div>
		`,
	}),
} satisfies Meta<typeof Img>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {}
