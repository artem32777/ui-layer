<script setup lang="ts">
import HeaderMobileMenuItem from './mobileMenu/HeaderMobileMenuItem.vue'
import { getHeaderMenuItemKey, type HeaderMenuItem } from './menu/HeaderMenu.types'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
	items: HeaderMenuItem[]
}>()

const isMobileMenuOpen = ref(false)
const menuStack = ref<HeaderMenuItem[]>([])
const transitionName = ref('header-mobile-menu-forward')
const currentItems = computed(() => menuStack.value.at(-1)?.children ?? props.items)
const currentMenuKey = computed(() => menuStack.value.map(getHeaderMenuItemKey).join('/') || 'root')

function openItem(item: HeaderMenuItem) {
	if (item.children?.length) {
		transitionName.value = 'header-mobile-menu-forward'
		menuStack.value.push(item)
	}
}

function goBack() {
	transitionName.value = 'header-mobile-menu-backward'
	menuStack.value.pop()
}

function closeMenu() {
	isMobileMenuOpen.value = false
}

watch(isMobileMenuOpen, (isOpen) => {
	if (!isOpen) {
		menuStack.value = []
		transitionName.value = 'header-mobile-menu-forward'
	}
})
</script>

<template>
	<button
		class="header-burger"
		:class="{ 'header-burger_open': isMobileMenuOpen }"
		type="button"
		:aria-label="isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
		:aria-expanded="isMobileMenuOpen"
		aria-controls="header-mobile-menu"
		@click="isMobileMenuOpen = !isMobileMenuOpen"
	>
		<span class="header-burger__line" />
		<span class="header-burger__line" />
		<span class="header-burger__line" />
	</button>
	<Teleport to=".header">
		<nav
			id="header-mobile-menu"
			class="header-mobile-menu"
			:class="{ 'header-mobile-menu_open': isMobileMenuOpen }"
			aria-label="Мобильная навигация"
		>
			<Transition :name="transitionName">
				<div
					:key="currentMenuKey"
					class="header-mobile-menu__screen"
				>
					<button
						v-if="menuStack.length"
						class="header-mobile-menu__back"
						type="button"
						@click="goBack"
					>
						<span class="header-mobile-menu__back-icon" />
						Назад
					</button>
					<ul class="header-mobile-menu__list">
						<HeaderMobileMenuItem
							v-for="item in currentItems"
							:key="getHeaderMenuItemKey(item)"
							:item="item"
							@close="closeMenu"
							@open="openItem"
						/>
					</ul>
				</div>
			</Transition>
		</nav>
	</Teleport>
</template>

<style scoped lang="scss">
.header-burger {
  display: none;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 44px;
  height: 44px;
  gap: 5px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: var(--neutral-950);
  background: color-mix(in srgb, var(--neutral-500) 35%, var(--white));
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: var(--white);
    background: var(--primary);
  }

  @media (max-width: $sm) {
    display: inline-flex;
    order: 2;
  }

  &.header-burger_open {
    .header-burger__line {
      &:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    }
  }
}

.header-burger__line {
  width: 18px;
  height: 2px;
  border-radius: 1px;
  background: currentColor;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.header-mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 1;
  display: none;
  overflow: hidden;
  width: 100%;
  height: 100dvh;
  background: var(--white);
  opacity: 0;
  visibility: hidden;
  transform: translateX(100%);
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
  pointer-events: none;

  @media (max-width: $sm) {
    display: block;
  }

  &.header-mobile-menu_open {
    @media (max-width: $sm) {
      opacity: 1;
      visibility: visible;
      transform: translateX(0);
      pointer-events: auto;
    }
  }
}

.header-mobile-menu__screen {
  position: absolute;
  inset: 72px 0 0;
  overflow-y: auto;
  background: var(--white);
}

.header-mobile-menu__back {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 16px;
  border: 0;
  border-bottom: 1px solid color-mix(in srgb, var(--neutral-950) 8%, transparent);
  color: var(--neutral-950);
  background: transparent;
  font: inherit;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
  text-align: left;
  cursor: pointer;
}

.header-mobile-menu__back-icon {
  width: 8px;
  height: 8px;
  border-bottom: 2px solid currentColor;
  border-left: 2px solid currentColor;
  transform: rotate(45deg);
}

.header-mobile-menu__list {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 8px 16px 20px;
  list-style: none;
}

.header-mobile-menu-forward-enter-active,
.header-mobile-menu-forward-leave-active,
.header-mobile-menu-backward-enter-active,
.header-mobile-menu-backward-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.header-mobile-menu-forward-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.header-mobile-menu-forward-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.header-mobile-menu-backward-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.header-mobile-menu-backward-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
