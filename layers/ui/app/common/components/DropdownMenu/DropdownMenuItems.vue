<script setup lang="ts">
import { DropdownMenuItem as RekaDropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from 'reka-ui'
import SvgIcon from '#layers/ui/app/modules/svg-icon/components/SvgIcon.vue'
import { iconNames } from '#layers/ui/app/modules/svg-icon/runtime/iconNames'
import type { DropdownMenuItem } from './DropdownMenu.types'

defineProps<{
	/** Пункты меню, включая вложенные подменю. */
	items: DropdownMenuItem[]
}>()
</script>

<template>
	<template
		v-for="(item, index) in items"
		:key="index"
	>
		<DropdownMenuSub v-if="item.children">
			<DropdownMenuSubTrigger
				class="dropdown-menu__item dropdown-menu__sub-trigger"
				:disabled="item.disabled"
			>
				{{ item.label }}
				<SvgIcon
					:name="iconNames.chevronRight"
					class="dropdown-menu__sub-arrow"
				/>
			</DropdownMenuSubTrigger>

			<DropdownMenuPortal>
				<DropdownMenuSubContent
					class="sub-dropdown-menu"
					:side-offset="6"
				>
					<DropdownMenuItems :items="item.children" />
				</DropdownMenuSubContent>
			</DropdownMenuPortal>
		</DropdownMenuSub>

		<RekaDropdownMenuItem
			v-else
			class="dropdown-menu__item"
			:disabled="item.disabled"
		>
			{{ item.label }}
		</RekaDropdownMenuItem>
	</template>
</template>

<style lang="scss" scoped>
.dropdown-menu__item {
  display: flex;
  align-items: center;
  min-height: 36px;
  padding: 8px 10px;
  border-radius: 6px;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;

  &[data-highlighted] {
    background: color-mix(in srgb, var(--grey, #e2e2e2) 55%, transparent);
    outline: var(--brand);
  }

  &[data-disabled] {
    opacity: 0.45;
    pointer-events: none;
  }
}

.dropdown-menu__sub-trigger {
  justify-content: space-between;
}

.dropdown-menu__sub-arrow {
  margin-left: 16px;
}

:deep(.sub-dropdown-menu) {
  z-index: $z-dropdown;
  min-width: 200px;
  padding: 4px;
  border: 1px solid var(--grey, #e2e2e2);
  border-radius: 8px;
  color: var(--text, #000000);
  background: var(--background, #ffffff);
  box-shadow: 0 10px 24px color-mix(in srgb, var(--black, #000000) 12%, transparent);
}
</style>
