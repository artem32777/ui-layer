<script setup lang="ts">
import OverflowNavigation from '../OverflowNavigation.vue'
import NavigationMenu from '../../NavigationMenu/NavigationMenu.vue'

const items = [
	{ id: 'catalog', label: 'Каталог', href: '#catalog' },
	{ id: 'delivery', label: 'Доставка', href: '#delivery' },
	{ id: 'contacts', label: 'Контакты', href: '#contacts' },
]
</script>

<template>
	<OverflowNavigation
		:items="items"
		:overflow-width="70"
		list-selector=".navigation-menu__list"
	>
		<template #default="{ visibleItems, overflowItems }">
			<NavigationMenu
				class="header-menu__navigation"
				:items="overflowItems.length
					? [...visibleItems, { label: 'Ещё', children: overflowItems }]
					: visibleItems"
				aria-label="Основная навигация"
			/>
		</template>
	</OverflowNavigation>
</template>
