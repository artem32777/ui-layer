<script setup lang="ts">
import FormField from './FormField.vue'
import type { CheckboxProps } from '#layers/ui/app/common/components/Checkbox/Checkbox.types.ts'
import Checkbox from '#layers/ui/app/common/components/Checkbox/Checkbox.vue'

defineProps<{
	name: string
	label?: string
	checkboxProps?: CheckboxProps
}>()
</script>

<template>
	<FormField
		v-slot="{ value, handleChange, invalid }"
		:name="name"
		:label="label"
	>
		<Checkbox
			v-bind="checkboxProps"
			:model-value="value as boolean"
			:invalid="invalid"
			@update:model-value="handleChange"
		>
			<slot />
		</Checkbox>
	</FormField>
</template>
