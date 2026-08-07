<script setup lang="ts">
import { Toggle as ToggleRoot } from 'reka-ui'

// https://reka-ui.com/docs/components/toggle

export interface ToggleProps {
	/** Визуальный вариант. */
	variant?: 'outline' | 'base'
	/** Размер. */
	size?: 'sm' | 'md' | 'lg'
	/** Отключает переключатель и запрещает взаимодействие. */
	disabled?: boolean
}

withDefaults(defineProps<ToggleProps>(), {
	variant: 'base',
	size: 'md',
})

const modelValue = defineModel<boolean>({ default: false })

defineSlots<{
	/** Содержимое переключателя. */
	default?: any
}>()
</script>

<template>
	<ToggleRoot
		v-model="modelValue"
		class="toggle"
		:class="[
			`toggle--${size}`,
			`toggle--${variant}`,
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

  &--outline {
    border: 1px solid var(--grey, #e2e2e2);
    background-color: transparent;
  }

// SIZES:
  &--sm {
    width: 32px;
    height: 32px;
    font-size: 13px;
  }

  &--md {
    width: 36px;
    height: 36px;
  }

  &--lg {
    width: 40px;
    height: 40px;
  }
}
</style>
