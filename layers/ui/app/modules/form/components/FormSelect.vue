<script setup lang="ts" generic="T extends boolean = false">
import FormField from './FormField.vue'
import Select from '#layers/ui/app/common/components/Select/Select.vue'
import type { SelectProps } from '#layers/ui/app/common/components/Select/Select.types.ts'

defineProps<{
	name: string
	selectProps: SelectProps<T>
}>()
</script>

<template>
	<FormField
		v-slot="{ handleChange, invalid }"
		:name="name"
	>
		<Select
			v-bind="selectProps"
			:invalid="invalid"
			@update:model-value="handleChange"
		/>
	</FormField>
</template>
