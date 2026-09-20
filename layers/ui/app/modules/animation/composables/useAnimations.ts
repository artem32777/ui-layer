import { useNuxtApp } from '#imports'
import { onMounted, onBeforeUnmount, type Ref } from 'vue'
import type gsap from 'gsap'

export function useAnimations(callback: gsap.ContextFunc, scope?: Readonly<Ref<HTMLElement | null>>) {
	const { $gsap } = useNuxtApp()
	let animations: ReturnType<typeof $gsap.matchMedia> | undefined

	onMounted(() => {
		if (scope && !scope.value) return
		animations = $gsap.matchMedia()
		animations.add('(prefers-reduced-motion: no-preference)', callback, scope?.value ?? undefined)
	})

	onBeforeUnmount(() => {
		animations?.revert()
	})
}
