<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Theme, useThemeStore } from '#layers/ui/app/common/stores/themeStore'
import { iconNames } from '#layers/ui/app/modules/svg-icon'
import Icon from '#layers/ui/app/modules/svg-icon/components/Icon.vue'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
const { setTheme } = themeStore

const themeOptions = [
	{ value: Theme.light, icon: iconNames.themeLight, label: 'Светлая тема' },
	{ value: Theme.dark, icon: iconNames.themeDark, label: 'Тёмная тема' },
	{ value: Theme.system, icon: iconNames.themeSystem, label: 'Системная тема' },
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
	border-radius: 6px;
	color: var(--additional-2, #6b5b72);
	background-color: transparent;
	transition: color 0.3s ease, background-color 0.3s ease;

	&:hover {
		color: var(--text, #000000);
		background-color: var(--grey, #e2e2e2);
	}

	&:focus-visible {
		outline: 2px solid var(--brand, #4149f2);
		outline-offset: -2px;
	}

  &--active {
    color: var(--white, #ffffff);
    background-color: var(--brand, #4149f2);

    &:hover {
      color: var(--white, #ffffff);
      background-color: var(--brand-dark, #292fba);
    }
  }
}
</style>
