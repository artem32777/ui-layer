<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Theme, useThemeStore } from '#layers/ui/app/common/stores/themeStore'
import { iconNames } from '#layers/ui/app/modules/svg-icon'
import SvgIcon from '#layers/ui/app/modules/svg-icon/components/SvgIcon.vue'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
const { setTheme } = themeStore
</script>

<template>
	<div
		class="theme-switcher"
		role="group"
		aria-label="Выбор темы"
	>
		<button
			class="theme-switcher__button"
			:class="{ 'theme-switcher__button--active': theme === Theme.light }"
			type="button"
			aria-label="Светлая тема"
			title="Светлая тема"
			:aria-pressed="theme === Theme.light"
			@click="setTheme(Theme.light)"
		>
			<SvgIcon :name="iconNames.themeLight" />
		</button>

		<button
			class="theme-switcher__button"
			:class="{ 'theme-switcher__button--active': theme === Theme.dark }"
			type="button"
			aria-label="Тёмная тема"
			title="Тёмная тема"
			:aria-pressed="theme === Theme.dark"
			@click="setTheme(Theme.dark)"
		>
			<SvgIcon :name="iconNames.themeDark" />
		</button>

		<button
			class="theme-switcher__button"
			:class="{ 'theme-switcher__button--active': theme === Theme.system }"
			type="button"
			aria-label="Системная тема"
			title="Системная тема"
			:aria-pressed="theme === Theme.system"
			@click="setTheme(Theme.system)"
		>
			<SvgIcon :name="iconNames.themeSystem" />
		</button>
	</div>
</template>

<style scoped lang="scss">
.theme-switcher {
	display: inline-flex;
	padding: 3px;
	border: 1px solid var(--grey, #e2e2e2);
	border-radius: 8px;
	background-color: var(--background, #ffffff);
}

.theme-switcher__button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	padding: 0;
	border: 0;
	border-radius: 6px;
	color: var(--additional-2, #6b5b72);
	background-color: transparent;
	transition: color 0.3s ease, background-color 0.3s ease;
	cursor: pointer;

	&:hover {
		color: var(--text, #000000);
		background-color: var(--grey, #e2e2e2);
	}

	&:focus-visible {
		outline: 2px solid var(--brand, #4149f2);
		outline-offset: -2px;
	}
}

.theme-switcher__button--active {
	color: var(--white, #ffffff);
	background-color: var(--brand, #4149f2);

	&:hover {
		color: var(--white, #ffffff);
		background-color: var(--brand-dark, #292fba);
	}
}
</style>
