import { computed } from 'vue'
import { defineStore } from 'pinia'
import { usePreferredDark } from '@vueuse/core'
import { useCookie, useHead } from '#imports'

export enum Theme {
	light = 'light',
	grey = 'grey',
	dark = 'dark',
	system = 'system',
}

export const useThemeStore = defineStore('ui-theme', () => {
	const theme = useCookie<Theme>('ui-theme', {
		default: () => Theme.light,
		path: '/',
		sameSite: 'lax',
	})
	const isSystemDark = usePreferredDark()

	const isDark = computed(() => theme.value === Theme.dark || (theme.value === Theme.system && isSystemDark.value))

	useHead({
		htmlAttrs: {
			class: () => theme.value === Theme.grey ? Theme.grey : isDark.value ? Theme.dark : undefined,
		},
	})

	const toggleTheme = () => {
		theme.value = isDark.value ? Theme.light : Theme.dark
	}
	const setTheme = (value: Theme) => {
		theme.value = value
	}

	return {
		theme,
		isDark,
		toggleTheme,
		setTheme,
	}
})
