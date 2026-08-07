<script setup lang="ts">
import { ContextMenuItem as RekaContextMenuItem, ContextMenuPortal, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger } from 'reka-ui'
import SvgIcon from '#layers/ui/app/modules/svg-icon/components/SvgIcon.vue'
import { iconNames } from '#layers/ui/app/modules/svg-icon/runtime/iconNames'
import type { ContextMenuItem } from './ContextMenu.types'

defineProps<{
	/** Пункты контекстного меню, включая вложенные подменю. */
	items: ContextMenuItem[]
}>()
</script>

<template>
	<template
		v-for="(item, index) in items"
		:key="index"
	>
		<ContextMenuSub v-if="item.children">
			<ContextMenuSubTrigger
				class="context-menu__item context-menu__sub-trigger"
				:disabled="item.disabled"
			>
				{{ item.label }}
				<SvgIcon
					:name="iconNames.chevronRight"
					class="context-menu__sub-arrow"
				/>
			</ContextMenuSubTrigger>

			<ContextMenuPortal>
				<ContextMenuSubContent
					class="context-menu__sub-content"
					:side-offset="6"
				>
					<ContextMenuItems :items="item.children" />
				</ContextMenuSubContent>
			</ContextMenuPortal>
		</ContextMenuSub>

		<RekaContextMenuItem
			v-else
			class="context-menu__item"
			:disabled="item.disabled"
		>
			{{ item.label }}
		</RekaContextMenuItem>
	</template>
</template>

<style scoped lang="scss">
.context-menu__item {
	display: flex;
	align-items: center;
	min-height: 36px;
	padding: 8px 10px;
	border-radius: 6px;
	white-space: nowrap;
	cursor: pointer;

	&[data-highlighted] {
		background: color-mix(in srgb, var(--grey, #e2e2e2) 55%, transparent);
		outline: none;
	}

	&[data-disabled] {
		opacity: 0.45;
		pointer-events: none;
	}
}

.context-menu__sub-trigger {
	justify-content: space-between;
}

.context-menu__sub-arrow {
	margin-left: 16px;
}

:deep(.context-menu__sub-content) {
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
