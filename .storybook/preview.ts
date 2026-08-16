import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import { SelectRoot } from 'reka-ui'
import { defineComponent } from 'vue'
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
	// decorators: [() => ({ template: '<div style="padding: 50px"><story /></div>' })],
	parameters: {
		viewport: { options: getBreakpointViewports(breakpointsSource) },
		controls: {
			// Автоматически подбирает подходящий control по имени аргумента.
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		options: {
			storySort: { order: ['Docs', 'Design System', 'UI', 'FORM', 'Example'] },
		},
	},
}

export default preview
