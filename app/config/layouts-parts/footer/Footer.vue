<script setup lang="ts">
import { navigateOnPage } from '#layers/ui/app/modules/animation/utils/pageNavigation'
import FooterTop from './FooterTop.vue'
import FooterNavigation from './FooterNavigation.vue'
import FooterBottom from './FooterBottom.vue'
</script>

<template>
	<footer class="valley__footer">
		<a
			class="valley__all-services"
			href="#services"
			@click="navigateOnPage('#services', $event)"
		>
			<span>Все услуги студии</span>
			<span class="valley__all-services-arrow">↗</span>
		</a>
		<FooterTop />
		<FooterNavigation />
		<FooterBottom />
	</footer>
</template>

<style scoped lang="scss">
.valley__footer {
	position: relative;
	z-index: $z-footer;
	padding: 45px 5% 28px;
	border-top: 1px solid #383e31;
	background: #111211;
	color: #f7f7f0;
	@media (max-width: $sm) {
		padding: 35px 6% 28px;
	}
}
.valley__all-services {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 30px;
	padding: 55px 5%;
	margin: -45px -5.555556% 60px;
	color: #111211;
	background: var(--brand);
	text-decoration: none;
	font-size: clamp(35px, 6vw, 88px);
	letter-spacing: -2px;
	line-height: 1.1;
	&:hover {
		.valley__all-services-arrow {
			transform: translate(7px, -7px);
		}
	}
	@media (max-width: $sm) {
		padding: 40px 6%;
		margin: -35px -6.818182% 45px;
		font-size: 36px;
		letter-spacing: -1px;
	}
}
.valley__all-services-arrow {
	transition: transform 0.25s;
}
</style>
