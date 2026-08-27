<script setup lang="ts">
import type { BadgeProps } from './Badge.types.ts'

withDefaults(defineProps<BadgeProps>(), {
	variant: 'primary',
	size: 'medium',
	type: 'circle',
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
			`badge--type-${type}`,
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
	box-sizing: border-box;
	white-space: nowrap;
	@include font-size(label);

	&--size-medium {
		height: var(--ui-height-XS);
		min-width: var(--ui-height-XS);
		padding: 0 10px;
	}

	&--size-big {
		height: var(--ui-height-S);
		min-width: var(--ui-height-S);
		padding: 0 12px;
	}

	&--type-circle {
		border-radius: 9999px;
	}

	&--type-square {
		border-radius: var(--UI-radius-XSS);
	}

	&--variant-primary {
		background-color: var(--bg-action-primary);
		color: var(--text-on-bg-primary);
	}

	&--variant-secondary {
		background-color: var(--bg-action-secondary);
		color: var(--text-on-bg-secondary);
	}

	&--variant-accent {
		background-color: var(--bg-action-accent);
		color: var(--text-on-bg-accent);
	}
}
</style>
