import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import RangeCalendar from '../RangeCalendar.vue'

type RangeCalendarStoryArgs = ComponentProps<typeof RangeCalendar>

const meta = {
	title: 'DATES/RangeCalendar',
	component: RangeCalendar,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		modelValue: { control: 'object' },
		allowNonContiguousRanges: { control: 'boolean' },
		calendarLabel: { control: 'text' },
		disableDaysOutsideCurrentView: { control: 'boolean' },
		disabled: { control: 'boolean' },
		fixedDate: { control: 'select', options: ['start', 'end'] },
		fixedWeeks: { control: 'boolean' },
		initialFocus: { control: 'boolean' },
		isDateDisabled: { control: false },
		isDateHighlightable: { control: false },
		isDateUnavailable: { control: false },
		locale: { control: 'text' },
		maxValue: { control: 'object' },
		maximumDays: { control: { type: 'number', min: 1 } },
		minValue: { control: 'object' },
		numberOfMonths: { control: { type: 'number', min: 1 } },
		readonly: { control: 'boolean' },
		weekdayFormat: { control: 'select', options: ['narrow', 'short', 'long'] },
		weekStartsOn: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6] },
	},
	args: {
		modelValue: undefined,
		allowNonContiguousRanges: false,
		calendarLabel: 'Календарь выбора диапазона',
		disableDaysOutsideCurrentView: false,
		disabled: false,
		fixedWeeks: true,
		initialFocus: false,
		locale: 'ru-RU',
		numberOfMonths: 1,
		readonly: false,
		weekdayFormat: 'short',
		weekStartsOn: 1,
	} satisfies RangeCalendarStoryArgs,
	render: (args: RangeCalendarStoryArgs) => ({
		components: { RangeCalendar },
		setup() { return { args } },
		template: '<RangeCalendar v-bind="args" v-model="args.modelValue" />',
	}),
} satisfies Meta<typeof RangeCalendar>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {}

export const TwoMonths: Story = {
	args: {
		numberOfMonths: 2,
	},
}

export const MaximumSevenDays: Story = {
	args: {
		maximumDays: 7,
	},
}

export const Disabled: Story = {
	args: {
		disabled: true,
	},
}

export const Tests: Story = {
	play: async ({ canvasElement, userEvent }) => {
		const days = Array.from(canvasElement.querySelectorAll<HTMLElement>('.calendar__day:not([data-outside-view]):not([data-disabled])'))

		await userEvent.click(days[0]!)
		await userEvent.click(days[2]!)
		await expect(days[0]).toHaveAttribute('data-selection-start')
		await expect(days[1]).toHaveAttribute('data-selected')
		await expect(days[2]).toHaveAttribute('data-selection-end')

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
