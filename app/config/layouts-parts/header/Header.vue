<script setup lang="ts">
import HeaderBurger from './HeaderBurger.vue'
import HeaderLogo from './HeaderLogo.vue'
import HeaderMenu from './menu/HeaderMenu.vue'
import HeaderActions from './actions/HeaderActions.vue'
import type { NavigationMenuItem } from '#layers/ui/app/common/components/NavigationMenu/NavigationMenu.types.ts'

export interface HeaderProps {
	logoSrc: string
	menuItems: NavigationMenuItem[]
}

defineProps<HeaderProps>()
</script>

<template>
	<header class="header">
		<div class="header__inner">
			<HeaderLogo :src="logoSrc" />
			<HeaderMenu :items="menuItems" />
			<HeaderActions />
			<HeaderBurger :items="menuItems" />
		</div>
	</header>
</template>

<style scoped lang="scss">
.header {
  z-index: $z-header;
  position: relative;
  background: var(--background);
}

.header__inner {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  width: 100%;

  @media (max-width: $lg) {
    min-height: 80px;
    padding: 10px 30px;
    gap: 32px;
  }

  @media (max-width: $sm) {
    min-height: 72px;
    padding: 8px 16px;
    gap: 12px;
  }
}
</style>
