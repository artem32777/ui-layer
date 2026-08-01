<script setup lang="ts">
import { ref } from 'vue'
import ToggleGroup from '../ToggleGroup.vue'

const alignment = ref('center')
const options = [
	{ label: 'L', value: 'left' },
	{ label: 'C', value: 'center' },
	{ label: 'R', value: 'right' },
]
</script>

<template>
	<ToggleGroup
		v-model="alignment"
		:options="options"
	/>
</template>
