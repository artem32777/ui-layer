<script setup lang="ts">
import { vMaska } from 'maska/vue'
import FormField, { type FormFieldProps } from './FormField.vue'
import type { InputProps } from '#layers/ui/app/common/components/Input/Input.types.ts'
import Input from '#layers/ui/app/common/components/Input/Input.vue'

const props = defineProps<Omit<InputProps, 'placeholder'> & FormFieldProps & {
	placeholder?: string
}>()
</script>

<template>
	<FormField
		v-slot="{ handleChange, invalid }"
		:name="name"
		:label="label"
		:hint="hint"
	>
		<Input
			v-maska="'+7 (###) ###-##-##'"
			v-bind="props"
			:placeholder="placeholder || '+7 (___) ___-__-__'"
			type="tel"
			inputmode="tel"
			:invalid="invalid"
			@update:model-value="handleChange"
		/>
	</FormField>
</template>
