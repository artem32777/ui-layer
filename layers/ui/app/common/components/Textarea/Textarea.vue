<script setup lang="ts">
const modelValue = defineModel<string>({ default: '' })

interface TextareaProps {
	placeholder?: string
	disabled?: boolean
	rows?: number
}
withDefaults(defineProps<TextareaProps>(), {
	rows: 4,
})
</script>

<template>
	<textarea
		v-model="modelValue"
		class="textarea"
		:placeholder="placeholder"
		:disabled="disabled"
		:rows="rows"
	/>
</template>

<style scoped lang="scss">
.textarea {
	width: 100%;
	max-width: 848px;
	min-height: 120px;
	padding: 16px;
	resize: vertical;
	border: 1px solid transparent;
	border-radius: 8px;
	color: var(--text, #000000);
	background-color: color-mix(in srgb, var(--grey, #e2e2e2) 50%, transparent);
	line-height: 1.5;
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
