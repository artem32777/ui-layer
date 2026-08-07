<script setup lang="ts">
import { ref } from 'vue'
import PinInput from '../PinInput.vue'

const value = ref<string[]>([])
</script>

<template>
	<PinInput
		v-model="value"
		otp
		aria-label="Код подтверждения"
	/>
</template>
