<script setup lang="ts">
import { ref } from 'vue'
import Checkbox from '../Checkbox.vue'

const checked = ref(false)
</script>

<template>
	<Checkbox v-model="checked">
		Подтверждаю
	</Checkbox>
</template>
