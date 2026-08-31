<script setup lang="ts">
import { DropdownMenuItem as RekaDropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from 'reka-ui'
import DropdownMenuItem from './DropdownMenuItem.vue'
import type { DropdownMenuItem as DropdownMenuItemType } from './DropdownMenu.types'

const props = withDefaults(defineProps<{
	/** Пункты меню, включая вложенные подменю. */
	items: DropdownMenuItemType[]
	/** Закрывать меню после клика по пункту. */
	closeOnSelect?: boolean
}>(), {
	closeOnSelect: true,
})

const emit = defineEmits<{
	/** Вызывается при клике по пункту меню. */
	select: [item: DropdownMenuItemType, event: Event]
}>()

function onSelect(item: DropdownMenuItemType, event: Event) {
	if (!props.closeOnSelect) {
		event.preventDefault()
	}

	emit('select', item, event)
}
</script>

<template>
	<template
		v-for="(item, index) in items"
		:key="item.value"
	>
		<div
			v-if="item.group && item.group !== items[index - 1]?.group"
			class="dropdown-menu__group-label"
		>
			{{ item.group }}
		</div>

		<DropdownMenuSub v-if="item.children">
			<DropdownMenuSubTrigger
				class="dropdown-menu__item"
				:disabled="item.disabled"
			>
				<DropdownMenuItem :item="item" />
			</DropdownMenuSubTrigger>

			<DropdownMenuPortal>
				<DropdownMenuSubContent
					class="sub-dropdown-menu"
					:side-offset="6"
				>
					<DropdownMenuItems
						:items="item.children"
						:close-on-select="closeOnSelect"
						@select="onSelect"
					/>
				</DropdownMenuSubContent>
			</DropdownMenuPortal>
		</DropdownMenuSub>

		<RekaDropdownMenuItem
			v-else
			class="dropdown-menu__item"
			:disabled="item.disabled"
			@select="onSelect(item, $event)"
		>
			<DropdownMenuItem :item="item" />
		</RekaDropdownMenuItem>

		<div
			v-if="item.group && items[index + 1] && item.group !== items[index + 1]?.group"
			class="dropdown-menu__separator"
		/>
	</template>
</template>

<style lang="scss" scoped>
.dropdown-menu__item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  @include font-size(button);
  color: inherit;
  text-align: left;
  user-select: none;
  cursor: pointer;

  &[data-highlighted] {
    background-color: var(--bg-action-item-hover);
    outline: none;
  }

  &[data-disabled] {
    color: var(--text-on-surface-tertiary);
    pointer-events: none;
  }
}

.dropdown-menu__group-label {
  padding: 8px 10px;
  color: var(--text-on-surface-tertiary);
  @include font-size(label);
}

.dropdown-menu__separator {
  height: 1px;
  margin: 8px 10px;
  background-color: var(--border-neutral);
}

:deep(.sub-dropdown-menu) {
  z-index: $z-dropdown;
  min-width: 200px;
  padding: 4px;
  border: 1px solid var(--neutral-500, #e2e2e2);
  border-radius: 8px;
  color: var(--text, #000000);
  background: var(--background, #ffffff);
  box-shadow: 0 10px 24px color-mix(in srgb, var(--neutral-950, #000000) 12%, transparent);
}
</style>
