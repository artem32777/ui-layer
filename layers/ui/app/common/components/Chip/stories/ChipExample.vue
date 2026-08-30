<script setup lang="ts">
import { ref } from 'vue'
import Chip from '../Chip.vue'

const selected = ref(false)
</script>

<template>
	<Chip
		v-model="selected"
		type="toggle"
		size="medium"
		text="Chip"
	/>
</template>
