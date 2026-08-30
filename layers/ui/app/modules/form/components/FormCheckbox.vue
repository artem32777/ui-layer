<script setup lang="ts">
import FormField, { type FormFieldProps } from './FormField.vue'
import type { CheckboxProps } from '#layers/ui/app/common/components/Checkbox/Checkbox.types.ts'
import Checkbox from '#layers/ui/app/common/components/Checkbox/Checkbox.vue'

defineProps<FormFieldProps & {
	checkboxProps?: CheckboxProps
}>()
</script>

<template>
	<FormField
		v-slot="{ value, handleChange, handleBlur, invalid }"
		:name="name"
		:label="label"
		:hint="hint"
	>
		<Checkbox
			v-bind="checkboxProps"
			:model-value="value as boolean"
			:invalid="invalid"
			@update:model-value="handleChange"
			@focusout="() => handleBlur(undefined, true)"
		>
			<slot />
		</Checkbox>
	</FormField>
</template>
