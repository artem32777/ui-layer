<script setup lang="ts">
import { navigateOnPage } from '#layers/ui/app/modules/animation/utils/pageNavigation'

defineProps<{
	brand: { href: string, name: string, studio: string, ariaLabel: string }
}>()
</script>

<template>
	<a
		class="valley__brand"
		:href="brand.href"
		:aria-label="brand.ariaLabel"
		@click="navigateOnPage(brand.href, $event)"
	>
		<span class="valley__brand-name">{{ brand.name }}</span>
		<span class="valley__brand-studio">{{ brand.studio }}</span>
	</a>
</template>

<style scoped lang="scss">
.valley__brand {
	position: relative;
	z-index: 2;
	color: #f7f7f0;
	text-decoration: none;
	font-size: 33px;
	font-weight: 750;
	letter-spacing: -1.7px;
	line-height: 0.85;
	display: flex;
	flex-direction: column;
	&:hover {
		.valley__brand-name {
			background-position: 0 0;
		}
	}
}
.valley__brand-name {
	width: fit-content;
	background-image: linear-gradient(90deg, var(--brand) 50%, #f7f7f0 50%);
	background-size: 200% 100%;
	background-position: 100% 0;
	background-clip: text;
	color: transparent;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	transition: background-position 0.45s ease;
	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}
}
.valley__brand-studio {
	font-size: 25px;
	font-weight: 500;
	letter-spacing: 2.8px;
	margin-top: 8px;
}
</style>
