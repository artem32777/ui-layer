<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'
import type { SliderProps } from '../Slider.types.ts'
import FormSlider from '../FormSlider.vue'
import type { FormFieldProps } from '#layers/ui/app/modules/form'

withDefaults(defineProps<SliderProps & Omit<FormFieldProps, 'name'> & {
	/** Показать состояние ошибки при монтировании (для stories). */
	showError?: boolean
	modelValue?: number[]
}>(), {
	additionalText: 'm²',
})

const validationSchema = toTypedSchema(z.object({
	area: z.array(z.number()).refine((value) => (value[0] ?? 0) >= 25, 'Минимальное значение — 25'),
}))
</script>

<template>
	<Form
		:key="String(showError)"
		:validation-schema="validationSchema"
		:initial-values="{ area: modelValue ?? [20, 80] }"
		:validate-on-mount="showError"
		class="form"
	>
		<FormSlider
			name="area"
			:label="label"
			:hint="hint"
			:additional-text="additionalText"
			:variant="variant"
			:size="size"
			:min="min"
			:max="max"
			:step="step"
			:percent="percent"
			:disabled="disabled"
		/>
	</Form>
</template>

<style>
.form {
  width: 100%;
}
</style>
