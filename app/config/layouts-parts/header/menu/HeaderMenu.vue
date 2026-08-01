<script setup lang="ts">
import NavigationMenu from '#layers/ui/app/common/components/NavigationMenu/NavigationMenu.vue'
import OverflowNavigation from '#layers/ui/app/common/components/OverflowNavigation/OverflowNavigation.vue'
import type {
	NavigationMenuItem,
	NavigationMenuProps,
} from '#layers/ui/app/common/components/NavigationMenu/NavigationMenu.types.ts'

defineProps<NavigationMenuProps>()

function withOverflow(
	visibleItems: NavigationMenuItem[],
	overflowItems: NavigationMenuItem[],
) {
	return overflowItems.length
		? [
				...visibleItems,
				{
					label: 'Ещё',
					children: overflowItems,
				},
			]
		: visibleItems
}
</script>

<template>
	<OverflowNavigation
		class="header-menu"
		:items="items"
		:overflow-width="70"
		list-selector=".navigation-menu__list"
	>
		<template #default="{ visibleItems, overflowItems }">
			<NavigationMenu
				class="header-menu__navigation"
				:items="withOverflow(visibleItems, overflowItems)"
				aria-label="Основная навигация"
			/>
		</template>
	</OverflowNavigation>
</template>

<style scoped lang="scss">
.header-menu {
	min-width: 0;
	gap: 44px;
	flex: 1 1 auto;
	opacity: 0;

	.app-ready & {
		opacity: 1;
	}

	@media (max-width: $sm) {
		display: none;
	}
}

.header-menu__navigation {
	width: 100%;
}
</style>
