<script setup lang="ts">
import { getHeaderMenuItemKey, type HeaderMenuItem } from './HeaderMenu.types'
import HeaderMenuDropdownItem from './HeaderMenuDropdownItem.vue'

const { items, isShort = false, isRight = false, isOverflow = false } = defineProps<{
	items: HeaderMenuItem[]
	isShort?: boolean
	isRight?: boolean
	isOverflow?: boolean
}>()
</script>

<template>
	<ul
		class="header-menu__dropdown"
		:class="{
			'header-menu__dropdown_short': isShort,
			'header-menu__dropdown_right': isRight,
			'header-menu__dropdown_overflow': isOverflow,
		}"
	>
		<HeaderMenuDropdownItem
			v-for="item in items"
			:key="getHeaderMenuItemKey(item)"
			:item="item"
			:is-submenu-right="isRight"
		/>
	</ul>
</template>

<style scoped lang="scss">
.header-menu__dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  width: 280px;
  margin: 0;
  padding: 8px;
  border-radius: 8px;
  background: var(--background);
  box-shadow: 0 16px 40px color-mix(in srgb, var(--black) 14%, transparent);
  list-style: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
}

.header-menu__dropdown_short {
  width: 200px;
}

.header-menu__dropdown_right {
  right: 0;
  left: auto;
}

.header-menu__dropdown_overflow {
  left: -200px;
  width: 300px;
}
</style>
