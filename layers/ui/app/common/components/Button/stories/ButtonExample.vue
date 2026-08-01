<script setup lang="ts">
import Button from '../Button.vue'
import { iconNames } from '#layers/ui/app/modules/svg-icon/runtime/iconNames'
</script>

<template>
	<Button
		variant="ghost"
		size="l"
		:icon-left="iconNames.plus"
	>
		Добавить
	</Button>
</template>
