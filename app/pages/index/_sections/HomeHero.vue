<script setup lang="ts"></script>

<template>
	<section class="valley__hero">
		<video
			class="valley__hero-video"
			autoplay
			muted
			loop
			playsinline
			poster="https://static.tildacdn.com/tild6132-3633-4364-b663-393832323464/nathan-de-fortunato-.png"
			aria-hidden="true"
		>
			<source src="https://attachment.web-valley.ru/Mountains.mp4" type="video/mp4" />
		</video>
		<div class="valley__hero-shade" />
		<div class="valley__hero-content">
			<div class="valley__eyebrow">
				<span class="valley__status-dot" />
				Независимая digital-студия
				<span class="valley__hero-location">Дизайн · Разработка · Продвижение</span>
			</div>
			<h1 class="valley__hero-title">
				Создаём сайты,
				<br />
				которые работают
				<br />
				<span class="valley__accent">на ваш бизнес</span>
			</h1>
			<div class="valley__hero-rule" data-line />
			<div class="valley__hero-bottom">
				<p class="valley__hero-copy">
					Превращаем сложные задачи
					<br />
					в понятные цифровые решения.
				</p>
				<p class="valley__hero-copy valley__hero-copy--second">
					От первого впечатления
					<br />
					до заявки вашего клиента.
				</p>
				<a class="valley__hero-cta" href="#contact">
					Давайте знакомиться
					<span class="valley__circle-arrow">↗</span>
				</a>
			</div>
			<a class="valley__scroll" href="#projects">
				<span>Листайте вниз</span>
				<span>↓</span>
			</a>
		</div>
	</section>
</template>

<style scoped lang="scss">
.valley__hero {
	overflow: hidden;
	min-height: calc(100svh - var(--valley-header-height));
	position: relative;
	display: flex;
}
.valley__hero-video {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.valley__hero-shade {
	position: absolute;
	inset: 0;
	background: linear-gradient(90deg, rgba(0, 0, 0, 0.49), rgba(0, 0, 0, 0.12)), linear-gradient(0deg, rgba(0, 0, 0, 0.65), transparent 65%);
}
.valley__hero-content {
	position: relative;
	padding: 47px 5% 27px;
	min-height: calc(100svh - var(--valley-header-height));
	width: 100%;
	display: flex;
	flex-direction: column;
	@media (max-width: 760px) {
		padding: 35px 6% 25px;
	}
}
.valley__eyebrow {
	display: flex;
	gap: 10px;
	align-items: center;
	font-size: 12px;
	letter-spacing: 0.1px;
}
.valley__status-dot {
	width: 6px;
	height: 6px;
	background: var(--valley-yellow);
	border-radius: 50%;
	flex-shrink: 0;
}
.valley__hero-location {
	margin-left: auto;
	@media (max-width: 760px) {
		display: none;
	}
}
.valley__hero-title {
	font-size: clamp(66px, 7.15vw, 112px);
	line-height: 1.01;
	font-weight: 650;
	letter-spacing: -4.5px;
	margin: auto 0 48px;
	padding-top: 42px;
	max-width: 1130px;
	@media (max-width: 760px) {
		font-size: clamp(43px, 9.5vw, 69px);
		letter-spacing: -2px;
		margin: auto 0 44px;
		padding-top: 50px;
	}
}
.valley__accent {
	color: var(--valley-yellow);
}
.valley__hero-bottom {
	padding-top: 26px;
	display: grid;
	grid-template-columns: 1fr 1fr 1.1fr;
	align-items: center;
	gap: 30px;
	@media (max-width: 760px) {
		grid-template-columns: 1fr;
		gap: 26px;
	}
}
.valley__hero-rule {
	height: 1px;
	background: rgba(255, 255, 255, 0.45);
}
.valley__hero-copy {
	font-size: 16px;
	line-height: 1.5;
	margin: 0;
}
.valley__hero-copy--second {
	@media (max-width: 760px) {
		display: none;
	}
}
.valley__hero-cta {
	text-decoration: none;
	color: #f7f7f0;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 25px;
	font-size: 18px;
	&:hover {
		.valley__circle-arrow {
			transform: rotate(45deg);
		}
	}
	@media (max-width: 760px) {
		justify-content: flex-start;
	}
}
.valley__circle-arrow {
	width: 69px;
	height: 69px;
	display: grid;
	place-items: center;
	background: var(--valley-yellow);
	color: #111211;
	border-radius: 50%;
	font-size: 36px;
	transition: transform 0.2s;
}
.valley__scroll {
	display: flex;
	justify-content: space-between;
	font-size: 11px;
	color: #ddd;
	text-decoration: none;
	padding-top: 40px;
	@media (max-width: 760px) {
		padding-top: 40px;
		margin-top: auto;
	}
}
</style>
