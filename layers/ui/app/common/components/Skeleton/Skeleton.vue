<script setup lang="ts">
export interface SkeletonProps {
	/** Ширина скелетона */
	width?: string | number
	/** Высота скелетона */
	height?: string | number
	/** Радиус скругления */
	borderRadius?: string | number
	/** Включает shimmer-анимацию. */
	animated?: boolean
}

withDefaults(defineProps<SkeletonProps>(), {
	width: '100%',
	height: '10px',
	borderRadius: '4px',
	animated: true,
})
</script>

<template>
	<div
		class="skeleton"
		:class="{ 'skeleton--animated': animated }"
		:style="{ width, height, borderRadius }"
		aria-hidden="true"
	/>
</template>

<style scoped lang="scss">
.skeleton {
	flex-shrink: 0;
	overflow: hidden;
	background-color: var(--neutral-500, #e2e2e2);
}

.skeleton--animated {
	background-image: linear-gradient(
		90deg,
		transparent 25%,
		color-mix(in srgb, var(--background, #ffffff) 55%, transparent) 50%,
		transparent 75%
	);
	background-size: 200% 100%;
	animation: skeleton-shimmer 1.5s ease-in-out infinite;

	@media (prefers-reduced-motion: reduce) {
		background-image: none;
		animation: none;
	}
}

@keyframes skeleton-shimmer {
	from {background-position: 200% 0}
	to {background-position: -200% 0}
}
</style>
