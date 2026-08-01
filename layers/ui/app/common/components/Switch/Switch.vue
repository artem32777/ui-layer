<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui'

/** Включённое состояние переключателя. */
const modelValue = defineModel<boolean>({ default: false })

interface Props {
	/** Отключает переключатель и запрещает взаимодействие. */
	disabled?: boolean
}

defineProps<Props>()
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
	position: relative;
	display: inline-flex;
	align-items: center;
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
		outline-offset: 2px;
	}

	&[data-disabled] {
		opacity: 0.5;
		cursor: not-allowed;
	}
}

.switch__thumb {
	display: block;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background-color: var(--white, #ffffff);
	transform: translateX(0);
	transition: transform 0.3s ease;

	&[data-state="checked"] {
		transform: translateX(16px);
	}
}
</style>
