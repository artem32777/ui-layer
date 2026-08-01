<script setup lang="ts">
import OverflowNavigation from '../OverflowNavigation.vue'

const items = [
	{ id: 'catalog', label: 'Каталог', href: '#catalog' },
	{ id: 'delivery', label: 'Доставка', href: '#delivery' },
	{ id: 'contacts', label: 'Контакты', href: '#contacts' },
]
</script>

<template>
	<OverflowNavigation
		:items="items"
		tag="nav"
		:overflow-width="104"
	>
		<template #default="{ visibleItems, overflowItems, hasOverflow }">
			<ul>
				<li
					v-for="item in visibleItems"
					:key="item.id"
				>
					<a :href="item.href">{{ item.label }}</a>
				</li>
				<li v-if="hasOverflow">
					<button type="button">
						Ещё ({{ overflowItems.length }})
					</button>
				</li>
			</ul>
		</template>
	</OverflowNavigation>
</template>
