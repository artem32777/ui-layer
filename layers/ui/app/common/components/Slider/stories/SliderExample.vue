<script setup lang="ts">
import Slider from '../Slider.vue'

const slides = [
	{ title: 'Первый слайд', text: 'Описание первого слайда' },
	{ title: 'Второй слайд', text: 'Описание второго слайда' },
]
</script>

<template>
	<Slider :slides="slides">
		<template #slide="{ slide }">
			<article>
				<h2>{{ slide.title }}</h2>
				<p>{{ slide.text }}</p>
			</article>
		</template>
	</Slider>
</template>
