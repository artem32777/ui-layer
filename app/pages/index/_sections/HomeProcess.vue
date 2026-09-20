<script setup lang="ts"></script>

<template>
	<section
		id="process"
		class="valley__section valley__process"
	>
		<div class="valley__section-top">
			<span class="valley__label">04 / Наш подход</span>
		</div>
		<h2 class="valley__heading">
			Понятный процесс.
			<br>
			<span class="valley__muted">Предсказуемый результат.</span>
		</h2>
		<div class="valley__steps">
			<div class="valley__step">
				<span class="valley__step-number">01 /</span>
				<h3 class="valley__step-title">
					Погружаемся
				</h3>
				<p class="valley__step-copy">
					Знакомимся с бизнесом, аудиторией и целями. Задаём вопросы и слушаем.
				</p>
			</div>
			<div class="valley__step">
				<span class="valley__step-number">02 /</span>
				<h3 class="valley__step-title">
					Проектируем
				</h3>
				<p class="valley__step-copy">
					Собираем структуру и визуальную концепцию. Продумываем путь клиента.
				</p>
			</div>
			<div class="valley__step">
				<span class="valley__step-number">03 /</span>
				<h3 class="valley__step-title">
					Создаём
				</h3>
				<p class="valley__step-copy">
					Разрабатываем сайт, проверяем каждую деталь и готовим всё к запуску.
				</p>
			</div>
			<div class="valley__step">
				<span class="valley__step-number">04 /</span>
				<h3 class="valley__step-title">
					Развиваем
				</h3>
				<p class="valley__step-copy">
					Запускаем, анализируем и улучшаем. Сайт растёт вместе с вашим бизнесом.
				</p>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.valley__section {
	padding: 105px 5%;
	scroll-margin-top: calc(var(--valley-header-height) + 30px);
	@media (max-width: $sm) {
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
.valley__heading {
	font-size: clamp(43px, 5.25vw, 80px);
	font-weight: 500;
	line-height: 1.08;
	letter-spacing: -2.7px;
	margin: 0;
	@media (max-width: $sm) {
		font-size: 42px;
		letter-spacing: -1.6px;
	}
}
.valley__muted {
	color: #8b8f87;
}
.valley__process {
	padding-top: 35px;
}
.valley__steps {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 34px;
	margin-top: 70px;
	@media (max-width: $sm) {
		grid-template-columns: 1fr 1fr;
		gap: 40px 24px;
		margin-top: 42px;
	}
	@media (max-width: $xs) {
		grid-template-columns: 1fr;
	}
}
.valley__step {
	border-top: 1px solid #3e4337;
	padding-top: 22px;
}
.valley__step-number {
	font-size: 13px;
	color: var(--brand);
}
.valley__step-title {
	font-size: 24px;
	font-weight: 500;
	margin: 30px 0 14px;
}
.valley__step-copy {
	font-size: 14px;
	line-height: 1.6;
	color: #aeb5a1;
	margin: 0;
}
</style>
