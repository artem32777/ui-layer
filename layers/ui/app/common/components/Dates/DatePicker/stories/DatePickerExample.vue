<script setup lang="ts">
import type { DateValue } from 'reka-ui'
import { ref } from 'vue'
import DatePicker from '../DatePicker.vue'

const selectedDate = ref<DateValue>()
</script>

<template>
	<DatePicker v-model="selectedDate" />
</template>
