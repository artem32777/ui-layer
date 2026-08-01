import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'

// Минимальная часть Nuxt CookieOptions, которая нужна themeStore.
interface CookieOptions<T> {
	default?: () => T
}

// Минимальная форма useHead, используемая темизацией UI-слоя.
interface HeadInput {
	htmlAttrs?: {
		class?: string | (() => string | undefined)
	}
}

/**
 * Browser-only замена Nuxt `useCookie`.
 *
 * Храним значение в localStorage, чтобы ThemeSwitcher в Storybook вёл себя
 * как обычный интерактивный компонент. Это не универсальная реализация cookie:
 * адаптер намеренно покрывает только сценарий существующего themeStore.
 */
export function useCookie<T>(name: string, options: CookieOptions<T> = {}): Ref<T> {
	const storedValue = globalThis.localStorage?.getItem(name)
	const value = ref<T>(
		storedValue === null || storedValue === undefined
			? options.default?.() as T
			: JSON.parse(storedValue) as T,
	) as Ref<T>

	watchEffect(() => {
		globalThis.localStorage?.setItem(name, JSON.stringify(value.value))
	})

	return value
}

/**
 * Browser-only замена Nuxt `useHead`.
 *
 * ThemeSwitcher меняет класс `dark` на `<html>`; watchEffect сохраняет
 * реактивное поведение исходного Nuxt composable.
 */
export function useHead(input: HeadInput) {
	watchEffect(() => {
		const classValue = typeof input.htmlAttrs?.class === 'function'
			? input.htmlAttrs.class()
			: input.htmlAttrs?.class

		document.documentElement.classList.toggle('dark', classValue?.split(/\s+/).includes('dark') ?? false)
	})
}
