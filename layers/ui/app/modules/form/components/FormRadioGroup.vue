<script setup lang="ts">
import FormField from './FormField.vue'
import RadioGroup from '#layers/ui/app/common/components/RadioGroup/RadioGroup.vue'
import type { RadioGroupProps } from '#layers/ui/app/common/components/RadioGroup/RadioGroup.types.ts'

defineProps<{
	name: string
	label?: string
	radioGroupProps: RadioGroupProps
}>()
</script>

<template>
	<FormField
		v-slot="{ handleChange, invalid }"
		:name="name"
		:label="label"
	>
		<RadioGroup
			v-bind="radioGroupProps"
			:invalid="invalid"
			@update:model-value="handleChange"
		/>
	</FormField>
</template>
