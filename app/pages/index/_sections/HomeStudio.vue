<script setup lang="ts"></script>

<template>
	<section id="studio" class="valley__section valley__studio">
		<div class="valley__section-top">
			<span class="valley__label">02 / О студии</span>
			<span class="valley__section-note">Небольшая команда. Большие возможности.</span>
		</div>
		<h2 class="valley__studio-heading">
			Не просто красиво.
			<br />
			Красиво
			<span class="valley__accent">и с результатом.</span>
		</h2>
		<div class="valley__studio-text">
			<p class="valley__section-copy">
				Мы — WebValley Studio. Погружаемся в ваш бизнес, находим главное и превращаем это в сайт, который хочется изучать.
			</p>
			<p class="valley__section-copy">
				Работаем как часть вашей команды. Без лишних звеньев, сложных терминов и решений «потому что красиво».
			</p>
		</div>
		<div class="valley__stats">
			<div class="valley__stat">
				<strong class="valley__stat-number">64</strong>
				<span class="valley__stat-description">проекта за 5 лет</span>
			</div>
			<div class="valley__stat">
				<strong class="valley__stat-number">
					<span class="valley__stat-plus">ТОП</span>
					50
				</strong>
				<span class="valley__stat-description">в рейтингах РФ по 36 срезам</span>
			</div>
			<div class="valley__stat">
				<strong class="valley__stat-number">0</strong>
				<span class="valley__stat-description">негативных отзывов</span>
			</div>
			<div class="valley__stat">
				<strong class="valley__stat-number">
					72
					<span class="valley__stat-plus">%</span>
				</strong>
				<span class="valley__stat-description">сокращение расходов на содержание сайта*</span>
			</div>
		</div>
		<p class="valley__footnote">* По оценке студии. Показатели зависят от задачи и ниши.</p>
	</section>
</template>

<style scoped lang="scss">
.valley__accent {
	color: var(--valley-yellow);
}
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
.valley__section-note {
	font-size: 12px;
	color: #9a9d95;
	@media (max-width: 760px) {
		display: none;
	}
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
.valley__studio {
	border-top: 1px solid #33352f;
	background: #181a17;
}
.valley__studio-heading {
	font-size: clamp(45px, 5.5vw, 85px);
	line-height: 1.12;
	letter-spacing: -2.8px;
	font-weight: 500;
	margin: 0 0 40px;
	@media (max-width: 760px) {
		font-size: 42px;
		letter-spacing: -1.6px;
	}
}
.valley__studio-text {
	display: flex;
	justify-content: flex-end;
	gap: 65px;
	margin-bottom: 74px;
	@media (max-width: 760px) {
		display: block;
		margin-bottom: 45px;
	}
}
.valley__stats {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	border-top: 1px solid #42453c;
	@media (max-width: 760px) {
		grid-template-columns: 1fr 1fr;
		gap: 35px 20px;
	}
}
.valley__stat {
	padding-top: 25px;
	display: flex;
	flex-direction: column;
}
.valley__stat-number {
	font-size: clamp(66px, 7.8vw, 116px);
	font-weight: 450;
	letter-spacing: -5px;
	line-height: 1.12;
	@media (max-width: 760px) {
		font-size: 65px;
		letter-spacing: -3px;
	}
}
.valley__stat-plus {
	font-size: 0.48em;
	color: var(--valley-yellow);
	vertical-align: top;
	line-height: 1.8;
}
.valley__stat-description {
	font-size: 13px;
	color: #bcbfb6;
	margin-top: 15px;
}
.valley__footnote {
	color: #898e81;
	font-size: 11px;
	margin: 32px 0 0;
}
</style>
