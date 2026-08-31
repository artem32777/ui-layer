<script setup lang="ts">
import { ref } from 'vue'
import { iconNames } from '#layers/ui/app/modules/svg-icon'
import Input from '../Input.vue'

const value = ref('')
</script>

<template>
	<Input
		v-model="value"
		:icon="iconNames['search-md']"
		placeholder="Введите запрос"
	/>
</template>
