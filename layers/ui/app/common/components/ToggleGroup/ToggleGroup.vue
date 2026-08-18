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
	border: 1px solid var(--grey, #e2e2e2);
	border-radius: 6px;
	background-color: var(--background, #ffffff);

	&:hover {
		.toggle-group__item {
			color: var(--additional-1, #21223c);
			background-color: var(--grey, #e2e2e2);
		}
	}

	&:focus-within {
		.toggle-group__item {
			outline: none;
			box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--brand, #4149f2) 35%, transparent);
		}
	}
}

.toggle-group__item {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	color: var(--text, #000000);
	background-color: var(--background, #ffffff);
	transition: background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease;

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
