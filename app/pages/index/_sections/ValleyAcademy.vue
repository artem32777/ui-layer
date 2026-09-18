<script setup lang="ts"></script>

<template>
	<section id="academy" class="valley-academy">
		<div class="valley-academy__heading">
			<span class="valley-academy__label" data-reveal>WebValley Academy</span>
			<h2 class="valley-academy__title" data-reveal>
				Онлайн-обучение
				<br />
				<span class="valley-academy__accent">Digital-профессиям</span>
			</h2>
		</div>
		<div class="valley-academy__body">
			<video class="valley-academy__video" controls playsinline preload="metadata" poster="https://static.tildacdn.com/tild6332-3532-4832-b763-393330396163/Group_1_2.jpg" aria-label="Знакомство с WebValley Academy">
				<source src="https://attachment.web-valley.ru/academy/INTRO_WVA_NEW.mp4" type="video/mp4" />
			</video>
			<div class="valley-academy__info" data-reveal>
				<p class="valley-academy__copy">
					Объединили опыт студии и работы на фрилансе в онлайн-школу для дизайнеров. Учим создавать сайты, работать с клиентами и осваивать
					Digital-профессии на студийном уровне.
				</p>
				<a class="valley-academy__link" href="https://web-valley.ru/academy" target="_blank" rel="noopener noreferrer">
					Подробнее о школе
					<span>↗</span>
				</a>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.valley-academy {
	padding: 110px 5%;
	@media (max-width: 760px) {
		padding: 70px 6%;
	}
}
.valley-academy__label {
	color: #c1c3ba;
	font-size: 12px;
	text-transform: uppercase;
	letter-spacing: 0.1em;
}
.valley-academy__title {
	font-size: clamp(38px, 5.6vw, 90px);
	font-weight: 400;
	line-height: 1.05;
	letter-spacing: -0.045em;
	margin: 35px 0 65px;
}
.valley-academy__accent {
	color: var(--valley-yellow);
}
.valley-academy__body {
	display: grid;
	grid-template-columns: 1.5fr 1fr;
	gap: 7%;
	align-items: center;
	@media (max-width: 900px) {
		grid-template-columns: 1fr;
		gap: 35px;
	}
}
.valley-academy__video {
	display: block;
	width: 100%;
	aspect-ratio: 16/9;
	background: #242725;
	object-fit: cover;
}
.valley-academy__copy {
	font-size: 22px;
	line-height: 1.45;
	margin: 0 0 55px;
	@media (max-width: 760px) {
		font-size: 19px;
		margin-bottom: 35px;
	}
}
.valley-academy__link {
	display: flex;
	justify-content: space-between;
	padding: 18px 0;
	text-transform: uppercase;
	font-size: 13px;
	border-bottom: 1px solid #696b62;
	color: inherit;
	text-decoration: none;
	transition: color 0.2s;
	&:hover {
		color: var(--valley-yellow);
	}
}
</style>
