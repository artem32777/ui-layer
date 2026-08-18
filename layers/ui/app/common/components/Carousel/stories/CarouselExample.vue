<script setup lang="ts">
import Carousel from '../Carousel.vue'

const slides = [
	{ title: 'Первый слайд', text: 'Описание первого слайда' },
	{ title: 'Второй слайд', text: 'Описание второго слайда' },
]
</script>

<template>
	<Carousel :slides="slides">
		<template #slide="{ slide }">
			<article>
				<h2>{{ slide.title }}</h2>
				<p>{{ slide.text }}</p>
			</article>
		</template>
	</Carousel>
</template>
