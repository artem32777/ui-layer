<script setup lang="ts">
import FormField, { type FormFieldProps } from '#layers/ui/app/modules/form/components/FormField.vue'
import type { TextareaProps } from './Textarea.types.ts'
import Textarea from './Textarea.vue'

const props = defineProps<TextareaProps & FormFieldProps>()
</script>

<template>
	<FormField
		v-slot="{ value, handleChange, handleBlur, invalid }"
		:name="name"
		:label="label"
	>
		<Textarea
			v-bind="props"
			:model-value="value as string"
			:invalid="invalid"
			@update:model-value="handleChange"
			@blur="handleBlur"
		/>
	</FormField>
</template>
