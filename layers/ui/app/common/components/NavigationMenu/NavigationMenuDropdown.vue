<script setup lang="ts">
import { ref } from 'vue'
import {
	NavigationMenuContent,
	NavigationMenuItem as RekaNavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuSub,
	NavigationMenuTrigger,
	NavigationMenuViewport,
} from 'reka-ui'
import {
	getNavigationMenuItemValue,
	isNavigationMenuGroup,
	type NavigationMenuDropdownProps,
} from './NavigationMenu.types.ts'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'

withDefaults(defineProps<NavigationMenuDropdownProps>(), {
	width: 150,
})

const currentItem = ref('')
</script>

<template>
	<NavigationMenuSub
		v-model="currentItem"
		:style="{ minWidth: `${width}px` }"
		@pointerleave="currentItem = ''"
	>
		<NavigationMenuList class="navigation-menu-dropdown__list">
			<RekaNavigationMenuItem
				v-for="item in items"
				:key="getNavigationMenuItemValue(item)"
				:value="isNavigationMenuGroup(item) ? getNavigationMenuItemValue(item) : undefined"
			>
				<template v-if="isNavigationMenuGroup(item)">
					<NavigationMenuTrigger class="navigation-menu-dropdown-item__trigger">
						{{ item.label }}
						<Icon
							:name="iconNames.chevronRight"
							class="navigation-menu-dropdown-item__arrow"
						/>
					</NavigationMenuTrigger>

					<NavigationMenuContent class="navigation-menu-dropdown-item__content">
						<NavigationMenuDropdown
							:items="item.children"
							:width="item.width"
						/>
					</NavigationMenuContent>
				</template>

				<NavigationMenuLink
					v-else
					class="navigation-menu-dropdown-item__link"
					:href="item.href"
					:target="item.target"
					:rel="item.rel"
					@pointerenter="currentItem = ''"
					@focus="currentItem = ''"
				>
					{{ item.label }}
				</NavigationMenuLink>
			</RekaNavigationMenuItem>
		</NavigationMenuList>

		<NavigationMenuViewport
			align="start"
			class="navigation-menu-dropdown__viewport"
		/>
	</NavigationMenuSub>
</template>

<style scoped lang="scss">
:deep(.navigation-menu-dropdown__list) {
	padding: 8px;
	border-radius: 8px;
	background: var(--background, #ffffff);
	box-shadow: 0 16px 40px color-mix(in srgb, var(--black, #000000) 14%, transparent);
}

:deep(.navigation-menu-dropdown-item__trigger),
:deep(.navigation-menu-dropdown-item__link) {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 12px 16px;
	border-radius: 8px;
	color: var(--text, #000000);
	transition: color 0.3s ease, background-color 0.3s ease;
  white-space: nowrap;

  &:hover,
  &:focus-visible,
  &[data-state='open'] {
    background: color-mix(in srgb, var(--grey, #e2e2e2) 35%, var(--background, #ffffff));
    color: var(--brand, #4149f2);
  }

  &[data-state='open'] {
    .navigation-menu-dropdown-item__arrow {
      transform: translateX(2px);
    }
  }
}

.navigation-menu-dropdown-item__arrow {
  transition: transform 0.3s ease;
  margin-left: 16px;
}

:deep(.navigation-menu-dropdown-item__content) {
	position: absolute;
}

:deep(.navigation-menu-dropdown__viewport) {
	position: absolute;
	top: var(--reka-navigation-menu-viewport-top, 0);
	left: calc(100% + 8px);
	width: var(--reka-navigation-menu-viewport-width);
	height: var(--reka-navigation-menu-viewport-height);
	opacity: 0;
	transform: translateY(8px);
	transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease, transform 0.3s ease;

  &[data-state='open'] {
    opacity: 1;
    transform: translateY(0);
    animation: navigation-submenu-enter 0.3s ease;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 100%;
      width: 8px;
      height: 100%;
    }
  }
}

@keyframes navigation-submenu-enter {
	from {opacity: 0; transform: translateY(8px)}
}

@keyframes navigation-submenu-exit {
	to {opacity: 0; transform: translateY(8px)}
}
</style>
