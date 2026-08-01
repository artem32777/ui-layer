<script setup lang="ts">
import { ref } from 'vue'
import RadioGroup from '../RadioGroup.vue'
import type { RadioOption } from '../RadioGroup.types.ts'

const value = ref('')

const options: RadioOption[] = [
	{ label: '10 years', value: '10' },
	{ label: '20 years', value: '20' },
	{ label: '30 years', value: '30' },
]
</script>

<template>
	<RadioGroup
		v-model="value"
		:options="options"
	/>
</template>
