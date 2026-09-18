<script setup lang="ts" generic="T extends PinInputType = 'text'">
import { PinInputInput, PinInputRoot } from 'reka-ui'
import type { PinInputProps, PinInputType } from './PinInput.types.ts'

type PinInputValue<T extends PinInputType> = [T] extends ['number'] ? number[] : string[]

const modelValue = defineModel<PinInputValue<T>>({ default: () => [] })

withDefaults(defineProps<PinInputProps<T>>(), {
	length: 6,
})

const emit = defineEmits<{
	/** Вызывается после заполнения всех полей. */
	complete: [value: PinInputValue<T>]
}>()
</script>

<template>
	<PinInputRoot
		v-model="modelValue"
		:type="type"
		:placeholder="placeholder"
		:mask="mask"
		:otp="otp"
		:disabled="disabled"
		:aria-invalid="invalid"
		class="pin-input"
		aria-label="Pin Input"
		@complete="emit('complete', $event)"
	>
		<PinInputInput
			v-for="index in length"
			:key="index"
			class="pin-input__input"
			:index="index - 1"
		/>
	</PinInputRoot>
</template>

<style scoped lang="scss">
.pin-input {
	display: inline-flex;
	gap: 8px;

	&:hover {
		.pin-input__input {
			border-color: var(--focus);
		}
	}

	&:focus-within {
		.pin-input__input {
			border-color: var(--focus);
			outline: none;
			box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus) 20%, transparent);
		}
	}

	&[aria-invalid='true'] {
		.pin-input__input {
			border-color: var(--error);
		}
	}
}

.pin-input__input {
	width: 48px;
	height: 56px;
	border: 1px solid transparent;
	border-radius: 8px;
	color: var(--text);
	background-color: color-mix(in srgb, var(--surface-muted) 40%, transparent);
	text-align: center;
	transition: border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;

	&[data-disabled] {
		border-color: var(--border-muted);
		color: color-mix(in srgb, var(--text) 50%, transparent);
		background-color: var(--surface);
		opacity: 0.5;
		cursor: default;
	}
}
</style>
