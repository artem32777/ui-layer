import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import { defineNuxtPlugin } from '#imports'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

export default defineNuxtPlugin(() => {
	ScrollTrigger.defaults({
		start: (self) => {
			const valley = self.trigger?.closest('.valley')
			return valley ? `top ${getComputedStyle(valley).getPropertyValue('--valley-header-height').trim()}` : self.vars.pin ? 'top top' : 'top bottom'
		},
	})

	return {
		provide: {
			gsap,
			ScrollTrigger,
			ScrollSmoother,
		},
	}
})
