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
const iconSize = computed(() => props.size === 'small' ? 14 : props.size === 'medium' ? 18 : 20)
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
			{
				'button--icon-only': isIconOnly,
			},
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
	font-weight: 600;
	transition: color 0.3s ease, background-color 0.3s ease;

// SIZES
	&.button--size-small {
		gap: 6px;
		min-height: 30px;
		padding: 0 12px;
		font-size: 14px;
		line-height: 14px;
    border-radius: 10px;
	}

	&.button--size-medium {
		gap: 8px;
		min-height: 40px;
		padding: 0 18px;
    @include font-size(button);
		line-height: 20px;
    border-radius: 12px;
	}

	&.button--size-big {
		gap: 8px;
		min-height: 54px;
		padding: 0 24px;
		@include font-size(button);
		line-height: 20px;
    border-radius: 16px;
	}

// ICON-ONLY
	&.button--icon-only {
		padding: 0;
		aspect-ratio: 1;
	}

// VARIANTS:
	&.button--variant-primary {
		color: var(--white);
		background-color: var(--Backgrounds-bg-primary);

		&:hover, &:active {
			background-color: var(--primary-light);
		}
	}

	&.button--variant-secondary {
		color: var(--neutral-950);
		background-color: var(--neutral-500);

		&:hover, &:active {
			background-color: var(--neutral-600);
		}
	}

	&.button--variant-accent {
		color: var(--white);
		background-color: var(--accent);

		&:hover, &:active {
			background-color: var(--accent-dark);
		}
	}

	&.button--white {
		color: var(--neutral-950);
		background-color: var(--white);

		&:hover, &:active {
			background-color: var(--white-90);
		}

    &:disabled {
      background-color: var(--white-50);
    }
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 35%, transparent);
	}

	&:disabled {
		color: var(--neutral-750);
		background-color: var(--neutral-500);
		pointer-events: none;
		cursor: default;
	}
}

.button-icon {
	display: inline-flex;
	flex: 0 0 auto;
}
</style>
