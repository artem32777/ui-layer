<script setup lang="ts">
import Skeleton from '../Skeleton.vue'
</script>

<template>
	<div class="skeleton-example">
		<Skeleton
			height="160px"
			border-radius="12px"
		/>
		<Skeleton
			width="70%"
			height="20px"
		/>
		<Skeleton height="14px" />
		<Skeleton
			width="90%"
			height="14px"
		/>
	</div>
</template>

<style scoped lang="scss">
.skeleton-example {
	display: flex;
	flex-direction: column;
	gap: 12px;
	width: 100%;
	max-width: 480px;
}
</style>
