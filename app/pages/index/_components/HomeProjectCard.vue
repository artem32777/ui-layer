<script setup lang="ts">
import { useTemplateRef } from 'vue'
import AnimPerspectiveTilt from '#layers/ui/app/modules/animation/components/AnimPerspectiveTilt.vue'

defineProps<{
	href: string
	image: string
	alt: string
	title: string
	category: string
	variant?: 'logistic' | 'cars'
}>()

const card = useTemplateRef<HTMLAnchorElement>('card')
</script>

<template>
	<a
		ref="card"
		class="valley__project"
		:class="{
			'valley__project--logistic': variant === 'logistic',
			'valley__project--cars': variant === 'cars',
		}"
		:href="href"
		target="_blank"
		rel="noopener noreferrer"
	>
		<div
			class="valley__project-image-wrap"
			:class="{ 'valley__project-image-wrap--wide': variant === 'cars' }"
		>
			<AnimPerspectiveTilt
				:track="card"
				:rotation="6"
				:shift="10"
				plane-inset="-8%"
				inner-inset="-4%"
			>
				<img
					class="valley__project-image"
					:src="image"
					:alt="alt"
					loading="lazy"
				>
			</AnimPerspectiveTilt>
			<span class="valley__project-arrow">↗</span>
		</div>
		<div class="valley__project-caption">
			<h3 class="valley__project-title">{{ title }}</h3>
			<span class="valley__project-category">{{ category }}</span>
		</div>
	</a>
</template>

<style scoped lang="scss">
.valley__project {
	color: #f7f7f0;
	text-decoration: none;
	&:hover {
		.valley__project-arrow {
			background: var(--brand);
			color: #111211;
		}
	}
}
.valley__project--cars {
	grid-column: 1 / -1;
}
.valley__project-image-wrap {
	aspect-ratio: 1.27;
	position: relative;
	overflow: hidden;
	background: #d4c5b5;
}
.valley__project--logistic {
	.valley__project-image-wrap {
		background: #cfd7e0;
	}
}
.valley__project-image-wrap--wide {
	aspect-ratio: 2.1;
	background: #afb3ba;
	@media (max-width: $sm) {
		aspect-ratio: 1.27;
	}
}
.valley__project-image {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.valley__project-arrow {
	position: absolute;
	z-index: 1;
	right: 20px;
	bottom: 20px;
	width: 48px;
	height: 48px;
	display: grid;
	place-items: center;
	border-radius: 50%;
	color: #f7f7f0;
	background: #111211;
	font-size: 26px;
	transition: background 0.2s;
}
.valley__project-caption {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20px;
	margin-top: 20px;
	@media (max-width: $sm) {
		display: block;
	}
}
.valley__project-title {
	font-size: 24px;
	font-weight: 500;
	margin: 0;
}
.valley__project-category {
	font-size: 12px;
	color: #a6aaa0;
	@media (max-width: $sm) {
		display: block;
		margin-top: 6px;
	}
}
</style>
