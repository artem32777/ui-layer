import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import ColorArea from '../ColorArea.vue'

type ColorAreaStoryArgs = ComponentProps<typeof ColorArea>

const meta = {
	title: 'COLOR/ColorArea',
	component: ColorArea,
	argTypes: {
		modelValue: { control: 'color' },
		colorSpace: { control: 'select', options: ['rgb', 'hsl', 'hsb'] },
		xChannel: { control: 'select', options: ['red', 'green', 'blue', 'hue', 'saturation', 'lightness', 'brightness', 'alpha'] },
		yChannel: { control: 'select', options: ['red', 'green', 'blue', 'hue', 'saturation', 'lightness', 'brightness', 'alpha'] },
		disabled: { control: 'boolean' },
		xName: { control: 'text' },
		yName: { control: 'text' },
	},
	args: {
		modelValue: '#56d799',
		colorSpace: 'hsl',
		xChannel: 'saturation',
		yChannel: 'lightness',
		disabled: false,
	} satisfies ColorAreaStoryArgs,
	render: (args: ColorAreaStoryArgs) => ({
		components: { ColorArea },
		setup() { return { args } },
		template: '<ColorArea v-model="args.modelValue" v-bind="args" />',
	}),
} satisfies Meta<typeof ColorArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	play: async ({ canvas, userEvent }) => {
		const thumb = canvas.getByRole('slider')

		await expect(thumb).toHaveAttribute('aria-valuenow', '62')
		await userEvent.tab()
		await expect(thumb).toHaveFocus()
		await userEvent.keyboard('{ArrowRight}')
		await expect(thumb).toHaveAttribute('aria-valuenow', '63')
		await userEvent.keyboard('{ArrowUp}')
		await expect(thumb).toHaveAttribute('aria-valuetext', 'Saturation 63, Lightness 60')
	},
}

export const Disabled: Story = {
	args: {
		disabled: true,
	},
	play: async ({ canvas }) => {
		const thumb = canvas.getByRole('slider')

		await expect(thumb).not.toHaveAttribute('tabindex')
		await expect(thumb).toHaveAttribute('data-disabled')
	},
}
