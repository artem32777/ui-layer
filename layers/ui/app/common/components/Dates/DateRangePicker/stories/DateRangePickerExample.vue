<script setup lang="ts">
import type { DateRange } from 'reka-ui'
import { ref } from 'vue'
import DateRangePicker from '../DateRangePicker.vue'

const selectedRange = ref<DateRange>()
</script>

<template>
	<DateRangePicker v-model="selectedRange" />
</template>
