import type { Preview } from '@storybook/vue3-vite'
import type { ViewportMap } from 'storybook/viewport'
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import { SelectRoot } from 'reka-ui'
import { defineComponent } from 'vue'
import '../app/config/styles/index.scss'

declare const __STORYBOOK_BREAKPOINT_VIEWPORTS__: ViewportMap

/**
 * Упрощённый аналог Nuxt ClientOnly.
 *
 * Storybook и браузерные тесты всегда выполняются на клиенте, поэтому
 * достаточно сразу отрисовать default slot без SSR-заглушки.
 */
const ClientOnly = defineComponent({
	name: 'ClientOnly',
	setup(_, { slots }) {
		return () => slots.default?.()
	},
})

// `setup` вызывается для каждого Vue-приложения, которое создаёт Storybook.
// Так каждая история получает независимый Pinia store.
setup((app) => {
	app.use(createPinia())

	// Эти компоненты в Nuxt регистрируются модулями автоматически.
	// В чистом Storybook/Vue runtime их нужно зарегистрировать вручную.
	app.component('ClientOnly', ClientOnly)
	app.component('SelectRoot', SelectRoot)
})

const preview: Preview = {
	parameters: {
		viewport: {
			options: __STORYBOOK_BREAKPOINT_VIEWPORTS__,
		},
		// Автоматически подбирает подходящий control по имени аргумента.
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		// Стабильный порядок верхнеуровневых разделов в sidebar.
		options: {
			storySort: {
				order: ['Design System', 'UI', 'FORM', 'Example'],
			},
		},
	},
}

export default preview
