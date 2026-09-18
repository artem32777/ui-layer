<script setup lang="ts"></script>

<template>
	<section class="valley__section valley__faq">
		<div class="valley__faq-heading">
			<span class="valley__label">05 / Есть вопросы?</span>
			<h2 class="valley__heading">
				Отвечаем
				<br />
				<span class="valley__muted">по делу.</span>
			</h2>
		</div>
		<div class="valley__questions">
			<details class="valley__question">
				<summary class="valley__question-title">
					Как выбрать студию для разработки сайта?
					<span class="valley__question-plus">+</span>
				</summary>
				<p class="valley__answer">
					Посмотрите портфолио, узнайте, как выстроена работа, и обсудите вашу задачу. Важно, чтобы команда понимала бизнес и могла
					объяснить, как предложенное решение поможет достичь ваших целей.
				</p>
			</details>
			<details class="valley__question">
				<summary class="valley__question-title">
					Сколько стоит сайт и сколько времени занимает разработка?
					<span class="valley__question-plus">+</span>
				</summary>
				<p class="valley__answer">
					Цена и сроки зависят от объёма сайта, контента и интеграций. После обсуждения задачи подготовим предложение с этапами, стоимостью
					и сроками.
				</p>
			</details>
			<details class="valley__question">
				<summary class="valley__question-title">
					Вы работаете с клиентами из других городов?
					<span class="valley__question-plus">+</span>
				</summary>
				<p class="valley__answer">
					Да, работаем удалённо. Обсуждаем проект на видеовстречах, согласовываем материалы онлайн и остаёмся на связи в течение всей
					работы.
				</p>
			</details>
			<details class="valley__question">
				<summary class="valley__question-title">
					Можно ли попасть к вам в команду?
					<span class="valley__question-plus">+</span>
				</summary>
				<p class="valley__answer">
					Напишите нам о себе, приложите портфолио и расскажите, какие задачи вам интересны. Мы познакомимся и обсудим возможности
					сотрудничества.
				</p>
			</details>
			<details class="valley__question">
				<summary class="valley__question-title">
					Как заказать сайт и что для этого нужно?
					<span class="valley__question-plus">+</span>
				</summary>
				<p class="valley__answer">
					Оставьте заявку или напишите нам. Расскажите о бизнесе, аудитории и цели сайта. Поможем собрать требования, определить объём работ
					и подготовить необходимые материалы.
				</p>
			</details>
			<details class="valley__question">
				<summary class="valley__question-title">
					У меня уже есть сайт. Можете помочь?
					<span class="valley__question-plus">+</span>
				</summary>
				<p class="valley__answer">
					Да. Изучим существующий сайт и ваши задачи, предложим доработку, редизайн или новую версию. Объём изменений обсудим до начала
					работы.
				</p>
			</details>
			<details class="valley__question">
				<summary class="valley__question-title">
					Вы занимаетесь продвижением сайтов?
					<span class="valley__question-plus">+</span>
				</summary>
				<p class="valley__answer">
					Да, помогаем с SEO и контекстной рекламой. Анализируем аудиторию и спрос, готовим сайт к продвижению и оцениваем результат.
				</p>
			</details>
		</div>
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
.valley__label {
	font-size: 12px;
	color: #d5d6ce;
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
.valley__faq {
	background: #181a17;
	display: grid;
	grid-template-columns: 1fr 1.4fr;
	gap: 65px;
	@media (max-width: 760px) {
		grid-template-columns: 1fr;
		gap: 38px;
	}
}
.valley__faq-heading {
	.valley__heading {
		margin-top: 40px;
	}
}
.valley__question {
	border-top: 1px solid #3d4235;
	&:last-child {
		border-bottom: 1px solid #3d4235;
	}
	&[open] {
		.valley__question-plus {
			transform: rotate(45deg);
			color: var(--valley-yellow);
		}
	}
}
.valley__question-title {
	padding: 26px 0;
	font-size: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
	cursor: pointer;
	list-style: none;
	&::-webkit-details-marker {
		display: none;
	}
	@media (max-width: 760px) {
		font-size: 18px;
	}
}
.valley__question-plus {
	font-size: 31px;
	font-weight: 300;
	transition: transform 0.2s;
}
.valley__answer {
	margin: 0;
	padding: 0 38px 28px 0;
	font-size: 15px;
	line-height: 1.6;
	color: #b8bfae;
}
</style>
