import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import MonthPicker from '../MonthPicker.vue'

type MonthPickerStoryArgs = ComponentProps<typeof MonthPicker>

const meta = {
	title: 'DATES/MonthPicker',
	component: MonthPicker,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		modelValue: { control: 'object' },
		calendarLabel: { control: 'text' },
		disabled: { control: 'boolean' },
		initialFocus: { control: 'boolean' },
		isMonthDisabled: { control: false },
		isMonthUnavailable: { control: false },
		locale: { control: 'text' },
		maxValue: { control: 'object' },
		minValue: { control: 'object' },
		multiple: { control: 'boolean' },
		preventDeselect: { control: 'boolean' },
		readonly: { control: 'boolean' },
	},
	args: {
		modelValue: undefined,
		calendarLabel: 'Выбор месяца',
		disabled: false,
		initialFocus: false,
		locale: 'ru-RU',
		multiple: false,
		preventDeselect: false,
		readonly: false,
	} satisfies MonthPickerStoryArgs,
	render: (args: MonthPickerStoryArgs) => ({
		components: { MonthPicker },
		setup() {
			return { args }
		},
		template: '<MonthPicker v-bind="args" v-model="args.modelValue" />',
	}),
} satisfies Meta<typeof MonthPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {}

export const Multiple: Story = {
	args: {
		multiple: true,
	},
}

export const Disabled: Story = {
	args: {
		disabled: true,
	},
}

export const Tests: Story = {
	play: async ({ canvasElement, userEvent }) => {
		const currentMonth = canvasElement.querySelector<HTMLElement>('[data-today]')

		await expect(currentMonth).toBeInTheDocument()
		await userEvent.click(currentMonth!)
		await expect(currentMonth).toHaveAttribute('data-selected')
	},
}
