<script setup lang="ts">
import { NavigationMenuList, NavigationMenuRoot, NavigationMenuViewport } from 'reka-ui'
import NavigationMenuEntry from './NavigationMenuItem.vue'
import { getNavigationMenuItemValue, type NavigationMenuProps } from './NavigationMenu.types.ts'

defineProps<NavigationMenuProps>()
</script>

<template>
	<NavigationMenuRoot class="navigation-menu">
		<NavigationMenuList class="navigation-menu__list">
			<NavigationMenuEntry
				v-for="item in items"
				:key="getNavigationMenuItemValue(item)"
				:item="item"
			/>
		</NavigationMenuList>

		<NavigationMenuViewport
			align="start"
			class="navigation-menu__viewport"
		/>
	</NavigationMenuRoot>
</template>

<style scoped lang="scss">
.navigation-menu {
  position: relative;
}

:deep(.navigation-menu__list) {
  display: flex;
  width: 100%;
  gap: 44px;
}

.navigation-menu__viewport {
  position: absolute;
  top: calc(100% + 6px);
  left: var(--reka-navigation-menu-viewport-left, 0);

  &[data-state='open'] {
    opacity: 1;
    animation: navigation-menu-viewport-enter 0.3s ease;

    &::before {
      content: '';
      position: absolute;
      right: 0;
      bottom: 100%;
      left: 0;
      height: 6px;
    }
  }

  &[data-state='closed'] {
    animation: navigation-menu-viewport-exit 0.3s ease;
  }

  &:has(> [data-motion='from-start'], > [data-motion='from-end']) {
    transition: left 0.3s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
  }
}

@keyframes navigation-menu-viewport-enter {
  from {opacity: 0; transform: translateY(8px)}
}

@keyframes navigation-menu-viewport-exit {
  to {opacity: 0; transform: translateY(8px)}
}

@media (prefers-reduced-motion: reduce) {
  .navigation-menu,
  .navigation-menu :deep(*) {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>
