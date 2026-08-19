<script setup lang="ts">
import { ContextMenuContent, ContextMenuPortal, ContextMenuRoot, ContextMenuTrigger } from 'reka-ui'
import ContextMenuItems from './ContextMenuItems.vue'
import type { ContextMenuItem } from './ContextMenu.types'

// https://reka-ui.com/docs/components/context-menu

interface ContextMenuProps {
	/** Пункты меню для стандартного отображения через ContextMenuItems. */
	items?: ContextMenuItem[]
}

defineProps<ContextMenuProps>()

defineSlots<{
	/** Элемент или область, по правому клику или долгому нажатию на которую открывается меню. */
	default: () => any
	/** Содержимое меню. Если не используется, то отображаются пункты из prop `items`. */
	content?: () => any
}>()
</script>

<template>
	<ContextMenuRoot :press-open-delay="700">
		<ContextMenuTrigger as-child>
			<slot />
		</ContextMenuTrigger>

		<ContextMenuPortal>
			<ContextMenuContent class="context-menu__content">
				<slot name="content">
					<ContextMenuItems
						v-if="items"
						:items="items"
					/>
				</slot>
			</ContextMenuContent>
		</ContextMenuPortal>
	</ContextMenuRoot>
</template>

<style scoped lang="scss">
:deep(.context-menu__content) {
  z-index: $z-dropdown;
	min-width: 200px;
	max-height: var(--reka-context-menu-content-available-height);
	padding: 4px;
	overflow-y: auto;
	border: 1px solid var(--neutral-500, #e2e2e2);
	border-radius: 8px;
	color: var(--text, #000000);
	background: var(--background, #ffffff);
	box-shadow: 0 10px 24px color-mix(in srgb, var(--neutral-950, #000000) 12%, transparent);
}
</style>
