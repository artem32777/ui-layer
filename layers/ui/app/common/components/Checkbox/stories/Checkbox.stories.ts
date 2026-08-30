import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import Checkbox from '../Checkbox.vue'
import CheckboxStoryForm from './CheckboxStoryForm.vue'
import CheckboxStoryStates from './CheckboxStoryStates.vue'
import { VMessage, formFieldArgTypes, type FormFieldProps } from '#layers/ui/app/modules/form'

type CheckboxStoryArgs = ComponentProps<typeof Checkbox> & Omit<FormFieldProps, 'name'>

const meta = {
	title: 'UI/Checkbox',
	component: Checkbox,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		modelValue: {
			description: 'Выбранное состояние чекбокса.',
			control: 'select',
			options: [false, true],
		},
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
	},
	args: {
		modelValue: false,
		disabled: false,
		invalid: false,
	} satisfies CheckboxStoryArgs,
	render: (args: CheckboxStoryArgs) => ({
		components: { Checkbox },
		setup() {
			return { args }
		},
		template: '<Checkbox v-bind="args" v-model="args.modelValue">Текст чекбокса</Checkbox>',
	}),
} satisfies Meta<CheckboxStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const Base: Story = {}

export const Form: Story = {
	argTypes: {
		...formFieldArgTypes,
	},
	args: {
		label: 'Согласие',
		hint: 'Подсказка',
	},
	render: (args: CheckboxStoryArgs) => ({
		components: { CheckboxStoryForm },
		setup() {
			return { args }
		},
		template: '<CheckboxStoryForm v-bind="args" :show-error="args.invalid" />',
	}),
}

export const States: Story = {
	parameters: {
		pseudo: { hover: '.checkbox-story--hovered' },
	},
	render: (args: CheckboxStoryArgs) => ({
		components: { CheckboxStoryStates },
		setup() {
			return { args }
		},
		template: '<CheckboxStoryStates v-bind="args" />',
	}),
}

export const Tests: Story = {
	args: {
		label: 'Согласие',
	},
	render: (args: CheckboxStoryArgs) => ({
		components: { CheckboxStoryForm },
		setup() {
			return { args }
		},
		template: '<CheckboxStoryForm v-bind="args" />',
	}),
	play: async ({ canvas, userEvent }) => {
		const checkbox = canvas.getByRole('checkbox', { name: /Согласен с условиями/ })

		await expect(checkbox).not.toBeChecked()
		await userEvent.click(checkbox)
		await expect(checkbox).toBeChecked()
		await userEvent.keyboard(' ')
		await expect(checkbox).not.toBeChecked()

		await expect(canvas.queryByText(VMessage.checkbox)).toBeNull()

		await userEvent.tab()
		await expect(await canvas.findByText(VMessage.checkbox)).toBeVisible()

		await userEvent.click(checkbox)
		await userEvent.tab()
		await expect(canvas.queryByText(VMessage.checkbox)).toBeNull()
	},
}
