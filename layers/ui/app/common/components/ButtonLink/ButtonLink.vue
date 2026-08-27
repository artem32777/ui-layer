<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed, useSlots } from 'vue'
import { Icon } from '#layers/ui/app/modules/svg-icon'
import type { ButtonLinkProps } from './ButtonLink.types.ts'

const props = withDefaults(defineProps<ButtonLinkProps>(), {
	variant: 'dark',
	size: 'medium',
	href: '#',
})

defineSlots<{
	/** Основное содержимое ссылки, если не используется prop `text`. */
	default?: any
}>()

const slots = useSlots()
const isIconOnly = computed(() => !props.text && !slots.default && Boolean(props.iconLeft || props.iconRight))
const iconSize = computed(() => ({ medium: 18, big: 20 })[props.size])
</script>

<template>
	<Primitive
		as="a"
		:href="disabled ? undefined : href"
		:aria-disabled="disabled || undefined"
		:tabindex="disabled ? -1 : undefined"
		class="button-link"
		:class="[
			`button-link--variant-${variant}`,
			`button-link--size-${size}`,
			theme,
			{ 'button-link--icon-only': isIconOnly },
		]"
	>
		<Icon
			v-if="iconLeft"
			:name="iconLeft"
			:size="iconSize"
			class="button-link__icon"
		/>

		<template v-if="text">
			{{ text }}
		</template>

		<slot v-else />

		<Icon
			v-if="iconRight"
			:name="iconRight"
			:size="iconSize"
			class="button-link__icon"
		/>
	</Primitive>
</template>

<style scoped lang="scss">
.button-link {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	@include font-size(button);
	text-decoration: none;
	transition: color 0.3s ease;
	cursor: pointer;

// SIZES
	&.button-link--size-medium {
		min-height: var(--ui-height-M);
		gap: 8px;
	}

	&.button-link--size-big {
		min-height: var(--ui-height-L);
		gap: 8px;
	}

// ICON-ONLY
	&.button-link--icon-only {
		aspect-ratio: 1;
	}

// VARIANTS
	&.button-link--variant-dark {
		color: var(--text-on-surface-dark);

		&:hover, &:active {
			color: var(--text-on-surface-dark-hover);
		}
	}

	&.button-link--variant-accent {
		color: var(--text-on-surface-accent);

		&:hover, &:active {
			color: var(--text-on-surface-accent-hover);
		}
	}

	&.button-link--variant-on-media {
		color: var(--text-on-surface-white);

		&:hover, &:active {
			color: var(--text-on-surface-white-hover);
		}

		&[aria-disabled='true'] {
			color: var(--text-on-bg-disabled-media);
		}
	}

	&[aria-disabled='true'] {
		color: var(--text-on-bg-disabled);
		pointer-events: none;
		cursor: default;
	}
}

.button-link__icon {
	display: inline-flex;
	flex: 0 0 auto;
}
</style>
