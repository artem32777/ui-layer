import gsap from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

let overlay: HTMLDivElement | undefined
let animation: gsap.core.Timeline | undefined

export function navigateOnPage(href: string, event?: Event) {
	event?.preventDefault()
	if (!overlay) {
		overlay = document.createElement('div')
		overlay.className = 'page-navigation-overlay'
		overlay.innerHTML = '<span class="page-navigation-overlay__bar"></span>'.repeat(5)
		document.body.append(overlay)
	}

	const bars = overlay.children
	const target = document.getElementById(href.replace('#', ''))
	const offset = document.querySelector('header')?.offsetHeight ?? 0

	animation?.kill()
	gsap.set(overlay, { opacity: 1 })
	gsap.set(bars, { opacity: 0, yPercent: (index: number) => (index % 2 ? 100 : -100) })
	animation = gsap
		.timeline()
		.to(bars, { opacity: 1, yPercent: 0, duration: 0.45, stagger: 0.05, ease: 'power1.in' })
		.add(() => {
			const smoother = ScrollSmoother.get()
			if (smoother) smoother.scrollTo(target ?? 0, false, `top ${offset}px`)
			else window.scrollTo({
				top: target ? target.getBoundingClientRect().top + window.scrollY - offset : 0,
				behavior: 'instant',
			})
		})
		.to(bars, { opacity: 0, yPercent: (index: number) => (index % 2 ? -100 : 100), duration: 0.3, stagger: 0.05, ease: 'power1.inOut' })
		.set(overlay, { opacity: 0 })
}
