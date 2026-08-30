<script setup lang="ts">
import { Toggle } from 'reka-ui'
import type { ChipProps } from './Chip.types.ts'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'

// https://reka-ui.com/docs/components/toggle

withDefaults(defineProps<ChipProps>(), {
	type: 'toggle',
	size: 'medium',
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
		:class="[
			`chip--type-${type}`,
			`chip--size-${size}`,
		]"
	>
		<slot>{{ text }}</slot>

		<Icon
			v-if="type === 'dropdown'"
			:name="modelValue ? iconNames['chevron-up'] : iconNames['chevron-down']"
			:size="16"
			class="chip__icon"
			aria-hidden="true"
		/>

		<Icon
			v-else-if="type === 'dismissible' && modelValue"
			:name="iconNames['x-close']"
			:size="16"
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
	white-space: nowrap;
	color: var(--text-on-bg-secondary);
	background-color: var(--surface-block);
  @include font-size(button-small);
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;

	&:hover, &:focus-visible {
		background-color: var(--bg-action-secondary-hover);
    outline: none;
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
		color: var(--text-on-bg-disabled);
		background-color: var(--bg-action-disabled);
	}

  &--size-small {
    height: var(--ui-height-XS);
    border-radius: var(--UI-radius-XS);
    padding: 0 10px;
  }

	&--size-medium {
		height: var(--ui-height-S);
		border-radius: var(--UI-radius-S);
    padding: 0 12px;
	}
}

.chip__icon {
	flex-shrink: 0;
}
</style>
