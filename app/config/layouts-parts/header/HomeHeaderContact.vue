<script setup lang="ts">
import { navigateOnPage } from '#layers/ui/app/modules/animation/utils/pageNavigation'

defineProps<{
	link: { href: string, label: string }
}>()
</script>

<template>
	<a
		class="valley__header-contact"
		:href="link.href"
		@click="navigateOnPage(link.href, $event)"
	>
		{{ link.label }}
		<span>↗</span>
	</a>
</template>

<style scoped lang="scss">
.valley__header-contact {
	position: relative;
	z-index: 2;
	color: #f7f7f0;
	text-decoration: none;
	font-size: 20px;
	display: flex;
	gap: 24px;
	align-items: center;
	&:hover {
		color: var(--brand);
	}
	@media (max-width: $md) {
		margin-left: auto;
	}
	@media (max-width: $sm) {
		font-size: 12px;
		gap: 8px;
	}
	@media (max-width: $xxs) {
		display: none;
	}
}
</style>
