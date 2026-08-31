<script setup lang="ts">
import { nextTick } from 'vue'
import FormField, { type FormFieldProps } from '#layers/ui/app/modules/form/components/FormField.vue'
import type { SelectProps } from './Select.types.ts'
import Select from './Select.vue'

const props = defineProps<SelectProps & FormFieldProps>()
</script>

<template>
	<FormField
		v-slot="{ handleChange, handleBlur, value }"
		:name="name"
		:label="label"
		:hint="hint"
	>
		<Select
			v-bind="props"
			:model-value="value as string | string[] | undefined"
			@update:model-value="handleChange"
			@update:open="(open: boolean) => { if (!open) nextTick(() => handleBlur(undefined, true)) }"
		/>
	</FormField>
</template>
