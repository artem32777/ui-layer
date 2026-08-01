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

/**
 * Сохраняем нативный `focus` до первого рендера истории.
 *
 * В Storybook 10.5.5 встроенный instrumentation loader временно заменяет
 * `HTMLElement.prototype.focus` getter-обёрткой. При переходе Canvas → Docs
 * React Aria (её используют Docs blocks) читает этот getter прямо с prototype.
 * В Chrome обращение к `ownerDocument` с `this === HTMLElement.prototype`
 * заканчивается `TypeError: Illegal invocation`.
 *
 * Переменная объявлена на уровне модуля намеренно: когда loaders начнут
 * выполняться, Storybook уже успеет подменить `focus`, и сохранять метод там
 * будет поздно.
 */
const nativeHTMLElementFocus = globalThis.HTMLElement?.prototype.focus

/**
 * Возвращает обычный method descriptor только тогда, когда Storybook установил
 * проблемный getter. Чужой обычный wrapper (например, от React Aria) функция
 * не трогает.
 */
function restoreNativeHTMLElementFocus() {
	const focusDescriptor = Object.getOwnPropertyDescriptor(
		HTMLElement.prototype,
		'focus',
	)

	if (!nativeHTMLElementFocus || !focusDescriptor?.get) {
		return
	}

	Object.defineProperty(HTMLElement.prototype, 'focus', {
		configurable: true,
		enumerable: focusDescriptor.enumerable,
		value: nativeHTMLElementFocus,
		writable: true,
	})
}

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
	/**
	 * Core loaders выполняются раньше loaders из preview.ts. Поэтому этот loader
	 * срабатывает сразу после Storybook instrumentation и до рендера истории.
	 * Он устраняет конфликт с Docs, не вмешиваясь в Vue-компоненты и их focus.
	 *
	 * Возвращаем пустой объект, потому что Storybook ожидает от loader объект,
	 * который затем попадёт в `context.loaded`.
	 */
	loaders: [
		() => {
			restoreNativeHTMLElementFocus()
			return {}
		},
	],
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
