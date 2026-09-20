<script setup lang="ts">
import { navigateOnPage } from '#layers/ui/app/modules/animation/utils/pageNavigation'

defineProps<{
	links: {
		href: string
		label: string
	}[]
}>()
</script>

<template>
	<nav
		class="valley__navigation"
		aria-label="Основная навигация"
	>
		<a
			v-for="link in links"
			:key="link.href"
			class="valley__nav-link"
			:href="link.href"
			@click="navigateOnPage(link.href, $event)"
		>{{ link.label }}</a>
	</nav>
</template>

<style scoped lang="scss">
.valley__navigation {
	display: flex;
	gap: 36px;
	margin-left: auto;

	@media (max-width: $md) {
		display: none;
	}
}
.valley__nav-link {
	color: #e3e4dd;
	text-decoration: none;
	font-size: 20px;

	&:hover {
		color: var(--brand);
	}
}
</style>
