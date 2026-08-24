import { defineStore } from 'pinia'
import { usePreferredDark } from '@vueuse/core'
import { useCookie, useHead } from '#imports'
import { Theme, type ThemeNames } from '#layers/ui/app/config/theme.ts'

type Themes = ThemeNames | 'system'

export const useThemeStore = defineStore('ui-theme', () => {
	const theme = useCookie<Themes>('ui-theme', {
		default: () => Theme.light,
		path: '/',
		sameSite: 'lax',
	})

	const isSystemDark = usePreferredDark()

	useHead({
		htmlAttrs: {
			class: () => theme.value === 'system'
				? isSystemDark.value ? Theme.dark : Theme.light
				: theme.value,
		},
	})

	const setTheme = (value: Themes) => {
		theme.value = value
	}

	return {
		theme,
		setTheme,
	}
})
