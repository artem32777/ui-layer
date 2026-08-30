<script setup lang="ts">
import FormFieldError from './FormFieldError.vue'
import { useField } from 'vee-validate'
import FormFieldLabel from '#layers/ui/app/modules/form/components/FormFieldLabel.vue'
import type { FormFieldProps } from './FormField.types.ts'

export type { FormFieldProps } from './FormField.types.ts'

const props = defineProps<FormFieldProps>()

const { value, handleChange, handleBlur, errorMessage } = useField(() => props.name, {}, {
	validateOnValueUpdate: false,
	validateOnMount: false,
})
</script>

<template>
	<div class="v-field">
		<FormFieldLabel :label="label">
			<slot
				:value="value"
				:handle-change="handleChange"
				:handle-blur="handleBlur"
				:invalid="!!errorMessage"
			/>
		</FormFieldLabel>
		<span
			v-if="hint"
			class="v-field__hint"
		>
			{{ hint }}
		</span>
		<FormFieldError :error-message="errorMessage" />
	</div>
</template>

<style scoped lang="scss">
.v-field {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 8px;
}

.v-field__hint {
	@include font-size(label);
	color: var(--text-on-surface-tertiary);
}
</style>
