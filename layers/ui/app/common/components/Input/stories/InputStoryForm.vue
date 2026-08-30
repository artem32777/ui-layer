<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'
import type { InputProps } from '../Input.types.ts'
import FormInput from '../FormInput.vue'
import { VRule, type FormFieldProps } from '#layers/ui/app/modules/form'

withDefaults(defineProps<InputProps & Omit<FormFieldProps, 'name'> & {
	/** Показать состояние ошибки при монтировании (для stories). */
	showError?: boolean
}>(), {
	placeholder: 'Email',
	type: 'email',
})

const validationSchema = toTypedSchema(z.object({
	email: VRule.email(),
}))
</script>

<template>
	<Form
		:validation-schema="validationSchema"
		:initial-values="{ email: showError ? 'invalid' : '' }"
		:validate-on-mount="showError"
	>
		<FormInput
			name="email"
			:label="label"
			:hint="hint"
			:placeholder="placeholder"
			:variant="variant"
			:size="size"
			:type="type"
			:icon="icon"
			:disabled="disabled"
		/>
	</Form>
</template>
