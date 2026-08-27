<script setup lang="ts">
import ButtonLink from '../ButtonLink.vue'
import { iconNames } from '#layers/ui/app/modules/svg-icon/runtime/iconNames'
</script>

<template>
	<ButtonLink
		href="#"
		size="big"
		:icon-right="iconNames['arrow-right']"
	>
		Подробнее
	</ButtonLink>
</template>
