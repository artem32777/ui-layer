<script setup lang="ts">
import { useNuxtApp } from '#imports'
import { useTemplateRef } from 'vue'
import { useAnimations } from '#layers/ui/app/modules/animation/composables/useAnimations'
import { navigateOnPage } from '#layers/ui/app/modules/animation/utils/pageNavigation'

defineProps<{
	copy: string[]
	copySecond: string[]
	cta: string
	scroll: string
}>()

const bottom = useTemplateRef<HTMLDivElement>('bottom')
const { $gsap } = useNuxtApp()

useAnimations(() => {
	$gsap.from('.valley__hero-copy, .valley__hero-cta', {
		y: 8,
		autoAlpha: 0,
		duration: 1.1,
		delay: 1.4,
		stagger: 0.12,
		ease: 'sine.out',
	})
}, bottom)
</script>

<template>
	<div
		ref="bottom"
		class="valley__hero-bottom"
	>
		<p class="valley__hero-copy">
			{{ copy[0] }}
			<br>
			{{ copy[1] }}
		</p>
		<p class="valley__hero-copy valley__hero-copy--second">
			{{ copySecond[0] }}
			<br>
			{{ copySecond[1] }}
		</p>
		<a
			class="valley__hero-cta"
			href="#contact"
			@click="navigateOnPage('#contact', $event)"
		>
			{{ cta }}
			<span class="valley__circle-arrow">↗</span>
		</a>
	</div>
	<a
		class="valley__scroll"
		href="#projects"
		@click="navigateOnPage('#projects', $event)"
	>
		<span>{{ scroll }}</span>
		<span>↓</span>
	</a>
</template>

<style scoped lang="scss">
.valley__hero-bottom {
	padding-top: 26px;
	display: grid;
	grid-template-columns: 1fr 1fr 1.1fr;
	align-items: center;
	gap: 30px;
	@media (max-width: $sm) {
		grid-template-columns: 1fr;
		gap: 26px;
	}
}
.valley__hero-copy {
	font-size: 20px;
	line-height: 1.5;
  font-weight: 600;
}
.valley__hero-copy--second {
	@media (max-width: $sm) {
		display: none;
	}
}
.valley__hero-cta {
	text-decoration: none;
	color: #f7f7f0;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 25px;
	font-size: 20px;
  font-weight: 600;
	@media (max-width: $sm) {
		justify-content: flex-start;
	}
}
.valley__circle-arrow {
	width: 69px;
	height: 69px;
	display: grid;
	place-items: center;
	background: var(--brand);
	color: #111211;
	border-radius: 50%;
	font-size: 36px;
}
.valley__scroll {
	display: flex;
	justify-content: space-between;
	font-size: 11px;
	color: #ddd;
	text-decoration: none;
	padding-top: 40px;
	@media (max-width: $sm) {
		padding-top: 40px;
		margin-top: auto;
	}
}
</style>
