<script setup lang="ts">
import FormField, { type FormFieldProps } from '#layers/ui/app/modules/form/components/FormField.vue'
import type { SliderProps } from './Slider.types.ts'
import Slider from './Slider.vue'

const props = defineProps<SliderProps & FormFieldProps>()

function onFocusOut(event: FocusEvent, handleBlur: (e?: Event, shouldValidate?: boolean) => void) {
	const root = event.currentTarget
	if (root instanceof HTMLElement && event.relatedTarget instanceof Node && root.contains(event.relatedTarget)) return
	handleBlur(undefined, true)
}
</script>

<template>
	<FormField
		v-slot="{ value, handleChange, handleBlur, invalid }"
		:name="name"
		:label="label"
		:hint="hint"
	>
		<Slider
			v-bind="props"
			:model-value="value as number[]"
			:invalid="invalid"
			@update:model-value="handleChange"
			@focusout="(event: FocusEvent) => onFocusOut(event, handleBlur)"
		/>
	</FormField>
</template>
