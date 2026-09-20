<script setup lang="ts">
import { navigateOnPage } from '#layers/ui/app/modules/animation/utils/pageNavigation'
</script>

<template>
	<div class="valley__footer-top">
		<a
			class="valley__brand"
			href="#"
			@click="navigateOnPage('#', $event)"
		>
			webvalley
			<span class="valley__brand-studio">studio®</span>
		</a>
		<a
			class="valley__footer-email"
			href="mailto:hello@web-valley.ru"
		>hello@web-valley.ru ↗</a>
		<a
			class="valley__back-top"
			href="#"
			@click="navigateOnPage('#', $event)"
		>Наверх ↑</a>
	</div>
</template>

<style scoped lang="scss">
.valley__brand {
	color: #f7f7f0;
	text-decoration: none;
	font-size: 33px;
	font-weight: 750;
	letter-spacing: -1.7px;
	line-height: 0.85;
	display: flex;
	flex-direction: column;
}
.valley__brand-studio {
	font-size: 11px;
	font-weight: 500;
	letter-spacing: 2.8px;
	margin-top: 8px;
}
.valley__footer-top {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 30px;
	padding-bottom: 50px;
	@media (max-width: $sm) {
		flex-wrap: wrap;
		gap: 30px;
	}
}
.valley__footer-email {
	color: #f7f7f0;
	text-decoration: none;
	font-size: clamp(18px, 2.4vw, 34px);
	letter-spacing: -0.7px;
	&:hover {
		color: var(--brand);
	}
	@media (max-width: $sm) {
		order: 3;
		width: 100%;
	}
}
.valley__back-top {
	color: #d6dec9;
	text-decoration: none;
	font-size: 13px;
}
</style>
