<script setup lang="ts">
</script>

<template>
	<div class="story-grid-row">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.story-grid-row {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	gap: 24px;
}
</style>
