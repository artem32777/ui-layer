<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'
import type { TextareaProps } from '../Textarea.types.ts'
import FormTextarea from '../FormTextarea.vue'
import { VRule, type FormFieldProps } from '#layers/ui/app/modules/form'

withDefaults(defineProps<TextareaProps & Omit<FormFieldProps, 'name'> & {
	/** Показать состояние ошибки при монтировании (для stories). */
	showError?: boolean
}>(), {
	placeholder: 'Введите сообщение',
})

const validationSchema = toTypedSchema(z.object({
	message: VRule.name(5, 'Минимум 5 символов'),
}))
</script>

<template>
	<Form
		:validation-schema="validationSchema"
		:initial-values="{ message: '' }"
		:validate-on-mount="showError"
	>
		<FormTextarea
			name="message"
			:label="label"
			:hint="hint"
			:placeholder="placeholder"
			:variant="variant"
			:size="size"
			:disabled="disabled"
		/>
	</Form>
</template>
