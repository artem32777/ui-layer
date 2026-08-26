<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed, useSlots } from 'vue'
import { Icon } from '#layers/ui/app/modules/svg-icon'
import type { ButtonProps } from './Button.types.ts'

const props = withDefaults(defineProps<ButtonProps>(), {
	variant: 'primary',
	size: 'medium',
	type: 'button',
})

defineSlots<{
	/** Основное содержимое кнопки, если не используется prop `text`. */
	default?: any
}>()

const slots = useSlots()
const isIconOnly = computed(() => !props.text && !slots.default && Boolean(props.iconLeft || props.iconRight))
const iconSize = computed(() => ({ small: 14, medium: 18, big: 20 })[props.size])
</script>

<template>
	<Primitive
		as="button"
		:type="type"
		:disabled="disabled"
		class="button"
		:class="[
			`button--variant-${variant}`,
			`button--size-${size}`,
			theme,
			{ 'button--icon-only': isIconOnly },
		]"
	>
		<Icon
			v-if="iconLeft"
			:name="iconLeft"
			:size="iconSize"
			class="button-icon"
		/>

		<template v-if="text">
			{{ text }}
		</template>

		<slot v-else />

		<Icon
			v-if="iconRight"
			:name="iconRight"
			:size="iconSize"
			class="button-icon"
		/>
	</Primitive>
</template>

<style scoped lang="scss">
.button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
  @include font-size(button);
	transition: color 0.3s ease, background-color 0.3s ease;

// SIZES
	&.button--size-small {
    min-height: var(--ui-height-S);
    border-radius: var(--UI-radius-S);
		gap: 6px;
		padding: 0 12px;
	}

	&.button--size-medium {
    min-height: var(--ui-height-M);
    border-radius: var(--UI-radius-M);
		gap: 8px;
		padding: 0 18px;
	}

	&.button--size-big {
    min-height: var(--ui-height-L);
    border-radius: var(--UI-radius-L);
		gap: 8px;
		padding: 0 24px;
	}

// ICON-ONLY
	&.button--icon-only {
		padding: 0;
		aspect-ratio: 1;
	}

// VARIANTS:
	&.button--variant-primary {
    background-color: var(--bg-action-primary);
		color: var(--text-on-bg-primary);

		&:hover, &:active {
			background-color: var(--bg-action-primary-hover);
		}
	}

	&.button--variant-secondary {
		background-color: var(--bg-action-secondary);
    color: var(--text-on-bg-secondary);

		&:hover, &:active {
			background-color: var(--bg-action-secondary-hover);
		}
	}

	&.button--variant-accent {
    background-color: var(--bg-action-accent);
		color: var(--text-on-bg-accent);

		&:hover, &:active {
			background-color: var(--bg-action-accent-hover);
		}
	}

	&.button--variant-on-media {
    background-color: var(--bg-action-on-media);
		color: var(--text-on-bg-media);

		&:hover, &:active {
			background-color: var(--bg-action-on-media-hover);
		}

    &:disabled {
      outline: none;
      color: var(--text-on-bg-disabled-media);
    }
	}

	&:disabled {
		color: var(--text-on-bg-disabled);
		background-color: transparent;
    outline: 1px solid var(--border-disabled);
		pointer-events: none;
		cursor: default;
	}
}

.button-icon {
	display: inline-flex;
	flex: 0 0 auto;
}
</style>
