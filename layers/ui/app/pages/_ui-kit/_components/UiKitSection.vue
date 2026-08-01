<script setup lang="ts">
const { title, navigation = false } = defineProps<{
	title: string
	navigation?: boolean
}>()
</script>

<template>
	<section
		class="ui-kit-section"
		:class="{ 'ui-kit-section--navigation': navigation }"
	>
		<h2 class="ui-kit-section__title">
			{{ title }}
		</h2>
		<slot />
	</section>
</template>

<style scoped lang="scss">
.ui-kit-section {
	display: flex;
	flex-direction: column;
	gap: 18px;
	width: 100%;
	margin-bottom: 28px;
	padding: 24px;
	border: 1px solid var(--grey);
	border-radius: 8px;
	background: var(--background);

	&.ui-kit-section--navigation {
		min-height: 220px;
	}
}

.ui-kit-section__title {
	margin: 0;
	font-size: 22px;
	line-height: 1.2;
	font-weight: 600;
}
</style>
