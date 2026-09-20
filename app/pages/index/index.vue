<script setup lang="ts">
import { useHead, useNuxtApp } from '#imports'
import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue'
import { useAnimations } from '#layers/ui/app/modules/animation/composables/useAnimations'
import { useEventListener } from '@vueuse/core'
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
const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp()
let smoother: ReturnType<typeof $ScrollSmoother.create> | undefined
useEventListener(page, 'toggle', () => $ScrollTrigger.refresh(), {
	capture: true,
})

onMounted(() => {
	// if (!wrapper.value || !content.value) return
	// // $ScrollTrigger.config({ ignoreMobileResize: true })
	// smoother = $ScrollSmoother.create({ wrapper: wrapper.value, content: content.value, smooth: 1, smoothTouch: 0.1 })
})

useAnimations(() => {
	$gsap
		.timeline({
			defaults: { ease: 'none', lazy: false, duration: 1 },
			scrollTrigger: {
				trigger: '.valley-manifesto',
				start: 'top top',
				end: () => `+=${window.innerHeight * 4.8}`,
				pin: true,
				scrub: true,
				anticipatePin: 1,
				invalidateOnRefresh: true,
			},
		})
		.fromTo(
			'.valley-manifesto__label, .valley-manifesto__title, .valley-manifesto__copy, .valley-manifesto__link',
			{ y: (_index: number, target: HTMLElement) => window.innerHeight - target.offsetTop - (target.parentElement?.offsetTop ?? 0) },
			{
				y: (_index: number, target: HTMLElement) => -target.offsetTop - (target.parentElement?.offsetTop ?? 0) - target.offsetHeight - 1,
				duration: (index: number) => 1.8 + Math.min(index, 2) * 0.4,
				stagger: (index: number) => [0, 0.2, 0.8, 1.1][index] ?? 0,
			},
			0.4,
		)
		.to('.valley-manifesto', { opacity: 0, duration: 0.6 }, 4.2)

	const revealElements = [
		...(page.value?.querySelectorAll(
			'.valley__section-top, .valley__heading-row, .valley__heading, .valley__studio-heading, .valley__studio-text, .valley__project, .valley__stat, .valley__service, .valley__step, .valley__question, .valley__contact-grid, [data-reveal]',
		) ?? []),
	].filter((element) => !element.parentElement?.closest('.valley__heading-row, [data-reveal]'))
	revealElements.forEach((element) => {
		$gsap.from(element, {
			y: 30,
			autoAlpha: 0,
			duration: 1.1,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: element,
				start: 'top 88%',
				toggleActions: 'play reverse play reverse',
			},
		})
	})

	$gsap
		.timeline({
			defaults: { ease: 'none', lazy: false },
			scrollTrigger: {
				trigger: '.valley-reasons',
				end: '+=800',
				scrub: true,
				pin: '.valley-reasons__background',
				pinSpacing: false,
				anticipatePin: 1,
			},
		})
		.to('.valley-reasons__mountain', { scale: 1.01, duration: 200 })
		.to('.valley-reasons__mountain', { scale: 1.05, duration: 600 })
		.to('.valley-reasons__background', { opacity: 0, duration: 600 }, '<')

	page.value?.querySelectorAll('[data-line]').forEach((element) => {
		$gsap.from(element, {
			scaleX: 0,
			transformOrigin: 'left center',
			duration: 1.8,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: element,
				start: 'top 90%',
				toggleActions: 'play reverse play reverse',
			},
		})
	})

	$ScrollTrigger.refresh()
}, page)

onBeforeUnmount(() => {
	smoother?.kill()
	smoother = undefined
})
</script>

<template>
	<div
		ref="page"
		class="valley"
	>
		<div
			ref="wrapper"
			class="valley__smooth-wrapper"
		>
			<div
				ref="content"
				class="valley__smooth-content"
			>
				<main class="valley__main">
					<HomeHero />
					<div class="valley__rest">
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
					</div>
				</main>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.valley {
	width: 100%;
	min-height: 100svh;
	background: #111211;
	color: #f7f7f0;
}
.valley__main {
	width: 100%;
}
.valley__smooth-wrapper {
	width: 100%;
	z-index: $z-main;
}
.valley__smooth-content {
	padding-top: var(--valley-header-height);
	background: #111211;
}
.valley__rest {
	position: relative;
	z-index: $z-main;
	background: #111211;
}
</style>
