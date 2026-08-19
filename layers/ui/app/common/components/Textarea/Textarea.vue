<script setup lang="ts">
import type { TextareaProps } from './Textarea.types.ts'

withDefaults(defineProps<TextareaProps>(), {
	placeholder: 'Введите сообщение',
})

const modelValue = defineModel<string>({ default: '' })
</script>

<template>
	<textarea
		v-model="modelValue"
		class="textarea"
		:placeholder="placeholder"
		:disabled="disabled"
		:aria-invalid="invalid"
		aria-label="Textarea"
	/>
</template>

<style scoped lang="scss">
.textarea {
	width: 100%;
	padding: 16px;
	resize: vertical;
	border: 1px solid transparent;
	border-radius: 8px;
	color: var(--text, #000000);
	background-color: color-mix(in srgb, var(--neutral-500, #e2e2e2) 50%, transparent);
	transition: border-color 0.3s ease, background-color 0.3s ease, opacity 0.3s ease;

	&::placeholder {
		color: color-mix(in srgb, var(--text, #000000) 50%, transparent);
	}

	&:hover {
		background-color: color-mix(in srgb, var(--brand, #4149f2) 3%, transparent);
	}

	&:focus {
		outline: none;
		border-color: color-mix(in srgb, var(--brand, #4149f2) 50%, transparent);
	}

	&[aria-invalid='true'] {
		border-color: var(--accent, #ff001f);
	}

	&:disabled {
		border-color: var(--neutral-500, #e2e2e2);
		color: color-mix(in srgb, var(--text, #000000) 50%, transparent);
		background-color: var(--background, #ffffff);
		cursor: default;
	}
}
</style>
