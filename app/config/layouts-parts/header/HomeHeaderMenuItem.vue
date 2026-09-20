<script setup lang="ts">
import { usePreferredReducedMotion } from '@vueuse/core'
import gsap from 'gsap'

defineProps<{
	href: string
	label: string
	index: number
	variant: 'primary' | 'secondary'
}>()

const reducedMotion = usePreferredReducedMotion()

function hoverTargets(item: EventTarget | null) {
	if (!(item instanceof HTMLElement)) return
	return {
		current: item.querySelectorAll('.valley-menu__label-line--current .valley-menu__shift'),
		hover: item.querySelectorAll('.valley-menu__shift--hover'),
		index: item.querySelectorAll('.valley-menu__index .valley-menu__shift'),
	}
}

function onItemEnter(event: MouseEvent) {
	if (reducedMotion.value === 'reduce') return
	const targets = hoverTargets(event.currentTarget)
	if (!targets) return
	gsap.to(targets.current, { yPercent: -110, duration: 0.55, stagger: 0.025, ease: 'power3.out', overwrite: true })
	gsap.fromTo(targets.hover, { yPercent: 110 }, { yPercent: 0, duration: 0.55, stagger: 0.025, ease: 'power3.out', overwrite: true })
	gsap.to(targets.index, { color: 'var(--brand)', duration: 0.35, ease: 'power2.out', overwrite: true })
}

function onItemLeave(event: MouseEvent) {
	if (reducedMotion.value === 'reduce') return
	const targets = hoverTargets(event.currentTarget)
	if (!targets) return
	gsap.to(targets.current, { yPercent: 0, duration: 0.5, stagger: { each: 0.02, from: 'end' }, ease: 'power3.out', overwrite: true })
	gsap.to(targets.hover, { yPercent: 110, duration: 0.5, stagger: { each: 0.02, from: 'end' }, ease: 'power3.out', overwrite: true })
	gsap.to(targets.index, { color: '', duration: 0.35, ease: 'power2.out', overwrite: true })
}
</script>

<template>
	<a
		class="valley-menu__item"
		:class="`valley-menu__item--${variant}`"
		:href="href"
		:aria-label="label"
		@mouseenter="onItemEnter"
		@mouseleave="onItemLeave"
	>
		<span
			class="valley-menu__index"
			aria-hidden="true"
		>
			<span class="valley-menu__shift valley-menu__reveal">{{ String(index).padStart(2, '0') }}</span>
		</span>
		<span
			class="valley-menu__label"
			aria-hidden="true"
		>
			<span class="valley-menu__label-line valley-menu__label-line--current">
				<span
					v-for="(character, characterIndex) in label"
					:key="characterIndex"
					class="valley-menu__shift valley-menu__reveal"
				>{{ character === ' ' ? '\u00A0' : character }}</span>
			</span>
			<span class="valley-menu__label-line valley-menu__label-line--hover">
				<span
					v-for="(character, characterIndex) in label"
					:key="characterIndex"
					class="valley-menu__shift valley-menu__shift--hover"
				>{{ character === ' ' ? '\u00A0' : character }}</span>
			</span>
		</span>
	</a>
</template>

<style scoped lang="scss">
.valley-menu__item {
	display: flex;
	align-items: baseline;
	gap: 18px;
	color: #f7f7f0;
	text-decoration: none;
	white-space: nowrap;
	text-transform: uppercase;
	@media (prefers-reduced-motion: reduce) {
		&:hover {
			color: var(--brand);
		}
	}
}
.valley-menu__item--primary {
	font-size: clamp(28px, 3.4vw, 44px);
	font-weight: 500;
	letter-spacing: 0.06em;
	line-height: 1.15;
}
.valley-menu__item--secondary {
	font-size: clamp(16px, 1.5vw, 22px);
	letter-spacing: 0.08em;
	line-height: 1.3;
}
.valley-menu__index,
.valley-menu__label {
	display: inline-flex;
	overflow: hidden;
}
.valley-menu__label-line {
	display: inline-flex;
	overflow: hidden;
}
.valley-menu__label {
	position: relative;
}
.valley-menu__label-line--hover {
	position: absolute;
	left: 0;
	top: 0;
	color: var(--brand);
}
.valley-menu__index {
	font-size: 0.42em;
	letter-spacing: 0.08em;
	opacity: 0.62;
	min-width: 1.6em;
}
.valley-menu__shift {
	display: inline-block;
}
</style>
