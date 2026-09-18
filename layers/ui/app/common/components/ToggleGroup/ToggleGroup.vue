<script setup lang="ts">
import { ToggleGroupItem, ToggleGroupRoot } from 'reka-ui'
import type { ToggleGroupProps } from './ToggleGroup.types.ts'

// https://reka-ui.com/docs/components/toggle-group

withDefaults(defineProps<ToggleGroupProps>(), {
	type: 'single',
})

const modelValue = defineModel<string | string[]>()
</script>

<template>
	<ToggleGroupRoot
		v-model="modelValue"
		:type="type"
		class="toggle-group"
		:disabled="disabled"
	>
		<ToggleGroupItem
			v-for="option in items"
			:key="option.value"
			:value="option.value"
			:disabled="option.disabled"
			class="toggle-group__item"
		>
			{{ option.label }}
		</ToggleGroupItem>
	</ToggleGroupRoot>
</template>

<style scoped lang="scss">
.toggle-group {
	display: inline-flex;
	border: 1px solid var(--border-muted);
	border-radius: 6px;
	background-color: var(--surface);

	&:hover {
		.toggle-group__item {
			color: var(--text-hover);
			background-color: var(--surface-muted);
		}
	}

	&:focus-within {
		.toggle-group__item {
			outline: none;
			box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--focus) 35%, transparent);
		}
	}
}

.toggle-group__item {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	color: var(--text);
	background-color: var(--surface);
	transition: background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease;

	&:hover {
		color: var(--text-hover);
		background-color: var(--surface-muted);
	}

	&[data-state="on"] {
		color: var(--text-hover);
		background-color: var(--surface-muted);
	}

	&:focus-visible {
		outline: none;
		box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--focus) 35%, transparent);
	}

	&[data-disabled] {
		opacity: 0.5;
		cursor: not-allowed;
	}
}
</style>
