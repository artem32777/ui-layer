<script setup lang="ts"></script>

<template>
	<section class="valley-reasons">
		<div class="valley-reasons__background" aria-hidden="true">
			<img
				class="valley-reasons__mountain"
				data-parallax
				src="https://static.tildacdn.com/tild3233-6463-4630-b866-383063636430/web-valley-mountains.png"
				alt=""
				loading="lazy"
			/>
		</div>
		<div class="valley-reasons__intro">
			<span class="valley-reasons__label" data-reveal>4 причины сотрудничать с WebValley Studio</span>
			<h2 class="valley-reasons__title" data-reveal>
				Выполняем каждый проект так, словно
				<span class="valley-reasons__accent">последний</span>
			</h2>
			<p class="valley-reasons__copy" data-reveal>
				Хотим, чтобы ваш сайт был запоминающимся, привлекал клиентов и работал на нашу репутацию. Поэтому вникаем в задачу и отвечаем за
				результат.
			</p>
		</div>
		<div class="valley-reasons__grid">
			<div class="valley-reasons__reason" data-reveal>
				<span class="valley-reasons__number">01</span>
				<h3 class="valley-reasons__name">В сроки сдаём работу</h3>
				<p class="valley-reasons__description">
					Расписываем каждый этап по срокам, остаёмся на связи и пользуемся принципом несдвигаемых дедлайнов.
				</p>
			</div>
			<div class="valley-reasons__reason" data-reveal>
				<span class="valley-reasons__number">02</span>
				<h3 class="valley-reasons__name">Работаем по договору</h3>
				<p class="valley-reasons__description">Фиксируем стоимость, сроки и требования к результату. Вы знаете, что получите и когда.</p>
			</div>
			<div class="valley-reasons__reason" data-reveal>
				<span class="valley-reasons__number">03</span>
				<h3 class="valley-reasons__name">Аргументируем</h3>
				<p class="valley-reasons__description">
					Обосновываем каждый шаг. Стратегия и дизайн опираются на анализ рынка и задачи вашего бизнеса.
				</p>
			</div>
			<div class="valley-reasons__reason" data-reveal>
				<span class="valley-reasons__number">04</span>
				<h3 class="valley-reasons__name">Рекомендуем</h3>
				<p class="valley-reasons__description">
					Погружаемся в бизнес, находим подходящие решения и делимся рекомендациями, которые помогут двигаться дальше.
				</p>
			</div>
		</div>
		<a class="valley-reasons__cta" href="#contact" data-reveal>
			<span class="valley-reasons__cta-title">
				Сделаем сайт,
				<br />
				который продаёт
			</span>
			<span class="valley-reasons__cta-arrow">↗</span>
			<span class="valley-reasons__cta-label">Сотрудничать</span>
		</a>
	</section>
</template>

<style scoped lang="scss">
.valley-reasons {
	position: relative;
	padding: 110px 5% 0;
	@media (max-width: 760px) {
		padding: 70px 6% 0;
	}
}
.valley-reasons__background {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: calc(100svh - var(--valley-header-height));
	overflow: clip;
	pointer-events: none;
}
.valley-reasons__mountain {
	position: absolute;
	inset: 0;
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
	filter: brightness(0.18);
}
.valley-reasons__intro {
	position: relative;
}
.valley-reasons__label {
	font-size: 12px;
	text-transform: uppercase;
	color: #c1c3ba;
}
.valley-reasons__title {
	max-width: 1150px;
	margin: 40px 0;
	font-size: clamp(40px, 5.2vw, 84px);
	line-height: 1.05;
	font-weight: 400;
	letter-spacing: -0.045em;
}
.valley-reasons__accent {
	color: var(--valley-yellow);
}
.valley-reasons__copy {
	max-width: 550px;
	margin: 0 0 75px auto;
	font-size: 20px;
	line-height: 1.45;
	color: #c1c3ba;
	@media (max-width: 760px) {
		margin-left: 0;
	}
}
.valley-reasons__grid {
	position: relative;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 36px;
	@media (max-width: 1000px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (max-width: 520px) {
		grid-template-columns: 1fr;
	}
}
.valley-reasons__reason {
	padding-top: 23px;
	border-top: 1px solid #4b4d45;
}
.valley-reasons__number {
	font-size: 14px;
	color: var(--valley-yellow);
}
.valley-reasons__name {
	margin: 40px 0 20px;
	font-size: 26px;
	font-weight: 400;
	letter-spacing: -0.03em;
}
.valley-reasons__description {
	font-size: 16px;
	line-height: 1.5;
	color: #c1c3ba;
}
.valley-reasons__cta {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 105px -5.5556% 0;
	padding: 70px 5%;
	min-height: 360px;
	background: var(--valley-yellow);
	color: #111211;
	text-decoration: none;
	&:hover .valley-reasons__cta-arrow {
		transform: translate(12px, -12px);
	}
	@media (max-width: 760px) {
		margin: 70px -6.8182% 0;
		padding: 55px 6% 80px;
		min-height: 270px;
	}
}
.valley-reasons__cta-title {
	font-size: clamp(38px, 6.1vw, 96px);
	line-height: 1;
	letter-spacing: -0.05em;
}
.valley-reasons__cta-arrow {
	font-size: clamp(60px, 11vw, 160px);
	transition: transform 0.3s;
}
.valley-reasons__cta-label {
	position: absolute;
	bottom: 30px;
	left: 5%;
	text-transform: uppercase;
	font-size: 12px;
}
</style>
