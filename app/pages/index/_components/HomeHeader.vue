<script setup lang="ts">
import { ref } from 'vue'

const menuOpen = ref(false)
</script>

<template>
	<header class="valley__header">
		<a class="valley__brand" href="#" aria-label="WebValley Studio — главная">
			webvalley
			<span class="valley__brand-studio">studio®</span>
		</a>
		<nav class="valley__navigation" aria-label="Основная навигация">
			<a class="valley__nav-link" href="#projects">Проекты</a>
			<a class="valley__nav-link" href="#services">Услуги</a>
			<a class="valley__nav-link" href="#studio">Студия</a>
		</nav>
		<a class="valley__header-contact" href="#contact">
			Обсудить проект
			<span>↗</span>
		</a>
		<button
			class="valley__menu-button"
			:class="{ 'valley__menu-button--open': menuOpen }"
			type="button"
			:aria-expanded="menuOpen"
			aria-controls="valley-menu"
			:aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'"
			@click="menuOpen = !menuOpen"
		>
			<span class="valley__menu-line" />
			<span class="valley__menu-line" />
		</button>
		<nav v-if="menuOpen" id="valley-menu" class="valley__mobile-menu" aria-label="Меню">
			<a class="valley__mobile-link" href="#projects" @click="menuOpen = false">Проекты ↗</a>
			<a class="valley__mobile-link" href="#services" @click="menuOpen = false">Услуги ↗</a>
			<a class="valley__mobile-link" href="#studio" @click="menuOpen = false">Студия ↗</a>
			<a class="valley__mobile-link" href="#contact" @click="menuOpen = false">Обсудить проект ↗</a>
		</nav>
	</header>
</template>

<style scoped lang="scss">
.valley__header {
	position: fixed;
	left: 0;
	width: 100%;
	top: 0;
	z-index: $z-header;
	flex-shrink: 0;
	height: 94px;
	display: flex;
	align-items: center;
	gap: 48px;
	padding: 0 5%;
	background: #111211;
	@media (max-width: 760px) {
		height: 78px;
		padding: 0 6%;
		gap: 20px;
	}
}
.valley__brand {
	color: #f7f7f0;
	text-decoration: none;
	font-size: 33px;
	font-weight: 750;
	letter-spacing: -1.7px;
	line-height: 0.85;
	display: flex;
	flex-direction: column;
}
.valley__brand-studio {
	font-size: 11px;
	font-weight: 500;
	letter-spacing: 2.8px;
	margin-top: 8px;
}
.valley__navigation {
	display: flex;
	gap: 36px;
	margin-left: auto;
	@media (max-width: 900px) {
		display: none;
	}
}
.valley__nav-link {
	color: #e3e4dd;
	text-decoration: none;
	font-size: 14px;
	&:hover {
		color: var(--valley-yellow);
	}
}
.valley__header-contact {
	color: #f7f7f0;
	text-decoration: none;
	font-size: 14px;
	display: flex;
	gap: 24px;
	align-items: center;
	&:hover {
		color: var(--valley-yellow);
	}
	@media (max-width: 900px) {
		margin-left: auto;
	}
	@media (max-width: 760px) {
		font-size: 12px;
		gap: 8px;
	}
	@media (max-width: 390px) {
		display: none;
	}
}
.valley__menu-button {
	width: 32px;
	height: 40px;
	display: flex;
	flex-direction: column;
	gap: 7px;
	justify-content: center;
	background: none;
	border: 0;
	cursor: pointer;
	padding: 0;
	@media (max-width: 390px) {
		margin-left: auto;
	}
}
.valley__menu-line {
	width: 28px;
	height: 1px;
	background: #f7f7f0;
	transition: transform 0.2s;
}
.valley__menu-button--open {
	.valley__menu-line {
		&:first-child {
			transform: translateY(4px) rotate(45deg);
		}
		&:last-child {
			transform: translateY(-4px) rotate(-45deg);
		}
	}
}
.valley__mobile-menu {
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	background: #111211;
	padding: 20px 6% 40px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	border-top: 1px solid #373837;
}
.valley__mobile-link {
	font-size: 28px;
	color: #f7f7f0;
	text-decoration: none;
	&:hover {
		color: var(--valley-yellow);
	}
}
</style>
