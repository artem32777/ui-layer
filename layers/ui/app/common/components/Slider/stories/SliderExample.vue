<script setup lang="ts">
import { ref } from 'vue'
import MultiSlider from '../MultiSlider.vue'
import Slider from '../Slider.vue'

const price = ref([20, 80])
const intervals = ref([10, 30, 60, 90])
</script>

<template>
	<Slider
		v-model="price"
		label="Цена"
		additional-text=" тыс. ₽"
	/>
	<MultiSlider
		v-model="intervals"
		:step="5"
	/>
</template>
