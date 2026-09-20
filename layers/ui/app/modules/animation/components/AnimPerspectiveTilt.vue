<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import { useEventListener, useParentElement, usePreferredReducedMotion } from '@vueuse/core'
import gsap from 'gsap'

const props = withDefaults(defineProps<{
	/** Элемент, на котором слушается курсор. По умолчанию — родитель компонента. */
	track?: HTMLElement | null
	/** Максимальный наклон в градусах. */
	rotation?: number
	/** Максимальный сдвиг внутреннего слоя в пикселях. */
	shift?: number
	/** Насколько плоскость выходит за край контейнера. */
	planeInset?: string
	/** Насколько внутренний слой выходит за край плоскости. */
	innerInset?: string
}>(), {
	rotation: 3,
	shift: 8,
	planeInset: '-20%',
	innerInset: '-6%',
})

const root = useTemplateRef<HTMLElement>('root')
const tilt = useTemplateRef<HTMLElement>('tilt')
const inner = useTemplateRef<HTMLElement>('inner')
const parent = useParentElement()
const track = computed(() => props.track ?? parent.value)
const reducedMotion = usePreferredReducedMotion()
let rotateXTo: ReturnType<typeof gsap.quickTo> | undefined
let rotateYTo: ReturnType<typeof gsap.quickTo> | undefined
let innerXTo: ReturnType<typeof gsap.quickTo> | undefined
let innerYTo: ReturnType<typeof gsap.quickTo> | undefined

onMounted(() => {
	if (!root.value || !tilt.value || !inner.value || reducedMotion.value === 'reduce') return
	gsap.set(root.value, { perspective: 1400 })
	rotateXTo = gsap.quickTo(tilt.value, 'rotationX', { ease: 'power3' })
	rotateYTo = gsap.quickTo(tilt.value, 'rotationY', { ease: 'power3' })
	innerXTo = gsap.quickTo(inner.value, 'x', { ease: 'power3' })
	innerYTo = gsap.quickTo(inner.value, 'y', { ease: 'power3' })
})

onBeforeUnmount(() => {
	rotateXTo?.tween.kill()
	rotateYTo?.tween.kill()
	innerXTo?.tween.kill()
	innerYTo?.tween.kill()
})

useEventListener(track, 'pointermove', (event: PointerEvent) => {
	if (!rotateXTo || !rotateYTo || !innerXTo || !innerYTo || !root.value) return
	const rect = root.value.getBoundingClientRect()
	rotateXTo(gsap.utils.interpolate(props.rotation, -props.rotation, (event.clientY - rect.top) / rect.height))
	rotateYTo(gsap.utils.interpolate(-props.rotation, props.rotation, (event.clientX - rect.left) / rect.width))
	innerXTo(gsap.utils.interpolate(-props.shift, props.shift, (event.clientX - rect.left) / rect.width))
	innerYTo(gsap.utils.interpolate(-props.shift, props.shift, (event.clientY - rect.top) / rect.height))
})
</script>

<template>
	<div
		ref="root"
		class="anim-perspective-tilt"
		:style="{
			'--anim-perspective-tilt-plane-inset': planeInset,
			'--anim-perspective-tilt-inner-inset': innerInset,
		}"
	>
		<div
			ref="tilt"
			class="anim-perspective-tilt__plane"
		>
			<div
				ref="inner"
				class="anim-perspective-tilt__inner"
			>
				<slot />
			</div>
			<slot name="overlay" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.anim-perspective-tilt {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
	overflow: hidden;
	pointer-events: none;
}
.anim-perspective-tilt__plane {
	position: absolute;
	inset: var(--anim-perspective-tilt-plane-inset);
}
.anim-perspective-tilt__inner {
	position: absolute;
	inset: var(--anim-perspective-tilt-inner-inset);
}
</style>
