<script setup lang="ts">
import type { DateRange } from 'reka-ui'
import { ref } from 'vue'
import RangeCalendar from '../RangeCalendar.vue'

const selectedRange = ref<DateRange>()
</script>

<template>
	<RangeCalendar v-model="selectedRange" />
</template>
