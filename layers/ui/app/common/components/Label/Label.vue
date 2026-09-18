<script setup lang="ts">
import type { LabelProps } from './Label.types.ts'

withDefaults(defineProps<LabelProps>(), {
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
		class="label"
		:class="[
			`label--variant-${variant}`,
			`label--size-${size}`,
		]"
	>
		<slot>{{ text }}</slot>
	</span>
</template>

<style scoped lang="scss">
.label {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	white-space: nowrap;
	@include font-size(p2);
  line-height: 0;

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
