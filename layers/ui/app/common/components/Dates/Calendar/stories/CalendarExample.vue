<script setup lang="ts">
import type { DateValue } from 'reka-ui'
import { ref } from 'vue'
import Calendar from '../Calendar.vue'

const selectedDate = ref<DateValue>()
</script>

<template>
	<Calendar v-model="selectedDate" />
</template>
