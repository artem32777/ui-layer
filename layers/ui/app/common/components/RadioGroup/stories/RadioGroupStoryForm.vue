<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'
import type { RadioGroupProps } from '../RadioGroup.types.ts'
import { FormRadioGroup, type FormFieldProps } from '#layers/ui/app/modules/form'

withDefaults(defineProps<RadioGroupProps & Omit<FormFieldProps, 'name'> & {
	/** Показать состояние ошибки при монтировании (для stories). */
	showError?: boolean
}>(), {
	options: () => [
		{ label: 'Курьером', value: 'courier' },
		{ label: 'Самовывоз', value: 'pickup' },
	],
})

const validationSchema = toTypedSchema(z.object({
	delivery: z.string({ required_error: 'Выберите способ получения' }).min(1, 'Выберите способ получения'),
}))
</script>

<template>
	<Form
		:key="String(showError)"
		:validation-schema="validationSchema"
		:initial-values="{ delivery: '' }"
		:validate-on-mount="showError"
	>
		<FormRadioGroup
			name="delivery"
			:label="label"
			:hint="hint"
			:radio-group-props="{ options, disabled, theme }"
		/>
	</Form>
</template>
