<script setup lang="ts">
import { useHead, useNuxtApp } from '#imports'
import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue'
import type { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useEventListener } from '@vueuse/core'
import HomeHeader from './_components/HomeHeader.vue'
import HomeFooter from './_components/HomeFooter.vue'
import HomeHero from './_sections/HomeHero.vue'
import HomeProjects from './_sections/HomeProjects.vue'
import HomeStudio from './_sections/HomeStudio.vue'
import HomeServices from './_sections/HomeServices.vue'
import HomeProcess from './_sections/HomeProcess.vue'
import HomeFaq from './_sections/HomeFaq.vue'
import HomeContact from './_sections/HomeContact.vue'
import ValleyManifesto from './_sections/ValleyManifesto.vue'
import ValleyReasons from './_sections/ValleyReasons.vue'
import ValleyReviews from './_sections/ValleyReviews.vue'
import ValleyBlog from './_sections/ValleyBlog.vue'
import ValleyAcademy from './_sections/ValleyAcademy.vue'

useHead({ title: 'WebValley Studio — сайты, которые работают на бизнес' })

const page = useTemplateRef<HTMLDivElement>('page')
const wrapper = useTemplateRef<HTMLDivElement>('wrapper')
const content = useTemplateRef<HTMLDivElement>('content')
const { $gsap, $ScrollTrigger } = useNuxtApp()
let animations: ReturnType<typeof $gsap.matchMedia> | undefined
let smoother: ScrollSmoother | undefined
useEventListener(page, 'toggle', () => $ScrollTrigger.refresh(), {
	capture: true,
})

useEventListener(page, 'click', (event) => {
	if (!smoother || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
	const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
	if (!link) return
	const target = link.hash ? document.getElementById(link.hash.slice(1)) : 0
	if (target === null) return
	event.preventDefault()
	smoother.scrollTo(target, true, `top ${page.value?.querySelector('header')?.offsetHeight ?? 0}px`)
	window.history.replaceState(null, '', link.hash || window.location.pathname + window.location.search)
})

onMounted(async () => {
	const { ScrollSmoother } = await import('gsap/ScrollSmoother')
	if (!page.value) return
	$gsap.registerPlugin(ScrollSmoother)
	animations = $gsap.matchMedia()
	animations.add(
		'(prefers-reduced-motion: no-preference)',
		() => {
			smoother = ScrollSmoother.create({ wrapper: wrapper.value!, content: content.value!, smooth: 1.2, smoothTouch: 0.15 })
			$gsap.from('.valley__eyebrow, .valley__hero-title, .valley__hero-bottom, .valley__scroll', {
				y: 25,
				autoAlpha: 0,
				duration: 1.8,
				stagger: 0.2,
				ease: 'power2.out',
			})

			page.value?.querySelectorAll('section:not(.valley__hero)').forEach((section) => {
				const elements = section.querySelectorAll(
					'.valley__section-top, .valley__heading-row, .valley__heading, .valley__studio-heading, .valley__studio-text, .valley__project, .valley__stat, .valley__service, .valley__step, .valley__question, .valley__contact-grid, [data-reveal]',
				)
				elements.forEach((element, index) => {
					if (element.parentElement?.closest('.valley__heading-row, [data-reveal]')) return
					$gsap.from(element, {
						y: 30,
						autoAlpha: 0,
						duration: 1.4,
						delay: (index % 4) * 0.12,
						ease: 'power2.out',
						scrollTrigger: { trigger: element, start: 'top 88%', once: true },
					})
				})
			})

			$gsap.fromTo(
				'.valley__hero-video',
				{ yPercent: -5, scale: 1.15 },
				{
					yPercent: 5,
					ease: 'none',
					scrollTrigger: { trigger: '.valley__hero', start: 'top top', end: 'bottom top', scrub: true },
				},
			)
			$gsap.fromTo(
				'.valley-manifesto__mountain',
				{ yPercent: -8 },
				{
					yPercent: 8,
					ease: 'none',
					scrollTrigger: { trigger: '.valley-manifesto', start: 'top bottom', end: 'bottom top', scrub: true },
				},
			)
			$gsap.to('.valley-manifesto__content', {
				yPercent: -8,
				ease: 'none',
				scrollTrigger: { trigger: '.valley-manifesto', start: 'top bottom', end: 'bottom top', scrub: true },
			})
			$gsap
				.timeline({
					scrollTrigger: {
						trigger: '.valley-reasons',
						start: () => `top ${page.value?.querySelector('header')?.offsetHeight ?? 0}px`,
						end: '+=800',
						scrub: true,
						pin: '.valley-reasons__background',
						pinSpacing: false,
					},
				})
				.to('.valley-reasons__mountain', { scale: 1.01, duration: 200, ease: 'none' })
				.to('.valley-reasons__mountain', { scale: 1.05, opacity: 0, duration: 600, ease: 'none' })

			page.value?.querySelectorAll('[data-line]').forEach((element) => {
				$gsap.from(element, {
					scaleX: 0,
					transformOrigin: 'left center',
					duration: 1.8,
					ease: 'power2.out',
					scrollTrigger: { trigger: element, start: 'top 90%', once: true },
				})
			})

			$ScrollTrigger.refresh()
			return () => {
				smoother?.kill()
				smoother = undefined
			}
		},
		page.value ?? undefined,
	)
})

onBeforeUnmount(() => animations?.revert())
</script>

<template>
	<div ref="page" class="valley">
		<HomeHeader />
		<div ref="wrapper" class="valley__smooth-wrapper">
			<div ref="content" class="valley__smooth-content">
				<main class="valley__main">
					<HomeHero />
					<HomeStudio />
					<HomeProjects />
					<ValleyManifesto />
					<HomeServices />
					<ValleyReasons />
					<HomeProcess />
					<ValleyReviews />
					<ValleyBlog />
					<ValleyAcademy />
					<HomeFaq />
					<HomeContact />
				</main>
				<HomeFooter />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.valley {
	--valley-yellow: #f3ff00;
	--valley-header-height: 94px;
	width: 100%;
	min-height: 100svh;
	background: #111211;
	color: #f7f7f0;
	font-family: 'PtRoot', sans-serif;
	@media (max-width: 760px) {
		--valley-header-height: 78px;
	}
}
.valley__main {
	width: 100%;
	overflow: clip;
}
.valley__smooth-wrapper {
	width: 100%;
}
.valley__smooth-content {
	padding-top: var(--valley-header-height);
	background: #111211;
}
</style>
