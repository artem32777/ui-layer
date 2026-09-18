<script setup lang="ts">
import { ref } from 'vue'

const activeReview = ref(0)
const reviews = [
	{
		name: 'Юрий Маркин',
		role: 'CEO Dealer Cars',
		text: 'Начали с идеи простого сайта-витрины, а в результате получили полноценный функциональный сайт. Юрий отмечает, что команда сохранила его время, соблюла сроки и превзошла первоначальные ожидания.',
		href: 'https://web-valley.ru/o-studii/otzyvy-o-webvalley-studio',
	},
	{
		name: 'Ольга Рагаза',
		role: 'CEO Ragaza Agency',
		text: 'Ольга выделяет индивидуальный подход, внимание к результату и постоянную связь. Команда предложила решения и дизайн, которым заказчик доверился. Готовый сайт попал в подборки лучших работ Тильды.',
		href: 'https://web-valley.ru/arkhiv-portfolio-i-keysi/agentstvo-po-podboru-crm',
	},
	{
		name: 'STLogistic24',
		role: 'Транспортная компания',
		text: 'Заказчик отмечает качество работы и сроки. Команда подробно объясняла решения, отвечала на вопросы и помогала разобраться в деталях. Лёгкое общение позволило спокойно доверить студии результат.',
		href: 'https://web-valley.ru/portfolio-i-keysi-webvalley/sozdanie-sajta-transportnoj-kompanii',
	},
]
</script>

<template>
	<section id="reviews" class="valley-reviews">
		<div class="valley-reviews__top">
			<span class="valley-reviews__label" data-reveal>Отзывы клиентов</span>
			<a
				class="valley-reviews__all"
				href="https://web-valley.ru/o-studii/otzyvy-o-webvalley-studio"
				target="_blank"
				rel="noopener noreferrer"
			>
				Читать все отзывы ↗
			</a>
		</div>
		<h2 class="valley-reviews__title" data-reveal>
			Что о нас говорят
			<br />
			после сотрудничества
		</h2>
		<div class="valley-reviews__review" aria-live="polite" data-reveal>
			<span class="valley-reviews__quote" aria-hidden="true">“</span>
			<Transition name="valley-review" mode="out-in">
				<div :key="activeReview" class="valley-reviews__content">
					<p class="valley-reviews__text">{{ reviews[activeReview]?.text }}</p>
					<a class="valley-reviews__author" :href="reviews[activeReview]?.href" target="_blank" rel="noopener noreferrer">
						{{ reviews[activeReview]?.name }} ↗
					</a>
					<span class="valley-reviews__role">{{ reviews[activeReview]?.role }}</span>
				</div>
			</Transition>
		</div>
		<div class="valley-reviews__bottom">
			<span class="valley-reviews__note">Краткое содержание отзывов. Оригиналы — по ссылкам.</span>
			<div class="valley-reviews__controls">
				<button
					class="valley-reviews__button"
					aria-label="Предыдущий отзыв"
					@click="activeReview = (activeReview + reviews.length - 1) % reviews.length"
				>
					←
				</button>
				<span class="valley-reviews__count">{{ activeReview + 1 }} / {{ reviews.length }}</span>
				<button class="valley-reviews__button" aria-label="Следующий отзыв" @click="activeReview = (activeReview + 1) % reviews.length">
					→
				</button>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.valley-reviews {
	padding: 110px 5%;
	@media (max-width: 760px) {
		padding: 70px 6%;
	}
}
.valley-reviews__top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 25px;
}
.valley-reviews__label {
	color: #c1c3ba;
	font-size: 12px;
	text-transform: uppercase;
}
.valley-reviews__all {
	color: inherit;
	font-size: 12px;
	text-decoration: none;
	text-transform: uppercase;
	&:hover {
		color: var(--valley-yellow);
	}
}
.valley-reviews__title {
	margin: 42px 0 65px;
	font-size: clamp(40px, 5.6vw, 90px);
	line-height: 1.05;
	letter-spacing: -0.045em;
	font-weight: 400;
}
.valley-reviews__review {
	display: grid;
	grid-template-columns: 1fr 3fr;
	min-height: 320px;
	@media (max-width: 760px) {
		grid-template-columns: 1fr;
		min-height: 380px;
	}
}
.valley-reviews__quote {
	font-size: 200px;
	line-height: 1;
	color: var(--valley-yellow);
	@media (max-width: 760px) {
		font-size: 90px;
		height: 60px;
	}
}
.valley-reviews__text {
	font-size: clamp(22px, 2.5vw, 38px);
	line-height: 1.35;
	margin: 0 0 35px;
	letter-spacing: -0.02em;
}
.valley-reviews__author {
	display: block;
	color: var(--valley-yellow);
	font-size: 18px;
	text-decoration: none;
	margin-bottom: 7px;
	&:hover {
		text-decoration: underline;
	}
}
.valley-reviews__role {
	font-size: 14px;
	color: #c1c3ba;
}
.valley-reviews__bottom {
	margin-top: 40px;
	border-top: 1px solid #4b4d45;
	padding-top: 25px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 25px;
	@media (max-width: 760px) {
		flex-direction: column-reverse;
		align-items: flex-start;
	}
}
.valley-reviews__note {
	font-size: 12px;
	color: #b5b8ae;
}
.valley-reviews__controls {
	display: flex;
	align-items: center;
	gap: 20px;
}
.valley-reviews__button {
	display: grid;
	place-items: center;
	width: 52px;
	height: 52px;
	border: 1px solid #696b62;
	background: transparent;
	color: inherit;
	font-size: 23px;
	cursor: pointer;
	transition:
		background 0.2s,
		color 0.2s;
	&:hover {
		background: var(--valley-yellow);
		color: #111211;
	}
	&:focus-visible {
		outline: 2px solid var(--valley-yellow);
		outline-offset: 4px;
	}
}
.valley-reviews__count {
	min-width: 45px;
	text-align: center;
	font-size: 14px;
}
.valley-review-enter-active,
.valley-review-leave-active {
	transition:
		opacity 0.2s,
		transform 0.2s;
	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}
}
.valley-review-enter-from,
.valley-review-leave-to {
	opacity: 0;
	transform: translateY(12px);
}
</style>
