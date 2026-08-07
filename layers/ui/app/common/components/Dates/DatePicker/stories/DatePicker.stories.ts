import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, within } from 'storybook/test'
import DatePicker from '../DatePicker.vue'

type DatePickerStoryArgs = ComponentProps<typeof DatePicker>

const meta = {
	title: 'DATES/DatePicker',
	component: DatePicker,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		modelValue: { control: 'object' },
		open: { control: 'boolean' },
		placeholder: { control: 'object' },
		closeOnSelect: { control: 'boolean' },
		defaultOpen: { control: 'boolean' },
		defaultPlaceholder: { control: 'object' },
		defaultValue: { control: 'object' },
		dir: { control: 'select', options: ['ltr', 'rtl'] },
		disabled: { control: 'boolean' },
		fixedWeeks: { control: 'boolean' },
		granularity: { control: 'select', options: ['day', 'hour', 'minute', 'second'] },
		hideTimeZone: { control: 'boolean' },
		hourCycle: { control: 'select', options: [12, 24] },
		isDateDisabled: { control: false },
		isDateUnavailable: { control: false },
		locale: { control: 'text' },
		maxValue: { control: 'object' },
		minValue: { control: 'object' },
		modal: { control: 'boolean' },
		numberOfMonths: { control: { type: 'number', min: 1 } },
		pagedNavigation: { control: 'boolean' },
		preventDeselect: { control: 'boolean' },
		readonly: { control: 'boolean' },
		required: { control: 'boolean' },
		size: { control: 'select', options: ['sm', 'md', 'lg'] },
		step: { control: 'object' },
		stepSnapping: { control: 'boolean' },
		variant: { control: 'select', options: ['base', 'secondary'] },
		weekdayFormat: { control: 'select', options: ['narrow', 'short', 'long'] },
		weekStartsOn: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6] },
	},
	args: {
		modelValue: undefined,
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
	} satisfies DatePickerStoryArgs,
	render: (args: DatePickerStoryArgs) => ({
		components: { DatePicker },
		setup() { return { args } },
		template: '<DatePicker v-bind="args" v-model="args.modelValue" />',
	}),
} satisfies Meta<typeof DatePicker>

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

		const day = canvasElement.ownerDocument.body.querySelector<HTMLElement>('.calendar__day:not([data-outside-view]):not([data-disabled])')!

		await userEvent.click(day)
		await expect(day).toHaveAttribute('data-selected')

		await userEvent.click(canvasElement.ownerDocument.body.querySelector<HTMLElement>('.calendar__heading-button')!)
		await expect(canvasElement.ownerDocument.body.querySelector('.month-picker')).toBeInTheDocument()
		await expect(canvasElement.ownerDocument.body.querySelector('.calendar__grid')).toBeInTheDocument()
	},
}
