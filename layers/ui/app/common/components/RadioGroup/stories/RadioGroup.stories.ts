import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import RadioGroup from '../RadioGroup.vue'
import radioGroupTypesSource from '../RadioGroup.types.ts?raw'
import RadioGroupStoryForm from './RadioGroupStoryForm.vue'
import RadioGroupStoryStates from './RadioGroupStoryStates.vue'
import { ThemeNamesArray } from '#layers/ui/app/config/theme.ts'
import { formFieldArgTypes, type FormFieldProps } from '#layers/ui/app/modules/form'

type RadioGroupStoryArgs = ComponentProps<typeof RadioGroup> & Omit<FormFieldProps, 'name'>

const defaultOptions = [
	{ label: 'False', value: 'false' },
	{ label: 'True', value: 'true' },
	{ label: 'Disabled', value: 'disabled', disabled: true },
]

const meta = {
	title: 'UI/RadioGroup',
	component: RadioGroup,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		modelValue: {
			description: 'Выбранное значение группы радиокнопок.',
			control: 'text',
			table: { type: { summary: 'string' } },
		},
		options: {
			control: 'object',
			table: {
				type: {
					summary: 'RadioOption[]',
					detail: radioGroupTypesSource.trim(),
				},
			},
		},
		theme: { control: ThemeNamesArray },
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
	},
	args: {
		modelValue: undefined,
		options: defaultOptions,
		invalid: false,
		disabled: false,
	} satisfies RadioGroupStoryArgs,
	render: (args: RadioGroupStoryArgs) => ({
		components: { RadioGroup },
		setup() { return { args } },
		template: '<RadioGroup v-bind="args" v-model="args.modelValue" />',
	}),
} satisfies Meta<RadioGroupStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
	args: {
		modelValue: '',
	} satisfies Partial<RadioGroupStoryArgs>,
}

export const Base: Story = {

}

export const Form: Story = {
	argTypes: {
		...formFieldArgTypes,
	},
	args: {
		label: 'Способ получения',
		hint: 'Подсказка',
		options: [
			{ label: 'Курьером', value: 'courier' },
			{ label: 'Самовывоз', value: 'pickup' },
		],
	},
	render: (args: RadioGroupStoryArgs) => ({
		components: { RadioGroupStoryForm },
		setup() {
			return { args }
		},
		template: '<RadioGroupStoryForm v-bind="args" :show-error="args.invalid" />',
	}),
}

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.radio-group-story--hovered .radio-group__item:first-child',
		},
	},
	render: (args: RadioGroupStoryArgs) => ({
		components: { RadioGroupStoryStates },
		setup() {
			return { args }
		},
		template: '<RadioGroupStoryStates v-bind="args" />',
	}),
}

export const FormDocsExample: Story = {
	tags: ['!dev'],
	args: {
		label: 'Способ получения',
		hint: 'Подсказка',
		options: [
			{ label: 'Курьером', value: 'courier' },
			{ label: 'Самовывоз', value: 'pickup' },
		],
	},
	render: (args: RadioGroupStoryArgs) => ({
		components: { RadioGroupStoryForm },
		setup() {
			return { args }
		},
		template: '<RadioGroupStoryForm v-bind="args" />',
	}),
}

export const Tests: Story = {
	args: {
		label: 'Способ получения',
		options: [
			{ label: 'Курьером', value: 'courier' },
			{ label: 'Самовывоз', value: 'pickup' },
		],
	},
	render: (args: RadioGroupStoryArgs) => ({
		components: { RadioGroupStoryForm },
		setup() {
			return { args }
		},
		template: '<RadioGroupStoryForm v-bind="args" />',
	}),
	play: async ({ canvas, userEvent }) => {
		const courier = canvas.getByRole('radio', { name: 'Курьером' })
		const pickup = canvas.getByRole('radio', { name: 'Самовывоз' })

		await expect(courier).not.toBeChecked()
		await expect(pickup).not.toBeChecked()

		await expect(canvas.queryByText('Выберите способ получения')).toBeNull()

		await userEvent.tab()
		await userEvent.tab()
		await expect(await canvas.findByText('Выберите способ получения')).toBeVisible()

		await userEvent.click(courier)
		await userEvent.tab()
		await expect(canvas.queryByText('Выберите способ получения')).toBeNull()
		await expect(courier).toBeChecked()
		await expect(pickup).not.toBeChecked()

		await userEvent.click(courier)
		await userEvent.keyboard('{ArrowDown}')
		await expect(pickup).toHaveFocus()
		await userEvent.keyboard(' ')
		await expect(pickup).toBeChecked()
	},
}
