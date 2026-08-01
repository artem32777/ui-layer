<script setup lang="ts">
// https://reka-ui.com/docs/components/toggle
import { Toggle } from 'reka-ui'

interface Props {
	disabled?: boolean
	variant?: 'outline'
	size?: 'sm' | 'lg'
}

const { disabled = false, variant, size } = defineProps<Props>()
const modelValue = defineModel<boolean>({ default: false })
</script>

<template>
	<Toggle
		v-model="modelValue"
		class="ui-toggle"
		:class="{
			'ui-toggle--outline': variant === 'outline',
			'ui-toggle--sm': size === 'sm',
			'ui-toggle--lg': size === 'lg',
		}"
		:disabled="disabled"
	>
		<slot />
	</Toggle>
</template>

<style scoped lang="scss">
.ui-toggle {
	all: unset;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	width: 36px;
	height: 36px;
	border-radius: 6px;
	color: var(--text, #000000);
	background-color: transparent;
	font-size: 14px;
	line-height: 1;
	transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
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

	&.ui-toggle--outline {
		border: 1px solid var(--grey, #e2e2e2);
		background-color: transparent;
	}

	&.ui-toggle--sm {
		width: 32px;
		height: 32px;
		font-size: 13px;
	}

	&.ui-toggle--lg {
		width: 40px;
		height: 40px;
	}
}
</style>
