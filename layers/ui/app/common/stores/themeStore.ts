import { defineStore } from 'pinia'
import { usePreferredDark } from '@vueuse/core'
import { useCookie, useHead } from '#imports'
import { Theme } from '#layers/ui/app/config/theme.ts'

export const useThemeStore = defineStore('ui-theme', () => {
	const theme = useCookie<Theme | 'system'>('ui-theme', {
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

	const setTheme = (value: Theme | 'system') => {
		theme.value = value
	}

	return {
		theme,
		setTheme,
	}
})
