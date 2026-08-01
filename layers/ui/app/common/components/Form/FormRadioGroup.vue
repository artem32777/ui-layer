<script setup lang="ts">
import FormField from './FormField.vue'
import RadioGroup, { type RadioGroupProps } from '#layers/ui/app/common/components/RadioGroup/RadioGroup.vue'

defineProps<{
	name: string
	radioGroupProps: RadioGroupProps
}>()
</script>

<template>
	<FormField
		v-slot="{ value, handleChange, invalid }"
		:name="name"
	>
		<RadioGroup
			v-bind="radioGroupProps"
			:model-value="value"
			:invalid="invalid"
			@update:model-value="handleChange"
		/>
	</FormField>
</template>
