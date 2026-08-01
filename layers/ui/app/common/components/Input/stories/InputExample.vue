<script setup lang="ts">
import { ref } from 'vue'
import Input from '../Input.vue'

const value = ref('')
</script>

<template>
	<Input v-model="value" />
</template>
