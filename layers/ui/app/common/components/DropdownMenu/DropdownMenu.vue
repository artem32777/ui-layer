<script setup lang="ts">
import { DropdownMenuContent, DropdownMenuPortal, DropdownMenuRoot, DropdownMenuTrigger } from 'reka-ui'
import DropdownMenuItems from './DropdownMenuItems.vue'
import type { DropdownMenuItem } from './DropdownMenu.types.ts'
import ScrollArea from '#layers/ui/app/common/components/ScrollArea/ScrollArea.vue'

withDefaults(defineProps<{
	/** Пункты меню для стандартного отображения через DropdownMenuItems. */
	items?: DropdownMenuItem[]
	/** Расстояние между триггером и выпадающим меню в пикселях. */
	offset?: number
	/** Ширина меню равна ширине триггера. */
	matchTrigger?: boolean
	/** Закрывать меню после клика по пункту. */
	closeOnSelect?: boolean
}>(), {
	offset: 6,
	closeOnSelect: true,
	matchTrigger: false,
})

defineSlots<{
	/** Элемент, по клику на который открывается меню. */
	default: () => any
	/** Содержимое меню. По умолчанию отображает пункты из prop `items`. */
	content?: () => any
}>()

const modelValue = defineModel<boolean>({ default: false })

const emit = defineEmits<{
	/** Вызывается при клике по пункту меню. */
	onItemClick: [item: DropdownMenuItem, event: Event]
}>()

function onClick(item: DropdownMenuItem, event: Event) {
	emit('onItemClick', item, event)
}
</script>

<template>
	<DropdownMenuRoot v-model:open="modelValue">
		<DropdownMenuTrigger as-child>
			<slot />
		</DropdownMenuTrigger>

		<DropdownMenuPortal>
			<DropdownMenuContent
				align="start"
				class="dropdown-menu-content"
				:class="{ 'dropdown-menu-content--match-trigger': matchTrigger }"
				:side-offset="offset"
			>
				<slot name="content">
					<ScrollArea
						orientation="vertical"
						class="dropdown-menu-content__scroll-area"
					>
						<DropdownMenuItems
							v-if="items"
							:items="items"
							:close-on-select="closeOnSelect"
							@select="onClick"
						/>
					</ScrollArea>
				</slot>
			</DropdownMenuContent>
		</DropdownMenuPortal>
	</DropdownMenuRoot>
</template>

<style lang="scss" scoped>
:deep([data-reka-menu-content]) {
  z-index: $z-dropdown;
  min-width: 100px;
  padding: 8px;
  border: 1px solid var(--neutral-500, #e2e2e2);
  border-radius: 8px;
  color: var(--text, #000000);
  background: var(--background, #ffffff);
  box-shadow: 0 10px 24px color-mix(in srgb, var(--neutral-950, #000000) 12%, transparent);

  &.dropdown-menu-content--match-trigger {
    width: var(--reka-dropdown-menu-trigger-width);
  }
}

.dropdown-menu-content__scroll-area {
  max-height: 311px;
}
</style>
