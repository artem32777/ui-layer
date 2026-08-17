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
	color: color-mix(in srgb, var(--red, #ff001f) 90%, #000000);
	font-size: 12px;
	font-weight: 500;
	line-height: 1.4;
}
</style>
