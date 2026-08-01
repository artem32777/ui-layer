<script setup lang="ts">
defineProps<{
	errorMessage?: string
}>()
</script>

<template>
	<span
		v-if="errorMessage"
		class="v-error"
	>
		{{ errorMessage }}
	</span>
</template>

<style scoped lang="scss">
.v-error {
	margin: 0;
	color: var(--red, #ff001f);
	font-size: 12px;
	font-weight: 500;
	line-height: 1.4;
}
</style>
