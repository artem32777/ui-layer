<script setup lang="ts">
import { vMaska } from 'maska/vue'
import FormField from './FormField.vue'
import Input, { type InputProps } from '#layers/ui/app/common/components/Input/Input.vue'

const props = defineProps<Omit<InputProps, 'placeholder'> & {
	name: string
	placeholder?: string
}>()
</script>

<template>
	<FormField
		v-slot="{ value, handleChange, invalid }"
		:name="name"
	>
		<Input
			v-maska="'+7 (###) ###-##-##'"
			v-bind="props"
			:model-value="value"
			:aria-invalid="invalid"
			type="tel"
			inputmode="tel"
			:placeholder="placeholder || '+7 (___) ___-__-__'"
			@update:model-value="handleChange"
		/>
	</FormField>
</template>
