import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import Calendar from '../Calendar.vue'

type CalendarStoryArgs = ComponentProps<typeof Calendar>

const meta = {
	title: 'DATES/Calendar',
	component: Calendar,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		modelValue: { control: 'object' },
		calendarLabel: { control: 'text' },
		disableDaysOutsideCurrentView: { control: 'boolean' },
		disabled: { control: 'boolean' },
		fixedWeeks: { control: 'boolean' },
		initialFocus: { control: 'boolean' },
		isDateDisabled: { control: false },
		isDateUnavailable: { control: false },
		locale: { control: 'text' },
		maxValue: { control: 'object' },
		minValue: { control: 'object' },
		multiple: { control: 'boolean' },
		numberOfMonths: { control: { type: 'number', min: 1 } },
		readonly: { control: 'boolean' },
		weekdayFormat: { control: 'select', options: ['narrow', 'short', 'long'] },
		weekStartsOn: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6] },
	},
	args: {
		modelValue: undefined,
		calendarLabel: 'Календарь',
		disableDaysOutsideCurrentView: false,
		disabled: false,
		fixedWeeks: true,
		initialFocus: false,
		locale: 'ru-RU',
		multiple: false,
		numberOfMonths: 1,
		readonly: false,
		weekdayFormat: 'short',
		weekStartsOn: 1,
	} satisfies CalendarStoryArgs,
	render: (args: CalendarStoryArgs) => ({
		components: { Calendar },
		setup() { return { args } },
		template: '<Calendar v-bind="args" v-model="args.modelValue" />',
	}),
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {}

export const Multiple: Story = {
	args: {
		multiple: true,
	},
}

export const TwoMonths: Story = {
	args: {
		numberOfMonths: 2,
	},
}

export const Disabled: Story = {
	args: {
		disabled: true,
	},
}

export const Tests: Story = {
	play: async ({ canvasElement, userEvent }) => {
		const today = canvasElement.querySelector<HTMLElement>('[data-today]')

		await expect(today).toBeInTheDocument()
		await userEvent.click(today!)
		await expect(today).toHaveAttribute('data-selected')

		const calendar = canvasElement.querySelector<HTMLElement>('.calendar')!
		const calendarSize = calendar.getBoundingClientRect()

		await userEvent.click(canvasElement.querySelector<HTMLElement>('.calendar__heading-button')!)
		await expect(canvasElement.querySelector('.month-picker')).toBeInTheDocument()
		await expect(canvasElement.querySelector('.calendar__grid')).toBeInTheDocument()
		await expect(calendar.getBoundingClientRect().width).toBe(calendarSize.width)
		await expect(calendar.getBoundingClientRect().height).toBe(calendarSize.height)

		const anotherMonth = Array.from(canvasElement.querySelectorAll<HTMLElement>('.month-picker__month:not([data-disabled])')).find(month => !month.hasAttribute('data-selected'))

		await userEvent.click(anotherMonth!)
		await expect(canvasElement.querySelector('.month-picker')).not.toBeInTheDocument()
		await expect(canvasElement.querySelector('.calendar__grid')).toBeInTheDocument()
	},
}
