<script setup lang="ts">
import { DropdownMenuContent, DropdownMenuPortal, DropdownMenuRoot, DropdownMenuTrigger } from 'reka-ui'
import DropdownMenuItems from './DropdownMenuItems.vue'
import type { DropdownMenuItem, DropdownMenuProps } from './DropdownMenu.types.ts'

withDefaults(defineProps<DropdownMenuProps>(), {
	offset: 6,
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
				:side-offset="offset"
			>
				<slot name="content">
					<DropdownMenuItems
						v-if="items"
						:items="items"
						@click="onClick"
					/>
				</slot>
			</DropdownMenuContent>
		</DropdownMenuPortal>
	</DropdownMenuRoot>
</template>

<style lang="scss" scoped>
:deep([data-reka-menu-content]) {
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
