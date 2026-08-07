<script setup lang="ts">
import { ref } from 'vue'
import ColorArea from '../ColorArea.vue'

const color = ref('#56d799')
</script>

<template>
	<ColorArea v-model="color" />
</template>
