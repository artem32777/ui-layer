<script setup lang="ts">
const { label, wide = false } = defineProps<{
	label: string
	wide?: boolean
}>()
</script>

<template>
	<div
		class="ui-kit-demo"
		:class="{ 'ui-kit-demo--wide': wide }"
	>
		<span class="ui-kit-demo__label">{{ label }}</span>
		<slot />
	</div>
</template>

<style scoped lang="scss">
.ui-kit-demo {
	display: inline-flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 8px;

	&.ui-kit-demo--wide {
		//width: 100%;
	}
}

.ui-kit-demo__label {
	color: var(--additional-2);
	font-size: 12px;
	line-height: 1;
	font-weight: 500;
}
</style>
