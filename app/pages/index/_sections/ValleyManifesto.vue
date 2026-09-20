<script setup lang="ts">
import { navigateOnPage } from '#layers/ui/app/modules/animation/utils/pageNavigation'
</script>

<template>
	<section class="valley-manifesto">
		<img
			class="valley-manifesto__mountain"
			data-parallax
			src="https://static.tildacdn.com/tild6536-3838-4230-b638-363763643063/web-valley-mountains.png"
			alt=""
			loading="lazy"
		>
		<div
			class="valley-manifesto__content"
		>
			<span
				class="valley-manifesto__label"
			>Больше, чем просто сайт</span>
			<h2
				class="valley-manifesto__title"
			>
				Не продаём сайт,
				<br>
				а продаём
				<span class="valley-manifesto__accent">экспертность.</span>
			</h2>
			<p
				class="valley-manifesto__copy"
			>
				Упаковку бизнеса, которая будет работать и приносить результат.
			</p>
			<a
				class="valley-manifesto__link"
				href="#projects"
				@click="navigateOnPage('#projects', $event)"
			>
				Посмотрите проекты
				<span>↗</span>
			</a>
		</div>
	</section>
</template>

<style scoped lang="scss">
.valley-manifesto {
	position: relative;
	overflow: hidden;
	height: 100svh;
	display: flex;
	align-items: center;
	background: #242725;
	&::after {
		content: '';
		position: absolute;
		inset: 0;
		background: rgb(0 0 0 / 64%);
		pointer-events: none;
	}
}
.valley-manifesto__mountain {
	position: absolute;
	width: 100%;
	height: 125%;
	top: -12%;
	object-fit: cover;
	will-change: transform;
}
.valley-manifesto__content {
	position: relative;
	z-index: 1;
	width: 100%;
	padding: 100px 5%;
	@media (max-width: $sm) {
		padding: 75px 6%;
	}
}
.valley-manifesto__label {
	display: inline-block;
	font-size: 12px;
	text-transform: uppercase;
	letter-spacing: 0.1em;
}
.valley-manifesto__title {
	margin: 55px 0 30px;
	font-size: clamp(44px, 6.9vw, 112px);
	line-height: 1.02;
	font-weight: 400;
	letter-spacing: -0.055em;
}
.valley-manifesto__accent {
	color: var(--brand);
}
.valley-manifesto__copy {
	max-width: 520px;
	margin: 0 0 48px auto;
	font-size: 24px;
	line-height: 1.35;
	@media (max-width: $sm) {
		margin-left: 0;
		font-size: 20px;
	}
}
.valley-manifesto__link {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: min(100%, 520px);
	margin-left: auto;
	border-bottom: 1px solid #f7f7f0;
	padding: 15px 0;
	color: inherit;
	text-decoration: none;
	font-size: 14px;
	text-transform: uppercase;
	transition: color 0.2s;
	&:hover {
		color: var(--brand);
	}
	@media (max-width: $sm) {
		margin-left: 0;
	}
}
</style>
