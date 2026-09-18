<script setup lang="ts">
import type { BadgeProps } from './Badge.types.ts'

withDefaults(defineProps<BadgeProps>(), {
	variant: 'primary',
	size: 'medium',
})

defineSlots<{
	/** Основное содержимое, если не используется prop `text`. */
	default?: any
}>()
</script>

<template>
	<span
		class="badge"
		:class="[
			`badge--variant-${variant}`,
			`badge--size-${size}`,
		]"
	>
		<slot>{{ text }}</slot>
	</span>
</template>

<style scoped lang="scss">
.badge {
	display: inline-flex;
	align-items: center;
	justify-content: center;
  border-radius: var(--UI-radius-XS);
  line-height: 0 !important;

// SIZES:
	&--size-medium {
    @include font-size(label);
		height: var(--ui-height-XXS);
		min-width: var(--ui-height-XXS);
    padding: 0 6px;
	}

	&--size-big {
    @include font-size(button-small);
    height: var(--ui-height-XS);
		min-width: var(--ui-height-XS);
    padding: 0 8px;
	}

// VARIANTS:
	&--variant-primary {
		background-color: var(--primary);
		color: var(--on-primary);
	}

	&--variant-secondary {
		background-color: var(--surface-muted);
		color: var(--text);
	}

	&--variant-accent {
		background-color: var(--accent);
		color: var(--on-accent);
	}
}
</style>
