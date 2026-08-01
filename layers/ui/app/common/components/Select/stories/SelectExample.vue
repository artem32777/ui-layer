<script setup lang="ts">
import { ref } from 'vue'
import Select from '../Select.vue'
import type { SelectOption } from '../Select.types.ts'

const city = ref<string>('')

const options: SelectOption[] = [
	{ label: 'Москва', value: 'moscow' },
	{ label: 'Казань', value: 'kazan' },
]
</script>

<template>
	<Select
		v-model="city"
		:options="options"
		placeholder="Выберите город"
	/>
</template>
