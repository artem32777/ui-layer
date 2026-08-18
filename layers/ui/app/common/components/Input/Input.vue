<script setup lang="ts">
import type { InputProps } from './Input.types.ts'

withDefaults(defineProps<InputProps>(), {
	variant: 'primary',
	size: 'medium',
	type: 'text',
})

const modelValue = defineModel<string>()
</script>

<template>
	<input
		v-model="modelValue"
		class="input"
		:class="[
			`input--variant-${variant}`,
			`input--size-${size}`,
		]"
		:type="type"
		:placeholder="placeholder"
		:disabled="disabled"
		:aria-invalid="invalid"
	>
</template>

<style scoped lang="scss">
.input {
	width: 100%;
	height: 56px;
	padding: 0 16px;
	border: 1px solid transparent;
	border-radius: 8px;
	color: var(--text, #000000);
	background-color: color-mix(in srgb, var(--grey, #e2e2e2) 40%, transparent);
	transition: border-color 0.3s ease, background-color 0.3s ease, opacity 0.3s ease;

	&::placeholder {
		color: color-mix(in srgb, var(--text, #000000) 50%, transparent);
	}

	&.input--variant-secondary {
		border-color: var(--grey, #e2e2e2);
		background-color: var(--background, #ffffff);
	}

	&:hover {
		background-color: color-mix(in srgb, var(--brand, #4149f2) 3%, transparent);
	}

	&:focus {
		outline: none;
		border-color: color-mix(in srgb, var(--brand, #4149f2) 50%, transparent);
	}

	&[aria-invalid='true'] {
		border-color: var(--red, #ff001f);
	}

	&:disabled {
		border-color: var(--grey, #e2e2e2);
		color: color-mix(in srgb, var(--text, #000000) 50%, transparent);
		background-color: var(--background, #ffffff);
		cursor: default;
	}

// SIZES:
	&.input--size-small {
		height: 48px;
		padding: 0 14px;
		font-size: 14px;
	}

	&.input--size-big {
		height: 64px;
		padding: 0 18px;
	}
}
</style>
