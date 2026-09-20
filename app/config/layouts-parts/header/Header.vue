<script setup lang="ts">
import { ref } from 'vue'
import HomeHeaderBrand from './HomeHeaderBrand.vue'
import HomeHeaderContact from './HomeHeaderContact.vue'
import HomeHeaderMenu from './HomeHeaderMenu.vue'
import HomeHeaderNav from './HomeHeaderNav.vue'

const brand = {
	href: '#',
	name: 'SMART',
	studio: 'studio',
	ariaLabel: 'WebValley Studio — главная',
}

const navLinks = [
	{ href: '#projects', label: 'Проекты' },
	{ href: '#services', label: 'Услуги' },
	{ href: '#studio', label: 'Студия' },
]

const contactLink = {
	href: '#contact',
	label: 'Обсудить проект',
}

const menuLinks = [
	{ href: '#', label: 'Главная' },
	{ href: '#studio', label: 'О студии' },
	{ href: '#services', label: 'Услуги' },
	{ href: '#projects', label: 'Проекты' },
	{ href: '#academy', label: 'Обучение' },
	{ href: '#contact', label: 'Контакты' },
	{ href: '#process', label: 'Этапы работ' },
	{ href: '#reviews', label: 'Отзывы' },
	{ href: '#faq', label: 'FAQ' },
	{ href: 'https://web-valley.ru/partnerskie-programmy-veb-studij', label: 'Партнёрка' },
	{ href: '#blog', label: 'Блог' },
	{ href: 'https://web-valley.ru/o-studii/vakansii-veb-studii', label: 'Вакансии' },
	{ href: 'https://web-valley.ru/brif', label: 'Бриф' },
]

const menuOpen = ref(false)
</script>

<template>
	<header
		class="valley__header"
		:class="{ 'valley__header--menu-open': menuOpen }"
	>
		<HomeHeaderBrand :brand="brand" />
		<HomeHeaderNav :links="navLinks" />
		<HomeHeaderContact
			:link="contactLink"
			@click="menuOpen = false"
		/>
		<HomeHeaderMenu
			v-model:open="menuOpen"
			:links="menuLinks"
		/>
	</header>
</template>

<style scoped lang="scss">
.valley__header {
	--valley-header-height: 94px;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	z-index: $z-header;
	height: var(--valley-header-height);
	display: flex;
	align-items: center;
	gap: 48px;
	padding: 0 5%;
	background: #111211;
	transition: background-color 0.35s ease;

	@media (max-width: $sm) {
		--valley-header-height: 78px;
		padding: 0 6%;
		gap: 20px;
	}

	html.is-scroll-locked & {
		padding-inline-end: calc(5% + var(--scrollbar-width));

		@media (max-width: $sm) {
			padding-inline-end: calc(6% + var(--scrollbar-width));
		}
	}
}
.valley__header--menu-open {
	background: transparent;
}
</style>
