<script setup lang="ts">
import { ref } from 'vue'
import NumberField from '../NumberField.vue'

const quantity = ref<number | null>(3)
</script>

<template>
	<label for="quantity">Количество</label>
	<NumberField
		id="quantity"
		v-model="quantity"
		:min="0"
		:max="20"
	/>
</template>
