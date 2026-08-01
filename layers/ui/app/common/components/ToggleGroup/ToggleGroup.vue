<script setup lang="ts">
// https://reka-ui.com/docs/components/toggle-group
import { ToggleGroupItem, ToggleGroupRoot } from 'reka-ui'
import type { ToggleOption } from './ToggleGroup.types'

export type { ToggleOption } from './ToggleGroup.types'

interface Props {
	options: ToggleOption[]
	type?: 'single' | 'multiple'
}

const { options, type = 'single' } = defineProps<Props>()
const modelValue = defineModel<string | string[]>()
</script>

<template>
	<ToggleGroupRoot
		v-model="modelValue"
		class="ui-toggle-group"
		:type="type"
	>
		<ToggleGroupItem
			v-for="option in options"
			:key="option.value"
			class="ui-toggle-group__item"
			:value="option.value"
			:disabled="option.disabled"
		>
			{{ option.label }}
		</ToggleGroupItem>
	</ToggleGroupRoot>
</template>

<style scoped lang="scss">
.ui-toggle-group {
	display: inline-flex;
	align-items: center;
	border: 1px solid var(--grey, #e2e2e2);
	border-radius: 6px;
	background-color: var(--background, #ffffff);
	overflow: hidden;
}

.ui-toggle-group__item {
	all: unset;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	width: 36px;
	height: 36px;
	color: var(--text, #000000);
	background-color: var(--background, #ffffff);
	font-size: 14px;
	line-height: 1;
	transition: background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease;
	cursor: pointer;

	&:hover {
		color: var(--additional-1, #21223c);
		background-color: var(--grey, #e2e2e2);
	}

	&[data-state="on"] {
		color: var(--additional-1, #21223c);
		background-color: var(--grey, #e2e2e2);
	}

	&:focus-visible {
		outline: none;
		box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--brand, #4149f2) 35%, transparent);
	}

	&[data-disabled] {
		opacity: 0.5;
		cursor: not-allowed;
	}
}
</style>
