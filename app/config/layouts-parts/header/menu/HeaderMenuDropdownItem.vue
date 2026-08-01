<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { HeaderMenuItem } from './HeaderMenu.types'

const HeaderMenuSubmenu = defineAsyncComponent(() => import('./HeaderMenuSubmenu.vue'))

const { item, isSubmenuRight = false } = defineProps<{
	item: HeaderMenuItem
	isSubmenuRight?: boolean
}>()
</script>

<template>
	<li
		class="header-menu__dropdown-item"
		:class="{ 'header-menu__dropdown-item_has-submenu': item.children?.length }"
	>
		<button
			v-if="item.children?.length"
			class="header-menu__dropdown-button"
			type="button"
		>
			{{ item.label }}
			<span class="header-menu__submenu-arrow" />
		</button>
		<a
			v-else
			:href="item.href"
			class="header-menu__dropdown-link"
		>
			{{ item.label }}
		</a>
		<HeaderMenuSubmenu
			v-if="item.children?.length"
			:items="item.children"
			:is-wide="item.wide"
			:is-right="isSubmenuRight"
		/>
	</li>
</template>

<style scoped lang="scss">
.header-menu__dropdown-item {
  position: relative;
}

.header-menu__dropdown-button,
.header-menu__dropdown-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 48px;
  padding: 12px 16px;
  border: 0;
  border-radius: 8px;
  color: var(--text);
  background: transparent;
  font: inherit;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
  text-align: left;
  text-decoration: none;
  transition: color 0.3s ease, background-color 0.3s ease;
  white-space: nowrap;
}

.header-menu__dropdown-button {
  cursor: pointer;
}

.header-menu__dropdown-link,
.header-menu__dropdown-button {
  &:hover {
    background: color-mix(in srgb, var(--grey) 35%, var(--background));
    color: var(--brand);
  }
}

.header-menu__dropdown-item_has-submenu {
  &:hover {
    :deep(.header-menu__submenu) {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .header-menu__submenu-arrow {
      transform: rotate(45deg) translate(2px, -2px);
    }
  }

  &:focus-within {
    :deep(.header-menu__submenu) {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
}

.header-menu__submenu-arrow {
  width: 8px;
  height: 8px;
  margin-left: 16px;
  border-top: 2px solid currentColor;
  border-right: 2px solid currentColor;
  transform: rotate(45deg);
  transition: transform 0.3s ease;
}
</style>
