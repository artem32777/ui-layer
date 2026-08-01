<script setup lang="ts">
import {
	getHeaderMenuItemKey,
	type HeaderMenuItem,
} from './HeaderMenu.types'

const { items, isWide = false, isRight = false } = defineProps<{
	items: HeaderMenuItem[]
	isWide?: boolean
	isRight?: boolean
}>()
</script>

<template>
	<ul
		class="header-menu__submenu"
		:class="{
			'header-menu__submenu_wide': isWide,
			'header-menu__submenu_right': isRight,
		}"
	>
		<li
			v-for="item in items"
			:key="getHeaderMenuItemKey(item)"
			class="header-menu__submenu-item"
		>
			<a
				:href="item.href"
				class="header-menu__submenu-link"
			>
				{{ item.label }}
			</a>
		</li>
	</ul>
</template>

<style scoped lang="scss">
.header-menu__submenu {
  position: absolute;
  top: 0;
  left: calc(100% + 8px);
  z-index: 21;
  display: flex;
  flex-direction: column;
  width: 200px;
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

.header-menu__submenu_wide {
  width: 260px;
}

.header-menu__submenu_right {
  right: calc(100% + 8px);
  left: auto;
}

.header-menu__submenu-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 48px;
  padding: 12px 16px;
  border-radius: 8px;
  color: var(--text);
  font: inherit;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
  text-align: left;
  text-decoration: none;
  transition: color 0.3s ease, background-color 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: color-mix(in srgb, var(--grey) 35%, var(--background));
    color: var(--brand);
  }
}
</style>
