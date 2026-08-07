<script setup lang="ts">
import { ref } from 'vue'
import ColorField from '../ColorField.vue'

const color = ref('#3b82f6')
</script>

<template>
	<ColorField
		v-model="color"
		aria-label="Цвет"
	/>
</template>
