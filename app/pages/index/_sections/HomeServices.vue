<script setup lang="ts"></script>

<template>
	<section id="services" class="valley__section valley__services">
		<div class="valley__section-top"><span class="valley__label">03 / Что мы делаем</span></div>
		<div class="valley__heading-row">
			<h2 class="valley__heading">
				Всё, что нужно
				<br />
				<span class="valley__muted">для роста.</span>
			</h2>
			<p class="valley__section-copy">
				От идеи до запуска.
				<br />
				И ещё дальше.
			</p>
		</div>
		<a class="valley__service" href="#contact">
			<span class="valley__service-number">01</span>
			<h3 class="valley__service-title">Стратегия</h3>
			<p class="valley__service-copy">
				Исследуем бизнес и аудиторию.
				<br />
				Определяем цели и структуру сайта.
			</p>
			<span class="valley__service-arrow">↗</span>
		</a>
		<a class="valley__service" href="#contact">
			<span class="valley__service-number">02</span>
			<h3 class="valley__service-title">Контент</h3>
			<p class="valley__service-copy">
				Тексты, фотографии и видео.
				<br />
				Рассказываем о вашем бизнесе.
			</p>
			<span class="valley__service-arrow">↗</span>
		</a>
		<a class="valley__service" href="#contact">
			<span class="valley__service-number">03</span>
			<h3 class="valley__service-title">Дизайн</h3>
			<p class="valley__service-copy">
				UX/UI и визуальная концепция.
				<br />
				Ваш характер в каждом пикселе.
			</p>
			<span class="valley__service-arrow">↗</span>
		</a>
		<a class="valley__service" href="#contact">
			<span class="valley__service-number">04</span>
			<h3 class="valley__service-title">Технологии</h3>
			<p class="valley__service-copy">
				Tilda, индивидуальная разработка
				<br />
				и интеграции для ваших задач.
			</p>
			<span class="valley__service-arrow">↗</span>
		</a>
	</section>
</template>

<style scoped lang="scss">
.valley__section {
	padding: 105px 5%;
	scroll-margin-top: calc(var(--valley-header-height) + 30px);
	@media (max-width: 760px) {
		padding: 68px 6%;
	}
}
.valley__section-top {
	display: flex;
	justify-content: space-between;
	margin-bottom: 47px;
	gap: 20px;
}
.valley__label {
	font-size: 12px;
	color: #d5d6ce;
}
.valley__heading-row {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	gap: 40px;
	margin-bottom: 55px;
	@media (max-width: 760px) {
		display: block;
		margin-bottom: 35px;
	}
}
.valley__heading {
	font-size: clamp(43px, 5.25vw, 80px);
	font-weight: 500;
	line-height: 1.08;
	letter-spacing: -2.7px;
	margin: 0;
	@media (max-width: 760px) {
		font-size: 42px;
		letter-spacing: -1.6px;
	}
}
.valley__muted {
	color: #8b8f87;
}
.valley__section-copy {
	font-size: 17px;
	line-height: 1.55;
	color: #bcbfb6;
	max-width: 380px;
	margin: 0 0 5px;
	@media (max-width: 760px) {
		margin-top: 25px;
		font-size: 16px;
	}
}
.valley__service {
	display: grid;
	grid-template-columns: 65px 1.2fr 1fr 50px;
	gap: 25px;
	align-items: center;
	padding: 38px 0;
	border-top: 1px solid #383b32;
	text-decoration: none;
	color: #f7f7f0;
	transition: color 0.2s;
	&:last-child {
		border-bottom: 1px solid #383b32;
	}
	&:hover {
		color: var(--valley-yellow);
		.valley__service-arrow {
			transform: translate(3px, -3px);
		}
	}
	@media (max-width: 760px) {
		grid-template-columns: 28px 1fr 25px;
		gap: 12px;
		padding: 27px 0;
	}
}
.valley__service-number {
	font-size: 13px;
	color: #969b8d;
}
.valley__service-title {
	font-size: clamp(28px, 3.2vw, 46px);
	font-weight: 450;
	letter-spacing: -1.2px;
	margin: 0;
	@media (max-width: 760px) {
		font-size: 28px;
	}
}
.valley__service-copy {
	font-size: 14px;
	color: #b1b6a7;
	line-height: 1.55;
	margin: 0;
	@media (max-width: 760px) {
		grid-column: 2;
		font-size: 13px;
		margin-top: 6px;
	}
}
.valley__service-arrow {
	font-size: 40px;
	transition: transform 0.2s;
	@media (max-width: 760px) {
		grid-column: 3;
		grid-row: 1;
		font-size: 28px;
	}
}
</style>
