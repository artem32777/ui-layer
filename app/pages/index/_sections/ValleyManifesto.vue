<script setup lang="ts"></script>

<template>
	<section class="valley-manifesto">
		<img
			class="valley-manifesto__mountain"
			data-parallax
			src="https://static.tildacdn.com/tild6536-3838-4230-b638-363763643063/web-valley-mountains.png"
			alt=""
			loading="lazy"
		/>
		<div class="valley-manifesto__content">
			<span class="valley-manifesto__label" data-reveal>Больше, чем просто сайт</span>
			<h2 class="valley-manifesto__title" data-reveal>
				Не продаём сайт,
				<br />
				а продаём
				<span class="valley-manifesto__accent">экспертность.</span>
			</h2>
			<p class="valley-manifesto__copy" data-reveal>Упаковку бизнеса, которая будет работать и приносить результат.</p>
			<a class="valley-manifesto__link" data-reveal href="#projects">
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
	min-height: 760px;
	display: flex;
	align-items: center;
	background: #242725;
	@media (max-width: 760px) {
		min-height: 600px;
	}
}
.valley-manifesto__mountain {
	position: absolute;
	width: 100%;
	height: 125%;
	top: -12%;
	object-fit: cover;
	filter: brightness(0.36);
}
.valley-manifesto__content {
	position: relative;
	width: 100%;
	padding: 100px 5%;
	@media (max-width: 760px) {
		padding: 75px 6%;
	}
}
.valley-manifesto__label {
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
	color: var(--valley-yellow);
}
.valley-manifesto__copy {
	max-width: 520px;
	margin: 0 0 48px auto;
	font-size: 24px;
	line-height: 1.35;
	@media (max-width: 760px) {
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
		color: var(--valley-yellow);
	}
	@media (max-width: 760px) {
		margin-left: 0;
	}
}
</style>
