<script setup lang="ts">
import { ColorFieldInput, ColorFieldRoot, type ColorChannel, type ColorSpace } from 'reka-ui'

interface Props {
	colorSpace?: ColorSpace
	channel?: ColorChannel
	placeholder?: string
	disabled?: boolean
	readonly?: boolean
	disableWheelChange?: boolean
	locale?: string
	step?: number
	name?: string
	required?: boolean
}

defineOptions({ inheritAttrs: false })

withDefaults(defineProps<Props>(), {
	colorSpace: 'hsl',
	disabled: false,
	readonly: false,
	disableWheelChange: false,
})

const modelValue = defineModel<string>({ default: '#3b82f6' })
</script>

<template>
	<ColorFieldRoot
		v-model="modelValue"
		class="ui-color-field"
		:color-space="colorSpace"
		:channel="channel"
		:placeholder="placeholder"
		:disabled="disabled"
		:readonly="readonly"
		:disable-wheel-change="disableWheelChange"
		:locale="locale"
		:step="step"
		:name="name"
		:required="required"
	>
		<ColorFieldInput
			v-bind="$attrs"
			class="ui-color-field__input"
		/>
	</ColorFieldRoot>
</template>

<style scoped lang="scss">
.ui-color-field {
	width: min(240px, 100%);
}

.ui-color-field__input {
	box-sizing: border-box;
	width: 100%;
	height: 48px;
	padding: 0 14px;
	border: 1px solid transparent;
	border-radius: 8px;
	color: var(--text, #000000);
	background-color: color-mix(in srgb, var(--neutral-500, #e2e2e2) 40%, transparent);
	transition: border-color 0.3s ease, background-color 0.3s ease, opacity 0.3s ease;

	&::placeholder {
		color: color-mix(in srgb, var(--text, #000000) 50%, transparent);
	}

	&:focus {
		outline: none;
		border-color: var(--brand, #4149f2);
	}

	&[data-readonly] {
		border-color: var(--neutral-500, #e2e2e2);
		background-color: var(--background, #ffffff);
		cursor: default;
	}

	&[data-disabled] {
		border-color: var(--neutral-500, #e2e2e2);
		color: color-mix(in srgb, var(--text, #000000) 50%, transparent);
		background-color: var(--background, #ffffff);
		cursor: default;
		opacity: 0.6;
	}
}
</style>
