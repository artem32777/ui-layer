<script setup lang="ts">
import { useNuxtApp } from '#imports'
import Button from '#layers/ui/app/common/components/Button/Button.vue'

const { $toast } = useNuxtApp()
</script>

<template>
	<Button @click="$toast('Уведомление отправлено')">
		Показать уведомление
	</Button>
</template>
