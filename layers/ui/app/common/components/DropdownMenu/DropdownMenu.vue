<script setup lang="ts">
import { DropdownMenuContent, DropdownMenuPortal, DropdownMenuRoot, DropdownMenuTrigger } from 'reka-ui'
import DropdownMenuItems from './DropdownMenuItems.vue'
import type { DropdownMenuItem } from './DropdownMenu.types.ts'

interface DropdownMenuProps {
	/** Пункты меню для стандартного отображения через DropdownMenuItems. */
	items?: DropdownMenuItem[]
	/** Расстояние между триггером и выпадающим меню в пикселях. */
	offset?: number
}

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
  border: 1px solid var(--grey, #e2e2e2);
  border-radius: 8px;
  color: var(--text, #000000);
  background: var(--background, #ffffff);
  box-shadow: 0 10px 24px color-mix(in srgb, var(--black, #000000) 12%, transparent);
}
</style>
