<script setup lang="ts">
import HomeProjectCard from '../_components/HomeProjectCard.vue'

const projects = [
	{
		href: 'https://web-valley.ru/portfolio-i-keysi-webvalley/sajt-katalog-optiki',
		image: 'https://static.tildacdn.com/tild3265-3736-4162-b066-343535383439/optic_lab.png',
		alt: 'Дизайн сайта Optic Lab',
		title: 'Optic Lab',
		category: 'Сайт-каталог · Дизайн · Разработка',
	},
	{
		href: 'https://web-valley.ru/arkhiv-portfolio-i-keysi/agentstvo-po-podboru-crm',
		image: 'https://static.tildacdn.com/tild6336-3939-4237-b731-366264313634/ragaza.png',
		alt: 'Дизайн сайта Ragaza',
		title: 'Ragaza',
		category: 'CRM · Корпоративный сайт',
	},
	{
		href: 'https://web-valley.ru/portfolio-i-keysi-webvalley/sozdanie-sajta-transportnoj-kompanii',
		image: 'https://static.tildacdn.com/tild3530-3461-4036-b066-356135346465/STLogistic.png',
		alt: 'Дизайн сайта ST Logistic',
		title: 'ST Logistic',
		category: 'Корпоративный сайт · Логистика',
		variant: 'logistic' as const,
	},
	{
		href: 'https://web-valley.ru/portfolio-i-keysi-webvalley/konversionniy-lending-dlya-kursov-restart-academy',
		image: 'https://static.tildacdn.com/tild6639-6261-4637-a466-643061623263/restart.png',
		alt: 'Дизайн сайта Restart Academy',
		title: 'Restart Academy',
		category: 'Образование · Лендинг',
	},
	{
		href: 'https://web-valley.ru/arkhiv-portfolio-i-keysi/design-sayta-companii-dealer-cars',
		image: 'https://static.tildacdn.com/tild6531-6531-4664-a234-373961313764/Dealer_cars.png',
		alt: 'Дизайн сайта Dealer Cars',
		title: 'Dealer Cars',
		category: 'Автомобильный бизнес · Дизайн · Разработка',
		variant: 'cars' as const,
	},
]
</script>

<template>
	<section
		id="projects"
		class="valley__section valley__projects"
	>
		<div class="valley__section-top">
			<span class="valley__label">01 / Избранные проекты</span>
			<span class="valley__section-note">У каждого бизнеса — своя история</span>
		</div>
		<div class="valley__heading-row">
			<h2 class="valley__heading">
				Меньше слов.
				<br>
				<span class="valley__muted">Больше дела.</span>
			</h2>
			<p class="valley__section-copy">
				Сайты, в которых эстетика
				<br>
				встречается с эффективностью.
			</p>
		</div>
		<div class="valley__project-grid">
			<HomeProjectCard
				v-for="project in projects"
				:key="project.href"
				:href="project.href"
				:image="project.image"
				:alt="project.alt"
				:title="project.title"
				:category="project.category"
				:variant="project.variant"
			/>
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
.valley__section-note {
	font-size: 12px;
	color: #9a9d95;
	@media (max-width: $sm) {
		display: none;
	}
}
.valley__heading-row {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	gap: 40px;
	margin-bottom: 55px;
	@media (max-width: $sm) {
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
	@media (max-width: $sm) {
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
	@media (max-width: $sm) {
		margin-top: 25px;
		font-size: 16px;
	}
}
.valley__project-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 48px 28px;
	@media (max-width: $sm) {
		grid-template-columns: 1fr;
		gap: 35px;
	}
}
</style>
