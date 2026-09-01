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

const subTriggers = new Map<string, HTMLElement>()
const subAnchors = new Map<string, { getBoundingClientRect: () => DOMRect, contextElement?: Element }>()

function setSubTrigger(value: string, el: { $el?: unknown } | Element | null) {
	const node = el && typeof el === 'object' && '$el' in el ? el.$el : el
	if (node instanceof HTMLElement)
		subTriggers.set(value, node)
	else
		subTriggers.delete(value)
}

function getSubmenuAnchor(value: string) {
	const existing = subAnchors.get(value)
	if (existing)
		return existing

	const anchor = {
		get contextElement() {
			return subTriggers.get(value)
		},
		getBoundingClientRect() {
			const trigger = subTriggers.get(value)
			if (!trigger)
				return new DOMRect()

			const menu = trigger.closest('[data-reka-menu-content]')
			const triggerRect = trigger.getBoundingClientRect()
			if (!(menu instanceof HTMLElement))
				return triggerRect

			const menuRect = menu.getBoundingClientRect()
			return new DOMRect(menuRect.x, triggerRect.y, menuRect.width, triggerRect.height)
		},
	}

	subAnchors.set(value, anchor)
	return anchor
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

		<DropdownMenuSub
			v-if="item.children"
		>
			<DropdownMenuSubTrigger
				:disabled="item.disabled"
				as-child
			>
				<DropdownMenuItem
					:ref="(el) => setSubTrigger(item.value, el)"
					:item="item"
				/>
			</DropdownMenuSubTrigger>

			<DropdownMenuPortal>
				<DropdownMenuSubContent
					class="sub-dropdown-menu"
					:side-offset="8"
					:reference="getSubmenuAnchor(item.value)"
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
			as-child
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
  //z-index: $z-dropdown;
  //min-width: 200px;
  //padding: 4px;
  //border: 1px solid var(--neutral-500, #e2e2e2);
  //border-radius: 8px;
  //color: var(--text, #000000);
  background: var(--background, #ffffff);
  box-shadow: 0 10px 24px color-mix(in srgb, var(--neutral-950, #000000) 12%, transparent);
}
</style>
