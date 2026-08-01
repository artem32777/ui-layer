import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import Picture from '../Picture.vue'
import imgSource from '../../Img/Img.vue?raw'
import pictureTypesSource from '../Picture.types.ts?raw'

type PictureStoryArgs = ComponentProps<typeof Picture>

const DEMO_IMAGE = 'https://picsum.photos/seed/picture-fallback/800/600'
const DEMO_IMAGE_MOBILE = 'https://picsum.photos/seed/picture-mobile/400/300'
const DEMO_IMAGE_DESKTOP = 'https://picsum.photos/seed/picture-desktop/1200/800'

const meta = {
	title: 'UI/Picture',
	component: Picture,
	argTypes: {
		src: { control: 'text' },
		srcSet: {
			control: 'object',
			table: {
				type: {
					summary: 'PictureSrcSetItem[]',
					detail: pictureTypesSource.trim(),
				},
			},
		},
		imageOptions: {
			control: 'object',
			table: {
				type: {
					summary: 'Omit<ImgProps, \'src\' | \'alt\'>',
					detail: imgSource.trim(),
				},
			},
		},
	},
	args: {
		src: DEMO_IMAGE,
		alt: 'Адаптивное изображение',
		srcSet: [
			{ type: 'max', width: 767, src: DEMO_IMAGE_MOBILE },
			{ type: 'min', width: 768, src: DEMO_IMAGE_DESKTOP },
		],
		imageOptions: {
			loading: 'lazy',
		},
	} satisfies PictureStoryArgs,
	render: (args: PictureStoryArgs) => ({
		components: { Picture },
		setup() { return { args } },
		template: `
			<div style="width: 320px; height: 240px; overflow: hidden;">
				<Picture v-bind="args" />
			</div>
		`,
	}),
} satisfies Meta<typeof Picture>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {}
