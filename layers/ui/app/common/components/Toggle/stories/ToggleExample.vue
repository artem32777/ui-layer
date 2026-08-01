<script setup lang="ts">
import { ref } from 'vue'
import Toggle from '../Toggle.vue'

const isBold = ref(false)
</script>

<template>
	<Toggle
		v-model="isBold"
		variant="outline"
		aria-label="Полужирное начертание"
	>
		B
	</Toggle>
</template>
