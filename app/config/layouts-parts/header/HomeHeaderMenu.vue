<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue'
import { onKeyStroke, usePreferredReducedMotion } from '@vueuse/core'
import gsap from 'gsap'
import { navigateOnPage } from '#layers/ui/app/modules/animation/utils/pageNavigation'
import HomeHeaderMenuItem from './HomeHeaderMenuItem.vue'

const props = defineProps<{
	links: { href: string, label: string }[]
}>()

const menuOpen = defineModel<boolean>('open', { default: false })
const overlay = useTemplateRef<HTMLElement>('overlay')
const wipe = useTemplateRef<HTMLElement>('wipe')
const panel = useTemplateRef<HTMLElement>('panel')
const media = useTemplateRef<HTMLElement>('media')
const divider = useTemplateRef<HTMLElement>('divider')
const reducedMotion = usePreferredReducedMotion()
const primaryCount = computed(() => (props.links.length > 6 ? 6 : Math.ceil(props.links.length / 2)))
const primaryLinks = computed(() => props.links.slice(0, primaryCount.value))
const secondaryLinks = computed(() => props.links.slice(primaryCount.value))

let animation: gsap.core.Timeline | undefined
let pendingHref: string | undefined

function contentTargets() {
	return {
		items: overlay.value?.querySelectorAll('.valley-menu__reveal') ?? [],
		hoverChars: overlay.value?.querySelectorAll('.valley-menu__shift--hover') ?? [],
		image: media.value?.querySelector('.valley-menu__image') ?? null,
	}
}

function setScrollLocked(locked: boolean) {
	if (!import.meta.client) return
	const root = document.documentElement
	if (locked) {
		root.style.setProperty('--scrollbar-width', `${Math.max(0, window.innerWidth - root.clientWidth)}px`)
		root.style.overflow = 'hidden'
		root.classList.add('is-scroll-locked')
		return
	}
	root.style.removeProperty('overflow')
	root.classList.remove('is-scroll-locked')
	root.style.removeProperty('--scrollbar-width')
}

function isPageLink(href: string) {
	return href.startsWith('#')
}

function playOpen() {
	animation?.kill()
	const { items, hoverChars, image } = contentTargets()
	if (reducedMotion.value === 'reduce') {
		animation = gsap
			.timeline()
			.set(overlay.value, { autoAlpha: 1, pointerEvents: 'auto' })
			.set([wipe.value, panel.value], { yPercent: 0 })
			.set(items, { yPercent: 0 })
			.set(hoverChars, { yPercent: 110 })
			.set(image, { scale: 1, yPercent: 0 })
			.set(divider.value, { scaleY: 1 })
		return
	}
	gsap.set(items, { yPercent: 110 })
	gsap.set(hoverChars, { yPercent: 110 })
	gsap.set(image, { scale: 1.2, yPercent: 10 })
	gsap.set(divider.value, { scaleY: 0 })
	animation = gsap
		.timeline({ defaults: { ease: 'power4.inOut' } })
		.set(overlay.value, { autoAlpha: 1, pointerEvents: 'auto' })
		.fromTo(wipe.value, { yPercent: -100 }, { yPercent: 0, duration: 0.48, ease: 'power4.in' })
		.fromTo(panel.value, { yPercent: -100 }, { yPercent: 0, duration: 0.72 }, 0.16)
		.to(image, { scale: 1, yPercent: 0, duration: 1.2, ease: 'power2.out' }, 0.4)
		.to(divider.value, { scaleY: 1, duration: 0.7, ease: 'power3.out' }, 0.52)
		.to(items, { yPercent: 0, duration: 0.8, stagger: { amount: 0.55 }, ease: 'power3.out' }, 0.44)
}

function playClose(onDone?: () => void) {
	animation?.kill()
	const { items, hoverChars, image } = contentTargets()
	gsap.set(wipe.value, { yPercent: 0 })
	if (reducedMotion.value === 'reduce') {
		animation = gsap
			.timeline({ onComplete: onDone })
			.set(overlay.value, { autoAlpha: 0, pointerEvents: 'none' })
			.set([wipe.value, panel.value], { yPercent: -100 })
		return
	}
	animation = gsap
		.timeline({ defaults: { ease: 'power4.inOut' }, onComplete: onDone })
		.to(items, { yPercent: 110, duration: 0.65, stagger: { amount: 0.4, from: 'end' }, ease: 'power3.inOut' })
		.to(hoverChars, { yPercent: 110, duration: 0.4, ease: 'power3.inOut' }, 0)
		.to(image, { scale: 1.15, yPercent: 10, duration: 0.8, ease: 'power2.inOut' }, 0)
		.to(divider.value, { scaleY: 0, duration: 0.5, ease: 'power3.inOut' }, 0.1)
		.to(panel.value, { yPercent: -100, duration: 0.72 }, 0.28)
		.to(wipe.value, { yPercent: -100, duration: 0.48, ease: 'power4.in' }, 0.58)
		.set(overlay.value, { autoAlpha: 0, pointerEvents: 'none' })
}

function finishNavigation() {
	if (!pendingHref) return
	const href = pendingHref
	pendingHref = undefined
	if (isPageLink(href)) navigateOnPage(href)
	else window.location.assign(href)
}

function onItemClick(event: MouseEvent, href: string) {
	event.preventDefault()
	if (!menuOpen.value) {
		if (isPageLink(href)) navigateOnPage(href, event)
		else window.location.assign(href)
		return
	}
	pendingHref = href
	menuOpen.value = false
}

watch(menuOpen, (open) => {
	if (open) {
		pendingHref = undefined
		setScrollLocked(true)
		playOpen()
		return
	}
	playClose(() => {
		setScrollLocked(false)
		finishNavigation()
	})
})

onKeyStroke('Escape', () => {
	menuOpen.value = false
})

onMounted(() => {
	gsap.set(overlay.value, { autoAlpha: 0, pointerEvents: 'none' })
	gsap.set([wipe.value, panel.value], { yPercent: -100 })
})

onBeforeUnmount(() => {
	animation?.kill()
	setScrollLocked(false)
})
</script>

<template>
	<div class="valley-menu">
		<button
			class="valley-menu__button"
			:class="{ 'valley-menu__button--open': menuOpen }"
			type="button"
			:aria-expanded="menuOpen"
			aria-controls="valley-menu"
			:aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'"
			@click="menuOpen = !menuOpen"
		>
			<span class="valley-menu__line" />
			<span class="valley-menu__line" />
		</button>
		<div
			id="valley-menu"
			ref="overlay"
			class="valley-menu__overlay"
			:aria-hidden="!menuOpen"
		>
			<div
				ref="wipe"
				class="valley-menu__wipe"
			/>
			<nav
				ref="panel"
				class="valley-menu__panel"
				aria-label="Меню"
			>
				<div
					ref="media"
					class="valley-menu__media"
				>
					<img
						class="valley-menu__image"
						src="https://static.tildacdn.com/tild6132-3633-4364-b663-393832323464/nathan-de-fortunato-.png"
						alt=""
					>
				</div>
				<div class="valley-menu__content">
					<div class="valley-menu__columns">
						<ul class="valley-menu__column valley-menu__column--primary">
							<li
								v-for="(link, index) in primaryLinks"
								:key="link.href + link.label"
								class="valley-menu__entry"
							>
								<HomeHeaderMenuItem
									:href="link.href"
									:label="link.label"
									:index="index + 1"
									variant="primary"
									@click="onItemClick($event, link.href)"
								/>
							</li>
						</ul>
						<div
							ref="divider"
							class="valley-menu__divider"
						/>
						<ul class="valley-menu__column valley-menu__column--secondary">
							<li
								v-for="(link, index) in secondaryLinks"
								:key="link.href + link.label"
								class="valley-menu__entry"
							>
								<HomeHeaderMenuItem
									:href="link.href"
									:label="link.label"
									:index="primaryLinks.length + index + 1"
									variant="secondary"
									@click="onItemClick($event, link.href)"
								/>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	</div>
</template>

<style scoped lang="scss">
.valley-menu__button {
	position: relative;
	z-index: 2;
	width: 32px;
	height: 40px;
	display: flex;
	flex-direction: column;
	gap: 7px;
	justify-content: center;
	background: none;
	border: 0;
	cursor: pointer;
	padding: 0;
	@media (max-width: $xxs) {
		margin-left: auto;
	}
}
.valley-menu__line {
	width: 28px;
	height: 1px;
	background: #f7f7f0;
	transition: transform 0.2s;
}
.valley-menu__button--open {
	.valley-menu__line {
		&:first-child {
			transform: translateY(4px) rotate(45deg);
		}
		&:last-child {
			transform: translateY(-4px) rotate(-45deg);
		}
	}
}
.valley-menu__overlay {
	position: fixed;
	inset: 0;
	z-index: 1;
	overflow: hidden;
	opacity: 0;
	visibility: hidden;
	pointer-events: none;
}
.valley-menu__wipe {
	position: absolute;
	inset: 0;
	z-index: 1;
	background: var(--brand);
	pointer-events: none;
}
.valley-menu__panel {
	position: absolute;
	inset: 0;
	z-index: 2;
	overflow: hidden;
	background: #070707;
}
.valley-menu__media {
	position: absolute;
	top: 0;
	right: 0;
	width: 52%;
	height: 100%;
	overflow: hidden;
	pointer-events: none;
	&::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, #070707 0%, rgba(7, 7, 7, 0.35) 42%, rgba(48, 12, 64, 0.28) 100%), linear-gradient(180deg, rgba(7, 7, 7, 0.2), rgba(7, 7, 7, 0.55));
	}
	@media (max-width: $md) {
		width: 100%;
		opacity: 0.28;
	}
}
.valley-menu__image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
}
.valley-menu__content {
	position: relative;
	z-index: 1;
	display: flex;
	align-items: center;
	height: 100%;
	overflow: auto;
	padding: calc(var(--valley-header-height, 94px) + 24px) 8% 64px 10%;
	@media (max-width: $sm) {
		padding: calc(var(--valley-header-height, 78px) + 16px) 6% 40px;
		align-items: flex-start;
	}
}
.valley-menu__columns {
	display: flex;
	align-items: flex-start;
	gap: 48px;
	@media (max-width: $sm) {
		flex-direction: column;
		gap: 28px;
	}
}
.valley-menu__column {
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 0;
	list-style: none;
	gap: 14px;
}
.valley-menu__column--secondary {
	gap: 10px;
	padding-top: 6px;
}
.valley-menu__divider {
	width: 1px;
	align-self: stretch;
	min-height: 220px;
	background: rgba(247, 247, 240, 0.22);
	transform-origin: top center;
	@media (max-width: $sm) {
		display: none;
	}
}
</style>
