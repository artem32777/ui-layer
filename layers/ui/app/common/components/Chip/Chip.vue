<script setup lang="ts">
import { Toggle } from 'reka-ui'
import type { ChipProps } from './Chip.types.ts'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'

// https://reka-ui.com/docs/components/toggle

withDefaults(defineProps<ChipProps>(), {
	type: 'toggle',
})

defineSlots<{
	/** Основное содержимое, если не используется prop `text`. */
	default?: any
}>()

const modelValue = defineModel<boolean>({ default: false })
</script>

<template>
	<Toggle
		v-model="modelValue"
		:disabled="disabled"
		class="chip"
		:class="[`chip--type-${type}`]"
	>
		<slot>{{ text }}</slot>

		<Icon
			v-if="type === 'dropdown'"
			:name="modelValue ? iconNames['chevron-up'] : iconNames['chevron-down']"
			:size="14"
			class="chip__icon"
			aria-hidden="true"
		/>

		<Icon
			v-else-if="type === 'dismissible'"
			:name="iconNames['x-close']"
			:size="14"
			class="chip__icon"
			aria-hidden="true"
		/>
	</Toggle>
</template>

<style scoped lang="scss">
.chip {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 4px;
	height: var(--ui-height-S);
	padding: 0 12px;
	border: 1px solid var(--border-neutral);
	border-radius: var(--UI-radius-L);
	white-space: nowrap;
	@include font-size(button-small);
	color: var(--text-on-surface-dark);
	background-color: var(--surface-block);
	transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
	cursor: pointer;

	&:hover {
		background-color: var(--bg-field-hover);
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--border-primary) 35%, transparent);
	}

	&[data-state='on'] {
		border-color: transparent;
		color: var(--text-on-bg-selected);
		background-color: var(--bg-controls-selected);

		&:hover {
			background-color: var(--bg-controls-selected-hover);
		}
	}

	&[data-disabled] {
		pointer-events: none;
		border-color: transparent;
		color: var(--text-on-bg-disabled);
		background-color: var(--bg-action-disabled);
	}
}

.chip__icon {
	flex-shrink: 0;
}
</style>
