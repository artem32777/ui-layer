<script setup lang="ts">
import {
	NavigationMenuContent,
	NavigationMenuItem as RekaNavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from 'reka-ui'
import NavigationMenuDropdown from './NavigationMenuDropdown.vue'
import {
	getNavigationMenuItemValue,
	isNavigationMenuGroup,
	type NavigationMenuItem,
} from './NavigationMenu.types.ts'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'

defineProps<{ item: NavigationMenuItem }>()
</script>

<template>
	<RekaNavigationMenuItem
		:value="isNavigationMenuGroup(item) ? getNavigationMenuItemValue(item) : undefined"
	>
		<template v-if="isNavigationMenuGroup(item)">
			<NavigationMenuTrigger class="navigation-menu-item__trigger">
				{{ item.label }}
				<Icon
					:name="iconNames.chevronDown"
					class="navigation-menu-item__chevron"
				/>
			</NavigationMenuTrigger>

			<NavigationMenuContent>
				<NavigationMenuDropdown
					:items="item.children"
					:width="item.width"
				/>
			</NavigationMenuContent>
		</template>

		<NavigationMenuLink
			v-else
			class="navigation-menu-item__link"
			:href="item.href"
			:target="item.target"
			:rel="item.rel"
		>
			{{ item.label }}
		</NavigationMenuLink>
	</RekaNavigationMenuItem>
</template>

<style scoped lang="scss">
:deep(.navigation-menu-item__trigger),
:deep(.navigation-menu-item__link) {
  display: inline-flex;
  align-items: center;
  transition: color 0.3s ease;
  gap: 10px;

  @media (any-hover: hover) {
    &:hover {
      color: var(--brand, #4149f2);
    }
  }

  &:focus-visible {
    color: var(--brand, #4149f2);
  }

  &[data-state='open'] {
    .navigation-menu-item__chevron {
      transform: rotateX(180deg);
    }
  }

}

.navigation-menu-item__chevron {
  transition: transform 0.7s ease;
}
</style>
