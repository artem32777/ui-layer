<script setup lang="ts">
</script>

<template>
	<div class="story-grid">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.story-grid {
	display: flex;
	flex-direction: column;
	gap: 40px;
}
</style>
