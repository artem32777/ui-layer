<script setup lang="ts">
import Slider from '../../../common/components/Slider/Slider.vue'

const slides = [
	{
		text: '1111',
	},
	{
		text: '222',
	},
	{
		text: '333',
	},
]
</script>

<template>
	<Slider :slides="slides" />
</template>
