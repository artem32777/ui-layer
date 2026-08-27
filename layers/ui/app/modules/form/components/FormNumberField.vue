<script setup lang="ts">
import FormField from './FormField.vue'
import type { NumberFieldProps } from '#layers/ui/app/common/components/NumberField/NumberField.types.ts'
import NumberField from '#layers/ui/app/common/components/NumberField/NumberField.vue'

const props = defineProps<NumberFieldProps & {
	name: string
	label?: string
}>()
</script>

<template>
	<FormField
		v-slot="{ value, handleChange, invalid }"
		:name="name"
		:label="label"
	>
		<NumberField
			v-bind="props"
			:model-value="value as number | null"
			:invalid="invalid"
			@update:model-value="handleChange"
		/>
	</FormField>
</template>
