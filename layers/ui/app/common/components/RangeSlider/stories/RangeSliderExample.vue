<script setup lang="ts">
import { ref } from 'vue'
import MultiRangeSlider from '../MultiRangeSlider.vue'
import RangeSlider from '../RangeSlider.vue'

const price = ref([20, 80])
const intervals = ref([10, 30, 60, 90])
</script>

<template>
	<RangeSlider
		v-model="price"
		label="Цена"
		additional-text=" тыс. ₽"
	/>
	<MultiRangeSlider
		v-model="intervals"
		:step="5"
	/>
</template>
