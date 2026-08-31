<script setup lang="ts">
import FormField, { type FormFieldProps } from './FormField.vue'
import type { CheckboxProps } from '#layers/ui/app/common/components/Checkbox/Checkbox.types.ts'
import Checkbox from '#layers/ui/app/common/components/Checkbox/Checkbox.vue'

defineProps<FormFieldProps & CheckboxProps>()
</script>

<template>
	<FormField
		v-slot="{ handleChange }"
		:name="name"
		:label="label"
		:hint="hint"
	>
		<Checkbox
			:disabled="disabled"
			:invalid="invalid"
			@update:model-value="handleChange"
		>
			<slot />
		</Checkbox>
	</FormField>
</template>
