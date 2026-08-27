<script setup lang="ts">
import { Icon } from '#layers/ui/app/modules/svg-icon'
import type { ButtonLinkProps } from './ButtonLink.types.ts'

withDefaults(defineProps<ButtonLinkProps>(), {
	variant: 'dark',
	size: 'medium',
})

defineSlots<{
	/** Основное содержимое ссылки, если не используется prop `text`. */
	default?: any
}>()
</script>

<template>
	<a
		:href="href"
		class="button-link"
		:class="[
			`button-link--variant-${variant}`,
			`button-link--size-${size}`,
			theme,
		]"
	>
		<Icon
			v-if="iconLeft"
			:name="iconLeft"
			:size="20"
			class="button-link__icon"
		/>

		<template v-if="text">
			{{ text }}
		</template>

		<slot v-else />

		<Icon
			v-if="iconRight"
			:name="iconRight"
			:size="20"
			class="button-link__icon"
		/>
	</a>
</template>

<style scoped lang="scss">
.button-link {
	display: inline-flex;
	align-items: center;
	transition: color 0.3s ease;
  gap: 8px;

// SIZES
	&--size-medium {
    @include font-size(button);
	}

	&--size-big {
    @include font-size(lead);
	}

// VARIANTS
	&--variant-dark {
		color: var(--text-on-surface-dark);

		&:hover, &:active {
			color: var(--text-on-surface-dark-hover);
		}
	}

	&--variant-accent {
		color: var(--text-on-surface-accent);

		&:hover, &:active {
			color: var(--text-on-surface-accent-hover);
		}
	}

	&--variant-on-media {
		color: var(--text-on-surface-white);

		&:hover, &:active {
			color: var(--text-on-surface-white-hover);
		}

		&[aria-disabled='true'] {
			color: var(--text-on-bg-disabled-media);
		}
	}
}

.button-link__icon {
	display: inline-flex;
	flex: 0 0 auto;
}
</style>
