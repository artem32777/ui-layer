import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { toTypedSchema } from '@vee-validate/zod'
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
import { VRule } from '../../validation/rules'
import { z } from 'zod'

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
		setup() {
			return {
				args,
				validationSchema: {
					[args.name]: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || args.errorMessage || 'Введите корректный email',
				},
			}
		},
		template: `
      <Form :validation-schema="validationSchema">
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

export const InvalidInput: Story = {
	args: {
		errorMessage: 'Введите корректный email',
	},
	play: async ({ canvas, userEvent }) => {
		const input = canvas.getByRole('textbox')

		await userEvent.type(input, 'invalid')
		await expect(canvas.queryByText('Введите корректный email')).toBeNull()

		await userEvent.tab()
		await expect(await canvas.findByText('Введите корректный email')).toBeVisible()

		await userEvent.type(input, 'x')
		await expect(canvas.queryByText('Введите корректный email')).toBeNull()
	},
}

export const PhoneInput: Story = {
	parameters: { a11y: { test: 'error' } },
	render: () => ({
		components: { Form, FormPhoneInput },
		setup: () => ({
			validationSchema: toTypedSchema(z.object({ phone: VRule.phone() })),
		}),
		template: `
			<Form :validation-schema="validationSchema">
				<FormPhoneInput name="phone" />
			</Form>`,
	}),
}

export const NumberField: Story = {
	parameters: {
		a11y: { test: 'error' },
	},
	render: () => ({
		components: { Form, FormNumberField },
		setup: () => ({ validationSchema: { quantity: (value: number) => value >= 1 || 'Укажите количество' } }),
		template: `
      <Form :validation-schema="validationSchema">
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
		setup: () => ({ validationSchema: { city: (value: string) => !!value || 'Выберите город' } }),
		template: `
      <Form :validation-schema="validationSchema">
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
		setup: () => ({ validationSchema: { delivery: (value: string) => !!value || 'Выберите способ получения' } }),
		template: `
      <Form :validation-schema="validationSchema">
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
		setup: () => ({
			validationSchema: { agreement: (value: boolean) => value || 'Необходимо согласие с условиями' },
		}),
		template: `
      <Form
          :initial-values="{ agreement: true }"
          :validation-schema="validationSchema"
      >
        <FormCheckbox
            name="agreement"
        >
          Согласен с условиями
        </FormCheckbox>
      </Form>
    `,
	}),
}
