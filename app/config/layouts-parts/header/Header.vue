<script setup lang="ts">
import { ref } from 'vue'
import HeaderBurgerIcon from './HeaderBurgerIcon.vue'
import HeaderMobileMenu from './mobileMenu/HeaderMobileMenu.vue'
import HeaderLogo from './HeaderLogo.vue'
import HeaderMenu from './menu/HeaderMenu.vue'
import HeaderActions from './actions/HeaderActions.vue'
import type { NavigationMenuItem } from '#layers/ui/app/common/components/NavigationMenu/NavigationMenu.types.ts'
import { useApiFetch } from '~/common/composables/useApiFetch.ts'

const isMobileMenuOpen = ref(false)

const { data: menuItems } = useApiFetch<NavigationMenuItem[]>('/menu', {
	// lazy: true,
	// default: () => [],
})
</script>

<template>
	<header class="header">
		<div class="header__inner">
			<HeaderLogo />
			<HeaderMenu
				v-if="menuItems"
				:items="menuItems"
			/>
			<HeaderActions />
			<HeaderBurgerIcon
				:is-open="isMobileMenuOpen"
				@click="isMobileMenuOpen = !isMobileMenuOpen"
			/>
		</div>
		<HeaderMobileMenu
			:items="menuItems"
			:is-open="isMobileMenuOpen"
			@close="isMobileMenuOpen = false"
		/>
	</header>
</template>

<style scoped lang="scss">
.header {
  position: relative;
  z-index: 30;
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
