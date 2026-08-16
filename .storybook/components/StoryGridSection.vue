<script setup lang="ts">
defineProps<{
	title: string
}>()
</script>

<template>
	<section class="story-grid-section">
		<h2 class="story-grid-section__title">
			{{ title }}
		</h2>
		<slot />
	</section>
</template>

<style scoped lang="scss">
.story-grid-section {
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding-bottom: 20px;
	border-bottom: 1px solid #000;
}

.story-grid-section__title {
	margin: 0;
	font-size: 25px;
	font-weight: 600;
}
</style>
