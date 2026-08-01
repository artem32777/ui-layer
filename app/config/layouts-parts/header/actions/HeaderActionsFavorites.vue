<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFavoriteStore } from '~/modules/premises'
import { routesNames } from '~/common/utils/router.ts'

const store = useFavoriteStore()
const { favoriteSet } = storeToRefs(store)
</script>

<template>
	<NuxtLink
		:to="{ name: routesNames.favorite }"
		class="header-actions__favorite"
		aria-label="Избранное"
	>
		<span class="header-actions__favorite-icon" />
		<span class="header-actions__favorite-count">{{ favoriteSet.size }}</span>
	</NuxtLink>
</template>

<style scoped lang="scss">
.header-actions__favorite {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: var(--brand);
  background: color-mix(in srgb, var(--brand) 10%, transparent);
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    color: var(--white);
    background: var(--brand);
  }

  @media (max-width: $sm) {
    width: 44px;
    height: 44px;
  }
}

.header-actions__favorite-icon {
  width: 25px;
  height: 25px;
  background: currentColor;
  clip-path: polygon(50% 0, 62% 35%, 100% 35%, 69% 56%, 81% 94%, 50% 70%, 19% 94%, 31% 56%, 0 35%, 38% 35%);
}

.header-actions__favorite-count {
  position: absolute;
  top: -3px;
  right: -3px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  color: var(--white);
  background: var(--brand);
  font-size: 12px;
  line-height: 1;
  font-weight: 700;
}
</style>
