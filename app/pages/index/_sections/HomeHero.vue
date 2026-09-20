<script setup lang="ts">
import { useNuxtApp } from '#imports'
import { useTemplateRef } from 'vue'
import { useAnimations } from '#layers/ui/app/modules/animation/composables/useAnimations'
import AnimPerspectiveTilt from '#layers/ui/app/modules/animation/components/AnimPerspectiveTilt.vue'
import HomeHeroTitle from '../_components/HomeHeroTitle.vue'
import HomeHeroFooter from '../_components/HomeHeroFooter.vue'

const texts = {
	status: 'Независимая digital-студия',
	location: 'Дизайн · Разработка · Продвижение',
	title: ['Создаём шедевры,', 'которые работают'],
	titleAccent: 'на ваш бизнес',
	copy: ['Превращаем сложные задачи', 'в понятные цифровые решения.'],
	copySecond: ['От первого впечатления', 'до заявки вашего клиента.'],
	cta: 'Давайте знакомиться',
	scroll: 'Листайте вниз',
}

const { $gsap } = useNuxtApp()
const hero = useTemplateRef<HTMLElement>('hero')

useAnimations(() => {
	const heading = hero.value?.querySelector<HTMLElement>('.valley__hero-title')
	if (!heading) return
	const scrollDistance = () => Math.max(0, heading.offsetTop - 30)

	$gsap.from('.valley__eyebrow', {
		y: 12,
		autoAlpha: 0,
		duration: 0.6,
		ease: 'power2.out',
	})

	$gsap.to(heading, {
		y: () => -scrollDistance(),
		ease: 'none',
		scrollTrigger: {
			trigger: hero.value,
			end: () => `+=${Math.max(1, scrollDistance() * 1.5)}`,
			pin: hero.value,
			scrub: true,
			anticipatePin: 1,
			invalidateOnRefresh: true,
		},
	})
}, hero)
</script>

<template>
	<section ref="hero" class="valley__hero">
		<AnimPerspectiveTilt
			class="valley__hero-media"
			plane-inset="-4%"
			inner-inset="0"
		>
			<video
				class="valley__hero-video"
				src="/videos/home-hero.mp4"
				autoplay
				muted
				loop
				playsinline
				aria-hidden="true"
			/>
		</AnimPerspectiveTilt>
		<div class="valley__hero-content">
			<div class="valley__eyebrow">
				<span class="valley__status-dot" />
				{{ texts.status }}
				<span class="valley__hero-location">{{ texts.location }}</span>
			</div>
			<HomeHeroTitle
				:title="texts.title"
				:accent="texts.titleAccent"
			/>
			<div class="valley__hero-rule" data-line />
			<HomeHeroFooter
				:copy="texts.copy"
				:copy-second="texts.copySecond"
				:cta="texts.cta"
				:scroll="texts.scroll"
			/>
		</div>
	</section>
</template>

<style scoped lang="scss">
.valley__hero {
	overflow: visible;
	min-height: calc(100svh - var(--valley-header-height));
	position: relative;
	display: flex;
}
.valley__hero-media {
	width: 100%;
	height: calc(100svh - var(--valley-header-height));
}
.valley__hero-video {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.valley__hero-content {
	position: relative;
	z-index: 1;
	padding: 47px 5% 27px;
	min-height: calc(100svh - var(--valley-header-height));
	width: 100%;
	display: flex;
	flex-direction: column;
	@media (max-width: $sm) {
		padding: 35px 6% 25px;
	}
}
.valley__eyebrow {
	display: flex;
	gap: 10px;
	align-items: center;
	font-size: 12px;
	letter-spacing: 0.1px;
}
.valley__status-dot {
	width: 6px;
	height: 6px;
	background: var(--brand);
	border-radius: 50%;
	flex-shrink: 0;
}
.valley__hero-location {
	margin-left: auto;
	@media (max-width: $sm) {
		display: none;
	}
}
.valley__hero-rule {
	height: 1px;
	background: rgba(255, 255, 255, 0.45);
}
</style>
