import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import FormCheckbox from '../FormCheckbox.vue'
import FormNumberField from '../FormNumberField.vue'
import FormPhoneInput from '../FormPhoneInput.vue'
import FormRadioGroup from '../FormRadioGroup.vue'
import { VRule } from '../../validation/rules'
import { z } from 'zod'

const meta = {
	title: 'FORM/Form',
	parameters: { a11y: { test: 'error' } },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const PhoneInput: Story = {
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
	render: () => ({
		components: { Form, FormNumberField },
		setup: () => ({ validationSchema: { quantity: (value: number) => value >= 1 || 'Укажите количество' } }),
		template: `
			<Form :validation-schema="validationSchema">
				<FormNumberField
					name="quantity"
					label="Количество"
					:min="0"
					:max="20"
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
				<FormCheckbox name="agreement">
					Согласен с условиями
				</FormCheckbox>
			</Form>
		`,
	}),
}
