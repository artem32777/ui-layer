<script setup lang="ts">
import FormField from './FormField.vue'
import type { InputProps } from '#layers/ui/app/common/components/Input/Input.types.ts'
import Input from '#layers/ui/app/common/components/Input/Input.vue'

const props = defineProps<InputProps & {
	name: string
}>()
</script>

<template>
	<FormField
		v-slot="{ value, handleChange, invalid }"
		:name="name"
	>
		<Input
			v-bind="props"
			:model-value="value as string"
			:invalid="invalid"
			@update:model-value="handleChange"
		/>
	</FormField>
</template>
