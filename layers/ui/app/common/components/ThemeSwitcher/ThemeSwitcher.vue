<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '#layers/ui/app/common/stores/themeStore'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'
import { Theme } from '#layers/ui/app/config/theme.ts'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
const { setTheme } = themeStore

const themeOptions = [
	{ value: Theme.light, icon: iconNames.themeLight, label: 'Светлая тема' },
	{ value: Theme.dark, icon: iconNames.themeDark, label: 'Тёмная тема' },
	{ value: 'system' as const, icon: iconNames.themeSystem, label: 'Системная тема' },
]
</script>

<template>
	<div
		class="theme-switcher"
		role="group"
		aria-label="Выбор темы"
	>
		<button
			v-for="option in themeOptions"
			:key="option.value"
			class="theme-switcher__button"
			:class="{ 'theme-switcher__button--active': theme === option.value }"
			type="button"
			:aria-label="option.label"
			:title="option.label"
			:aria-pressed="theme === option.value"
			@click="setTheme(option.value)"
		>
			<Icon :name="option.icon" />
		</button>
	</div>
</template>

<style scoped lang="scss">
.theme-switcher {
	display: inline-flex;
	padding: 3px;
	border: 1px solid var(--border-muted);
	border-radius: 8px;
	background-color: var(--surface);
}

.theme-switcher__button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	border-radius: 6px;
	color: var(--text);
	background-color: transparent;
	transition: color 0.3s ease, background-color 0.3s ease;

	&:hover {
		color: var(--text);
		background-color: var(--surface-muted);
	}

	&:focus-visible {
		outline: 2px solid var(--focus);
		outline-offset: -2px;
	}
}

.theme-switcher__button--active {
	color: var(--on-primary);
	background-color: var(--primary);

	&:hover {
		color: var(--on-primary);
		background-color: var(--primary-hover);
	}
}
</style>
