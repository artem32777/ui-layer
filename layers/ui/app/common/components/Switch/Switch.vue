<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui'

// https://reka-ui.com/docs/components/switch

export interface SwitchProps {
	/** Отключает переключатель и запрещает взаимодействие. */
	disabled?: boolean
}

defineProps<SwitchProps>()

const modelValue = defineModel<boolean>({ default: false })
</script>

<template>
	<SwitchRoot
		v-model="modelValue"
		class="switch"
		:disabled="disabled"
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
	background-color: var(--additional-1, #21223c);
	transition: background-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
	cursor: pointer;

	&[data-state="checked"] {
		background-color: var(--brand, #4149f2);
	}

	&:focus-visible {
		outline: 2px solid var(--brand-dark, #292fba);
		outline-offset: 1px;
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
