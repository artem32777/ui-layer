<script setup lang="ts">
import type { DateValue } from 'reka-ui'
import { ref } from 'vue'
import MonthPicker from '../MonthPicker.vue'

const selectedMonth = ref<DateValue>()
</script>

<template>
	<MonthPicker v-model="selectedMonth" />
</template>
