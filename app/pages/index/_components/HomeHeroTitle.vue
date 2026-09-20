<script setup lang="ts">
import { useNuxtApp } from '#imports'
import { useTemplateRef } from 'vue'
import { useAnimations } from '#layers/ui/app/modules/animation/composables/useAnimations'

defineProps<{
	title: string[]
	accent: string
}>()

const heading = useTemplateRef<HTMLHeadingElement>('heading')
const { $gsap } = useNuxtApp()

useAnimations(() => {
	$gsap.from('.valley__hero-title-line', {
		x: (index: number) => index === 0 ? -18 : 18,
		autoAlpha: 0,
		duration: 1.2,
		stagger: 0.12,
		ease: 'sine.out',
	})
}, heading)
</script>

<template>
	<h1
		ref="heading"
		class="valley__hero-title"
	>
		<span class="valley__hero-title-line">
			{{ title[0] }}
			<br>
			{{ title[1] }}
		</span>
		<span class="valley__hero-title-line valley__accent">{{ accent }}</span>
	</h1>
</template>

<style scoped lang="scss">
.valley__hero-title {
	font-size: clamp(66px, 7.15vw, 112px);
	line-height: 1.01;
	font-weight: 650;
	letter-spacing: -4.5px;
	margin: auto 0 48px;
	padding-top: 42px;
  user-select: none;
	max-width: 1130px;
	@media (max-width: $sm) {
		font-size: clamp(43px, 9.5vw, 69px);
		letter-spacing: -2px;
		margin: auto 0 44px;
		padding-top: 50px;
	}
}
.valley__hero-title-line {
	display: block;
}
.valley__accent {
	color: var(--brand);
}
</style>
