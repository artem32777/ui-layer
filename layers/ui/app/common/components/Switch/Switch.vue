<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import type { SwitchProps } from './Switch.types.ts'

// https://reka-ui.com/docs/components/switch

defineProps<SwitchProps>()

const modelValue = defineModel<boolean>()
</script>

<template>
	<SwitchRoot
		v-model="modelValue"
		class="switch"
		:disabled="disabled"
		:aria-invalid="invalid"
		aria-label="Переключатель"
	>
		<SwitchThumb class="switch__thumb" />
	</SwitchRoot>
</template>

<style scoped lang="scss">
.switch {
	display: inline-flex;
	width: 36px;
	height: 20px;
	padding: 2px;
	border-radius: 200px;
	background-color: var(--primary-dark, #21223c);
	transition: background-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
	cursor: pointer;

	&:hover {
		background-color: color-mix(in srgb, var(--primary-dark, #21223c) 85%, var(--white, #ffffff));
	}

	&[data-state="checked"] {
		background-color: var(--brand, #4149f2);

		&:hover {
			background-color: var(--brand-dark, #292fba);
		}
	}

	&:focus-visible {
		outline: 2px solid var(--brand-dark, #292fba);
		outline-offset: 1px;
	}

	&[aria-invalid='true'] {
		box-shadow: 0 0 0 1px var(--accent, #ff001f);
	}

	&[data-disabled] {
		opacity: 0.5;
		cursor: not-allowed;
	}
}

.switch__thumb {
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background-color: var(--white, #ffffff);
	transition: transform 0.3s ease;

	&[data-state="checked"] {
		transform: translateX(16px);
	}
}
</style>
