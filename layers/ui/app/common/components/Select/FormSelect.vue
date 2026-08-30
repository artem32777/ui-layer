<script setup lang="ts" generic="T extends boolean = false">
import { nextTick } from 'vue'
import FormField, { type FormFieldProps } from '#layers/ui/app/modules/form/components/FormField.vue'
import type { SelectProps } from './Select.types.ts'
import Select from './Select.vue'

const props = defineProps<SelectProps<T> & FormFieldProps>()
</script>

<template>
	<FormField
		v-slot="{ value, handleChange, handleBlur, invalid }"
		:name="name"
		:label="label"
		:hint="hint"
	>
		<Select
			v-bind="props"
			:model-value="value as T extends true ? string[] : string"
			:invalid="invalid"
			@update:model-value="handleChange"
			@update:open="(open) => { if (!open) nextTick(() => handleBlur(undefined, true)) }"
		/>
	</FormField>
</template>
