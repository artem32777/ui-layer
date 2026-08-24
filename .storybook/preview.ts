import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import { SelectRoot } from 'reka-ui'
import { defineComponent, watch } from 'vue'
import { Theme, useThemeStore } from '../layers/ui/app/common/stores/themeStore'
import breakpointsSource from '../layers/ui/app/config/styles/shared/breakpoints.scss?raw'
import '../layers/ui/app/config/styles/index.scss'
import { getBreakpointViewports } from './breakpoints'

const ClientOnly = defineComponent({
	name: 'ClientOnly',
	setup(_, { slots }) {
		return () => slots.default?.()
	},
})

setup((app) => {
	app.use(createPinia())
	// Эти компоненты в Nuxt регистрируются модулями автоматически.
	// В чистом Storybook/Vue runtime их нужно зарегистрировать вручную.
	app.component('ClientOnly', ClientOnly)
	app.component('SelectRoot', SelectRoot)
})

const preview: Preview = {
	globalTypes: {
		theme: {
			description: 'Тема компонентов',
			toolbar: {
				title: 'Тема',
				icon: 'paintbrush',
				items: [
					{ value: Theme.light, title: 'Светлая' },
					{ value: Theme.dark, title: 'Тёмная' },
					{ value: Theme.grey, title: 'Серая' },
					{ value: Theme.system, title: 'Системная' },
				],
				dynamicTitle: true,
			},
		},
	},
	initialGlobals: {
		theme: Theme.light,
	},
	decorators: [
		(story, { globals }) => ({
			setup() {
				const themeStore = useThemeStore()

				watch(
					() => globals.theme,
					(theme) => {
						if (theme !== Theme.light && theme !== Theme.grey && theme !== Theme.dark && theme !== Theme.system) {
							return
						}

						themeStore.setTheme(theme)
						document.documentElement.classList.toggle('grey', theme === Theme.grey)
						document.documentElement.classList.toggle('dark', theme !== Theme.grey && themeStore.isDark)
					},
					{ immediate: true, flush: 'post' },
				)
			},
			template: '<story />',
		}),
	],
	parameters: {
		docs: {
			// theme: themes.dark,
		},
		viewport: { options: getBreakpointViewports(breakpointsSource) },
		controls: {
			// Автоматически подбирает подходящий control по имени аргумента.
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		options: {
			storySort: {
				order: [
					'Локальная разработка',
					['Введение', 'Установка', 'Использование', 'Файлы стилей', 'Шрифты', 'Миксины'],
					'Система дизайна',
					['Цвета', 'Типографика', 'Иконки', 'Файлы стилей', 'Шрифты', 'Миксины'],
					'UI',
					'FORM',
					'Example',
				],
			},
		},
	},
}

export default preview
