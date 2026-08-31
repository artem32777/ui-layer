<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'
import type { CheckboxProps } from '../Checkbox.types.ts'
import { FormCheckbox, VRule, type FormFieldProps } from '#layers/ui/app/modules/form'

defineProps<CheckboxProps & Omit<FormFieldProps, 'name'> & {
	/** Показать состояние ошибки при монтировании (для stories). */
	showError?: boolean
}>()

const validationSchema = toTypedSchema(z.object({
	agreement: VRule.checkbox(),
}))
</script>

<template>
	<Form
		:validation-schema="validationSchema"
		:initial-values="{ agreement: false }"
		:validate-on-mount="showError"
	>
		<FormCheckbox
			name="agreement"
			:label="label"
			:hint="hint"
			:invalid="invalid"
			:disabled="disabled"
		>
			Согласен с условиями
		</FormCheckbox>
	</Form>
</template>
