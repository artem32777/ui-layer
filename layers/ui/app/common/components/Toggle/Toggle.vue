<script setup lang="ts">
import { Toggle as ToggleRoot } from 'reka-ui'
import type { ToggleProps } from './Toggle.types.ts'

// https://reka-ui.com/docs/components/toggle

withDefaults(defineProps<ToggleProps>(), {
	variant: 'primary',
	size: 'medium',
})

defineSlots<{
	/** Содержимое переключателя. */
	default?: any
}>()

const modelValue = defineModel<boolean>({ default: false })
</script>

<template>
	<ToggleRoot
		v-model="modelValue"
		class="toggle"
		:class="[
			`toggle--variant-${variant}`,
			`toggle--size-${size}`,
		]"
		:disabled="disabled"
	>
		<slot />
	</ToggleRoot>
</template>

<style scoped lang="scss">
.toggle {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 6px;
	color: var(--text, #000000);
	cursor: pointer;

  &.toggle--variant-outline {
    border: 1px solid var(--grey, #e2e2e2);
    background-color: transparent;
  }

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
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand, #4149f2) 35%, transparent);
	}

	&[data-disabled] {
		opacity: 0.5;
		cursor: not-allowed;
	}

// SIZES:
	&.toggle--size-small {
		width: 32px;
		height: 32px;
		font-size: 13px;
	}

	&.toggle--size-medium {
		width: 36px;
		height: 36px;
	}

	&.toggle--size-big {
		width: 40px;
		height: 40px;
	}
}
</style>
