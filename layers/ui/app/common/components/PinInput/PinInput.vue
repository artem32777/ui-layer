<script setup lang="ts" generic="T extends 'text' | 'number' = 'text'">
import { PinInputInput, PinInputRoot } from 'reka-ui'
import type { PinInputProps } from './PinInput.types'

type PinInputValue<T extends 'text' | 'number'> = [T] extends ['number'] ? number[] : string[]

const modelValue = defineModel<PinInputValue<T>>({ default: () => [] })

withDefaults(defineProps<PinInputProps<T>>(), {
	length: 6,
	state: 'default',
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
		:disabled="disabled || state === 'disabled'"
		:aria-invalid="invalid || state === 'invalid' ? true : undefined"
		class="pin-input"
		:class="[
			`pin-input--state-${state}`,
			{ 'pin-input--invalid': invalid || state === 'invalid' },
		]"
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

	&.pin-input--invalid,
	&.pin-input--state-invalid {
		.pin-input__input {
			border-color: var(--red, #ff001f);
		}
	}

	&.pin-input--state-hovered {
		.pin-input__input {
			border-color: var(--grey, #e2e2e2);
		}
	}

	&.pin-input--state-focused {
		.pin-input__input {
			border-color: var(--brand, #4149f2);
			outline: none;
			box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand, #4149f2) 20%, transparent);
		}
	}

	&.pin-input--state-disabled {
		.pin-input__input {
			border-color: var(--grey, #e2e2e2);
			color: color-mix(in srgb, var(--text, #000000) 50%, transparent);
			background-color: var(--background, #ffffff);
			opacity: 0.5;
			cursor: default;
		}
	}
}

.pin-input__input {
	width: 48px;
	height: 56px;
	border-radius: 8px;
	color: var(--text, #000000);
	background-color: color-mix(in srgb, var(--grey, #e2e2e2) 40%, transparent);
	text-align: center;
	transition: border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;

	&:hover {
		border-color: var(--grey, #e2e2e2);
	}

	&:focus-visible {
		border-color: var(--brand, #4149f2);
		outline: none;
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand, #4149f2) 20%, transparent);
	}

	&[data-disabled] {
		border-color: var(--grey, #e2e2e2);
		color: color-mix(in srgb, var(--text, #000000) 50%, transparent);
		background-color: var(--background, #ffffff);
		opacity: 0.5;
		cursor: default;
	}
}
</style>
