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
	color: var(--text);
	background-color: var(--surface-muted);
  border-radius: var(--UI-radius-M);
	border: 1px solid transparent;
	@include font-size(button);
	transition: border-color 0.3s ease, background-color 0.3s ease, opacity 0.3s ease;

	&:hover, &:focus  {
		background-color: var(--surface-muted-hover);
    outline: none;
	}

	&:focus:not(:placeholder-shown) {
		background-color: var(--field-focus-background);
		border-color: var(--focus);
	}

	&[aria-invalid='true'] {
		border-color: var(--error);
	}

	&:disabled {
		color: var(--text-disabled);
		background-color: var(--surface-muted);
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
