<script setup lang="ts">
import type { TextareaProps } from './Textarea.types.ts'

withDefaults(defineProps<TextareaProps>(), {
	placeholder: 'Введите сообщение',
	variant: 'fill',
	size: 'medium',
})

const modelValue = defineModel<string>()
</script>

<template>
	<textarea
		v-model="modelValue"
		class="textarea"
		:class="[
			`textarea--variant-${variant}`,
			`textarea--size-${size}`,
		]"
		:placeholder="placeholder"
		:disabled="disabled"
		:aria-invalid="invalid"
		aria-label="Сообщение"
	/>
</template>

<style scoped lang="scss">
.textarea {
	width: 100%;
	resize: vertical;
	color: var(--text-on-bg-secondary);
	background-color: var(--bg-field-static);
  border-radius: var(--UI-radius-M);
	border: 1px solid transparent;
	@include font-size(button);
	transition: border-color 0.3s ease, background-color 0.3s ease, opacity 0.3s ease;

	&:hover, &:focus  {
		background-color: var(--bg-field-hover);
    outline: none;
	}

	&:focus:not(:placeholder-shown) {
		background-color: var(--bg-field-expanded);
		border-color: var(--border-expanded);
	}

	&[aria-invalid='true'] {
		border-color: var(--border-error);
	}

	&:disabled {
		color: var(--text-on-bg-disabled);
		background-color: var(--bg-action-disabled);
	}

// SIZES
	&--size-medium {
		min-height: 90px;
		padding: 12px 16px;
	}

	&--size-big {
		min-height: 120px;
		padding: 16px 22px;
	}
}
</style>
