<script setup lang="ts">
/** Текущее значение поля ввода. */
const modelValue = defineModel<string>({ default: '' })

export interface InputProps {
	/** Визуальный вариант поля. */
	variant?: 'base' | 'secondary'
	/** Размер поля ввода. */
	size?: 'sm' | 'md' | 'lg'
	/** Текст-подсказка внутри пустого поля. */
	placeholder?: string
	/** Тип input. */
	type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'file' | 'date' | 'tel'
	/** Отключает поле и запрещает ввод. */
	disabled?: boolean
}

withDefaults(defineProps<InputProps>(), {
	variant: 'base',
	size: 'md',
	type: 'text',
})
</script>

<template>
	<input
		v-model="modelValue"
		class="input"
		:class="[
			`input--${size}`,
			`input--${variant}`,
		]"
		:type="type"
		:placeholder="placeholder"
		:disabled="disabled"
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

	&:focus {
		outline: none;
	}

	&:disabled {
		border-color: var(--grey, #e2e2e2);
		color: color-mix(in srgb, var(--text, #000000) 50%, transparent);
		background-color: var(--background, #ffffff);
		cursor: default;
	}

// VARIANTS:
	&.input--secondary {
		border-color: var(--grey, #e2e2e2);
		background-color: var(--background, #ffffff);
	}

	&[aria-invalid='true'] {
		border-color: var(--red, #ff001f);
	}

// SIZES:
	&.input--sm {
		height: 48px;
		padding: 0 14px;
		font-size: 14px;
	}

	&.input--lg {
		height: 64px;
		padding: 0 18px;
	}
}
</style>
