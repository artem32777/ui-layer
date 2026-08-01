<script setup lang="ts">
import { ref } from 'vue'
import Switch from '../Switch.vue'

const isEnabled = ref(false)
</script>

<template>
	<Switch v-model="isEnabled" />
</template>
