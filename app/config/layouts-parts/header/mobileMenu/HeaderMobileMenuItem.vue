<script setup lang="ts">
import type { HeaderMenuItem } from '../menu/HeaderMenu.types'

const { item } = defineProps<{
	item: HeaderMenuItem
}>()

const emit = defineEmits<{
	close: []
	open: [item: HeaderMenuItem]
}>()
</script>

<template>
	<li class="header-mobile-menu__item">
		<button
			v-if="item.children?.length"
			class="header-mobile-menu__button"
			type="button"
			@click="emit('open', item)"
		>
			{{ item.label }}
			<span class="header-mobile-menu__chevron" />
		</button>
		<a
			v-else-if="item.href"
			:href="item.href"
			class="header-mobile-menu__link"
			@click="emit('close')"
		>
			{{ item.label }}
		</a>
		<span
			v-else
			class="header-mobile-menu__label"
		>
			{{ item.label }}
		</span>
	</li>
</template>

<style scoped lang="scss">
.header-mobile-menu__item {
  border-bottom: 1px solid color-mix(in srgb, var(--black) 8%, transparent);
}

.header-mobile-menu__button,
.header-mobile-menu__link,
.header-mobile-menu__label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 0;
  color: var(--text);
  border: 0;
  background: transparent;
  font: inherit;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
  text-align: left;
  text-decoration: none;
}

.header-mobile-menu__button {
  cursor: pointer;
}

.header-mobile-menu__chevron {
  flex: 0 0 auto;
  width: 8px;
  height: 8px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(-45deg);
  transition: transform 0.3s ease;
}
</style>
