<script setup lang="ts">
export interface SpinnerProps {
	/** Размер индикатора. */
	size?: 's' | 'm' | 'l'
	/** Доступное название состояния загрузки. */
	label?: string
}

withDefaults(defineProps<SpinnerProps>(), {
	size: 'm',
	label: 'Загрузка',
})
</script>

<template>
	<span
		class="spinner"
		:class="`spinner--${size}`"
		role="status"
		:aria-label="label"
	/>
</template>

<style scoped lang="scss">
.spinner {
	display: inline-block;
	flex-shrink: 0;
	border: 2px solid color-mix(in srgb, currentColor 25%, transparent);
	border-top-color: currentColor;
	border-radius: 50%;
	color: var(--brand, #4149f2);
	animation: spinner-rotate 0.8s linear infinite;

	@media (prefers-reduced-motion: reduce) {
		animation: none;
	}
}

.spinner--s {
	width: 16px;
	height: 16px;
}

.spinner--m {
	width: 24px;
	height: 24px;
}

.spinner--l {
	width: 32px;
	height: 32px;
}

@keyframes spinner-rotate {
	to {transform: rotate(360deg)}
}
</style>
