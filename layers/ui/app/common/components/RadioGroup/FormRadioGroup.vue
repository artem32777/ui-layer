<script setup lang="ts">
import FormField, { type FormFieldProps } from '#layers/ui/app/modules/form/components/FormField.vue'
import type { RadioGroupProps } from './RadioGroup.types.ts'
import RadioGroup from './RadioGroup.vue'

const props = defineProps<RadioGroupProps & FormFieldProps>()
</script>

<template>
	<FormField
		v-slot="{ handleChange }"
		:name="name"
		:label="label"
		:hint="hint"
	>
		<RadioGroup
			v-bind="props"
			@update:model-value="handleChange"
		/>
	</FormField>
</template>
