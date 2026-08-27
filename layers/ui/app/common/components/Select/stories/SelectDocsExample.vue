<script setup lang="ts">
import { ref } from 'vue'
import { iconNames } from '#layers/ui/app/modules/svg-icon'
import Select from '../Select.vue'
import type { SelectOption } from '../Select.types.ts'

const city = ref('')

const options: SelectOption[] = [
	{ label: 'Москва', value: 'moscow' },
	{ label: 'Казань', value: 'kazan' },
]
</script>

<template>
	<Select
		v-model="city"
		:options="options"
		:icon="iconNames['building-01']"
		placeholder="Выберите город"
	/>
</template>
