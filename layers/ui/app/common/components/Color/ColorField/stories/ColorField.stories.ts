import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import ColorField from '../ColorField.vue'

type ColorFieldStoryArgs = ComponentProps<typeof ColorField>

const meta = {
	title: 'COLOR/ColorField',
	component: ColorField,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		modelValue: { control: 'color' },
		colorSpace: { control: 'select', options: ['rgb', 'hsl', 'hsb'] },
		channel: { control: 'select', options: ['red', 'green', 'blue', 'hue', 'saturation', 'lightness', 'brightness', 'alpha'] },
		placeholder: { control: 'text' },
		disabled: { control: 'boolean' },
		readonly: { control: 'boolean' },
		disableWheelChange: { control: 'boolean' },
		locale: { control: 'text' },
		step: { control: 'number' },
		name: { control: 'text' },
		required: { control: 'boolean' },
	},
	args: {
		modelValue: '#3b82f6',
		colorSpace: 'hsl',
		disabled: false,
		readonly: false,
		disableWheelChange: false,
		required: false,
	} satisfies ColorFieldStoryArgs,
	render: (args: ColorFieldStoryArgs) => ({
		components: { ColorField },
		setup() { return { args } },
		template: '<ColorField v-model="args.modelValue" v-bind="args" aria-label="Цвет" />',
	}),
} satisfies Meta<typeof ColorField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Channel: Story = {
	args: {
		channel: 'hue',
	},
	render: (args: ColorFieldStoryArgs) => ({
		components: { ColorField },
		setup() { return { args } },
		template: '<ColorField v-model="args.modelValue" v-bind="args" aria-label="Тон" />',
	}),
}

export const Disabled: Story = {
	args: {
		disabled: true,
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByRole('textbox', { name: 'Цвет' })).toBeDisabled()
	},
}

export const Readonly: Story = {
	args: {
		readonly: true,
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByRole('textbox', { name: 'Цвет' })).toHaveAttribute('readonly')
	},
}

export const Commit: Story = {
	play: async ({ canvas, userEvent }) => {
		const input = canvas.getByRole('textbox', { name: 'Цвет' })

		await userEvent.clear(input)
		await userEvent.type(input, '#EF4444')
		await userEvent.keyboard('{Enter}')
		await expect(input).toHaveValue('#ef4444')
	},
}

export const KeyboardChannel: Story = {
	args: {
		channel: 'hue',
	},
	render: (args: ColorFieldStoryArgs) => ({
		components: { ColorField },
		setup() { return { args } },
		template: '<ColorField v-model="args.modelValue" v-bind="args" aria-label="Тон" />',
	}),
	play: async ({ canvas, userEvent }) => {
		const input = canvas.getByRole('textbox', { name: 'Тон' })
		const initialValue = Number((input as HTMLInputElement).value)

		await userEvent.click(input)
		await userEvent.keyboard('{ArrowUp}')
		await expect(input).toHaveValue(String(initialValue + 1))
	},
}
