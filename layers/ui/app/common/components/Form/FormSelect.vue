<script setup lang="ts" generic="T extends boolean = false">
import FormField from './FormField.vue'
import Select, { type SelectProps } from '#layers/ui/app/common/components/Select/Select.vue'

defineProps<{
	name: string
	selectProps: SelectProps<T>
}>()
</script>

<template>
	<FormField
		v-slot="{ value, handleChange, invalid }"
		:name="name"
	>
		<Select
			v-bind="selectProps"
			:model-value="value"
			:invalid="invalid"
			@update:model-value="handleChange"
		/>
	</FormField>
</template>
