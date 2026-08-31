<script setup lang="ts">
import FormField, { type FormFieldProps } from '#layers/ui/app/modules/form/components/FormField.vue'
import type { InputProps } from './Input.types.ts'
import Input from './Input.vue'

const props = defineProps<InputProps & FormFieldProps>()
</script>

<template>
	<FormField
		v-slot="{ handleChange }"
		:name="name"
		:label="label"
		:hint="hint"
	>
		<Input
			v-bind="props"
			@update:model-value="handleChange"
		/>
	</FormField>
</template>
