import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, within } from 'storybook/test'
import DateRangePicker from '../DateRangePicker.vue'

type DateRangePickerStoryArgs = ComponentProps<typeof DateRangePicker>

const meta = {
	title: 'DATES/DateRangePicker',
	component: DateRangePicker,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		modelValue: { control: 'object' },
		open: { control: 'boolean' },
		placeholder: { control: 'object' },
		allowNonContiguousRanges: { control: 'boolean' },
		closeOnSelect: { control: 'boolean' },
		defaultOpen: { control: 'boolean' },
		defaultPlaceholder: { control: 'object' },
		defaultValue: { control: 'object' },
		dir: { control: 'select', options: ['ltr', 'rtl'] },
		disabled: { control: 'boolean' },
		fixedDate: { control: 'select', options: ['start', 'end'] },
		fixedWeeks: { control: 'boolean' },
		granularity: { control: 'select', options: ['day', 'hour', 'minute', 'second'] },
		hideTimeZone: { control: 'boolean' },
		hourCycle: { control: 'select', options: [12, 24] },
		isDateDisabled: { control: false },
		isDateHighlightable: { control: false },
		isDateUnavailable: { control: false },
		locale: { control: 'text' },
		maxValue: { control: 'object' },
		maximumDays: { control: { type: 'number', min: 1 } },
		minValue: { control: 'object' },
		modal: { control: 'boolean' },
		numberOfMonths: { control: { type: 'number', min: 1 } },
		pagedNavigation: { control: 'boolean' },
		preventDeselect: { control: 'boolean' },
		readonly: { control: 'boolean' },
		required: { control: 'boolean' },
		size: { control: 'select', options: ['sm', 'md', 'lg'] },
		step: { control: 'object' },
		variant: { control: 'select', options: ['base', 'secondary'] },
		weekdayFormat: { control: 'select', options: ['narrow', 'short', 'long'] },
		weekStartsOn: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6] },
	},
	args: {
		modelValue: undefined,
		allowNonContiguousRanges: false,
		closeOnSelect: false,
		disabled: false,
		fixedWeeks: true,
		locale: 'ru-RU',
		numberOfMonths: 1,
		pagedNavigation: false,
		preventDeselect: false,
		readonly: false,
		size: 'md',
		variant: 'base',
		weekdayFormat: 'short',
		weekStartsOn: 1,
	} satisfies DateRangePickerStoryArgs,
	render: (args: DateRangePickerStoryArgs) => ({
		components: { DateRangePicker },
		setup() { return { args } },
		template: '<DateRangePicker v-bind="args" v-model="args.modelValue" />',
	}),
} satisfies Meta<typeof DateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {}

export const Secondary: Story = {
	args: {
		variant: 'secondary',
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
		const body = within(canvasElement.ownerDocument.body)

		await userEvent.click(canvasElement.querySelector<HTMLElement>('.date-picker__trigger')!)
		await expect(await body.findByRole('application')).toBeInTheDocument()

		const days = Array.from(canvasElement.ownerDocument.body.querySelectorAll<HTMLElement>('.calendar__day:not([data-outside-view]):not([data-disabled])'))

		await userEvent.click(days[0]!)
		await userEvent.click(days[2]!)
		await expect(days[0]).toHaveAttribute('data-selection-start')
		await expect(days[1]).toHaveAttribute('data-selected')
		await expect(days[2]).toHaveAttribute('data-selection-end')
	},
}
