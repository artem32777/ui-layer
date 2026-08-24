<script setup lang="ts">
defineProps<{
	title: string
}>()
</script>

<template>
	<div class="story-grid-item">
		<span class="story-grid-item__title">{{ title }}</span>
		<slot />
	</div>
</template>

<style scoped lang="scss">
.story-grid-item {
  min-width: 200px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 8px;
}

.story-grid-item__title {
  font-size: 20px;
  color: var(--story-text);
}
</style>
