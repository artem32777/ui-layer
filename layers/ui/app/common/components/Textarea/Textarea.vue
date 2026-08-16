<script setup lang="ts">
const modelValue = defineModel<string>({ default: '' })

interface TextareaProps {
	/** Плейсхордер. */
	placeholder?: string
	/** Состояние ошибки. */
	invalid?: boolean
	/** Отключает поле и запрещает взаимодействие. */
	disabled?: boolean
}

withDefaults(defineProps<TextareaProps>(), {
	placeholder: 'Введите сообщение',
})
</script>

<template>
	<textarea
		v-model="modelValue"
		:placeholder="placeholder"
		:aria-invalid="invalid"
		:disabled="disabled"
		aria-label="textarea"
		class="textarea"
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
	background-color: color-mix(in srgb, var(--grey, #e2e2e2) 50%, transparent);
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

	&[aria-invalid='true'] {
		border-color: var(--red, #ff001f);
	}
}
</style>
