import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { defineNuxtPlugin } from '#imports'

gsap.registerPlugin(ScrollTrigger)

export default defineNuxtPlugin(() => {
	return {
		provide: {
			gsap,
			ScrollTrigger,
		},
	}
})
