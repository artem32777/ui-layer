import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { Component } from 'vue'
import { Form } from 'vee-validate'
import { expect } from 'storybook/test'
import Input from '#layers/ui/app/common/components/Input/Input.vue'
import FormCheckbox from '../FormCheckbox.vue'
import FormField from '../FormField.vue'
import FormFieldError from '../FormFieldError.vue'
import FormInput from '../FormInput.vue'
import FormNumberField from '../FormNumberField.vue'
import FormPhoneInput from '../FormPhoneInput.vue'
import FormRadioGroup from '../FormRadioGroup.vue'
import FormSelect from '../FormSelect.vue'

interface FormStoryArgs {
	name: string
	placeholder: string
	errorMessage?: string
}

const meta = {
	title: 'FORM/Form',
	component: FormInput,
	argTypes: {
		name: { control: 'text' },
		placeholder: { control: 'text' },
		errorMessage: { control: 'text' },
	},
	args: {
		name: 'email',
		placeholder: 'Email',
		errorMessage: undefined,
	} satisfies FormStoryArgs,
	render: (args: FormStoryArgs) => ({
		components: { Form, FormInput },
		setup() { return { args } },
		template: `
			<Form :initial-errors="args.errorMessage ? { [args.name]: args.errorMessage } : {}">
				<FormInput
					:name="args.name"
					:placeholder="args.placeholder"
					type="email"
				/>
			</Form>
		`,
	}),
} satisfies Meta<FormStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const InputField: Story = {
	parameters: {
		a11y: { test: 'error' },
	},
}

export const Tests: Story = {
	parameters: {
		a11y: { test: 'error' },
	},
	play: async ({ canvas, userEvent }) => {
		const input = canvas.getByRole('textbox')

		await expect(input).toHaveValue('')
		await userEvent.type(input, 'user@example.com')
		await expect(input).toHaveValue('user@example.com')
	},
}

export const InvalidInput: Story = {
	args: {
		errorMessage: 'Введите корректный email',
	},
}

export const PhoneInput: Story = {
	parameters: {
		a11y: { test: 'error' },
	},
	render: () => ({
		components: { Form, FormPhoneInput },
		template: '<Form><FormPhoneInput name="phone" /></Form>',
	}),
}

export const NumberField: Story = {
	parameters: {
		a11y: { test: 'error' },
	},
	render: () => ({
		components: { Form, FormNumberField },
		template: `
			<Form :initial-errors="{ quantity: 'Укажите количество' }">
				<label>
					Количество
					<FormNumberField
						name="quantity"
						:min="0"
						:max="20"
					/>
				</label>
			</Form>
		`,
	}),
}

export const Select: Story = {
	render: () => ({
		components: {
			Form,
			FormSelect: FormSelect as Component,
		},
		data: () => ({
			options: [
				{ label: 'Москва', value: 'moscow' },
				{ label: 'Казань', value: 'kazan' },
			],
		}),
		template: `
			<Form :initial-errors="{ city: 'Выберите город' }">
				<FormSelect
					name="city"
					:select-props="{ options, placeholder: 'Город' }"
				/>
			</Form>
		`,
	}),
}

export const RadioGroup: Story = {
	render: () => ({
		components: { Form, FormRadioGroup },
		data: () => ({
			options: [
				{ label: 'Курьером', value: 'courier' },
				{ label: 'Самовывоз', value: 'pickup' },
			],
		}),
		template: `
			<Form :initial-errors="{ delivery: 'Выберите способ получения' }">
				<FormRadioGroup
					name="delivery"
					:radio-group-props="{ options }"
				/>
			</Form>
		`,
	}),
}

export const Checkbox: Story = {
	render: () => ({
		components: { Form, FormCheckbox },
		template: `
			<Form :initial-errors="{ agreement: 'Необходимо согласие с условиями' }">
				<FormCheckbox
					name="agreement"
				>
					Согласен с условиями
				</FormCheckbox>
			</Form>
		`,
	}),
}

export const Field: Story = {
	render: () => ({
		components: { Form, FormField, Input },
		template: `
			<Form :initial-errors="{ field: 'Поле заполнено неверно' }">
				<FormField
					v-slot="{ value, handleChange, invalid }"
					name="field"
				>
					<Input
						:model-value="value"
						:aria-invalid="invalid"
						placeholder="Значение"
						@update:model-value="handleChange"
					/>
				</FormField>
			</Form>
		`,
	}),
}

export const FieldError: Story = {
	render: () => ({
		components: { FormFieldError },
		template: '<FormFieldError error-message="Поле заполнено неверно" />',
	}),
}
