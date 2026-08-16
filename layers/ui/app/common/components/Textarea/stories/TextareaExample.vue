<script setup lang="ts">
import { ref } from 'vue'
import Textarea from '../Textarea.vue'

const message = ref('')
</script>

<template>
	<Textarea v-model="message" />
</template>
