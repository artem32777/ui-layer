<script setup lang="ts">
import HeaderMenuDropdown from './HeaderMenuDropdown.vue'
import type { HeaderMenuItem } from './HeaderMenu.types'

const { item } = defineProps<{
	item: HeaderMenuItem
}>()
</script>

<template>
	<li
		class="header-menu__item"
		:class="{ 'header-menu__item_has-dropdown': item.children?.length }"
	>
		<button
			v-if="item.children?.length"
			class="header-menu__button"
			type="button"
		>
			{{ item.label }}
			<span class="header-menu__chevron" />
		</button>
		<a
			v-else
			:href="item.href"
			class="header-menu__link"
		>
			{{ item.label }}
		</a>
		<HeaderMenuDropdown
			v-if="item.children?.length"
			:items="item.children"
			:is-short="item.children.length === 1"
		/>
	</li>
</template>

<style scoped lang="scss">
.header-menu__item {
  position: relative;
  display: flex;
  align-items: center;
}

.header-menu__button,
.header-menu__link {
  color: var(--text);
  font: inherit;
  font-size: 18px;
  line-height: 1.5;
  text-decoration: none;
  transition: color 0.3s ease, background-color 0.3s ease;
  white-space: nowrap;
}

.header-menu__button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 22px 0;
  border: 0;
  color: var(--text);
  background: transparent;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    color: var(--brand);
  }
}

.header-menu__link {
  display: inline-flex;
  padding: 22px 0;
  font-weight: 400;

  &:hover {
    color: var(--brand);
  }
}

.header-menu__chevron {
  width: 8px;
  height: 8px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg) translateY(-2px);
  transition: transform 0.3s ease;
}

.header-menu__item_has-dropdown {
  &:hover {
    .header-menu__chevron {
      transform: rotate(225deg) translateY(-2px);
    }

    :deep(.header-menu__dropdown) {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }

  &:focus-within {
    :deep(.header-menu__dropdown) {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
}
</style>
