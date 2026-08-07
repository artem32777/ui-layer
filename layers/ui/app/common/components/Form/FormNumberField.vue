<script setup lang="ts">
import FormField from './FormField.vue'
import NumberField, { type NumberFieldProps } from '#layers/ui/app/common/components/NumberField/NumberField.vue'

const props = defineProps<NumberFieldProps & {
	name: string
}>()
</script>

<template>
	<FormField
		v-slot="{ value, handleChange, invalid }"
		:name="name"
	>
		<NumberField
			v-bind="props"
			:model-value="value"
			:aria-invalid="invalid"
			@update:model-value="handleChange"
		/>
	</FormField>
</template>
