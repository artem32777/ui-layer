<script setup lang="ts">
import HeaderMenuDropdown from './HeaderMenuDropdown.vue'
import type { HeaderMenuItem } from './HeaderMenu.types'

const { items } = defineProps<{
	items: HeaderMenuItem[]
}>()
</script>

<template>
	<li
		class="header-menu__item header-menu__item_overflow"
	>
		<button
			class="header-menu__overflow"
			type="button"
			aria-label="Еще"
		>
			<span class="header-menu__dot" />
			<span class="header-menu__dot" />
			<span class="header-menu__dot" />
		</button>
		<HeaderMenuDropdown
			:items="items"
			is-overflow
		/>
	</li>
</template>

<style scoped lang="scss">
.header-menu__item {
  position: relative;
  display: flex;
  align-items: center;
}

.header-menu__item_overflow {
  &:hover,
  &:focus-within {
    :deep(.header-menu__dropdown) {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
}

.header-menu__overflow {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  gap: 4px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: var(--text);
  background: transparent;
  font: inherit;
  font-size: 18px;
  line-height: 1.5;
  text-decoration: none;
  transition: color 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: var(--brand);
  }
}

.header-menu__dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: currentColor;
}
</style>
