<script setup lang="ts">
import FormField, { type FormFieldProps } from '#layers/ui/app/modules/form/components/FormField.vue'
import type { InputProps } from './Input.types.ts'
import Input from './Input.vue'

const props = defineProps<InputProps & FormFieldProps>()
</script>

<template>
	<FormField
		v-slot="{ value, handleChange, handleBlur, invalid }"
		:name="name"
		:label="label"
	>
		<Input
			v-bind="props"
			:model-value="value as string"
			:invalid="invalid"
			@update:model-value="handleChange"
			@blur="handleBlur"
		/>
	</FormField>
</template>
