<script setup lang="ts">
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'reka-ui'

// https://reka-ui.com/docs/components/tooltip

export interface TooltipProps {
	/** Текст тултипа. Если нужен конент сложнее строки, можно его передать в слоте */
	text?: string
	/** Позиционирование тултипа */
	side?: 'top' | 'right' | 'bottom' | 'left'
	/** Cостояние тултипа */
	open?: boolean
}

withDefaults(defineProps<TooltipProps>(), {
	side: 'top',
})

defineSlots<{
	/** Элемент, который открывает тултип. */
	default: any
	/** Содержимое тултипа. */
	content?: any
}>()
</script>

<template>
	<TooltipProvider :delay-duration="0">
		<TooltipRoot :default-open="open">
			<TooltipTrigger as-child>
				<slot />
			</TooltipTrigger>
			<TooltipPortal>
				<TooltipContent
					class="tooltip-content"
					:side-offset="5"
					:side="side"
				>
					<slot name="content">
						{{ text }}
					</slot>
					<TooltipArrow class="tooltip-arrow" />
				</TooltipContent>
			</TooltipPortal>
		</TooltipRoot>
	</TooltipProvider>
</template>

<style scoped lang="scss">
:deep(.tooltip-content) {
  z-index: $z-tooltip;
	padding: 6px 10px;
	border-radius: 6px;
	color: var(--white, #ffffff);
	background-color: var(--brand, #4149f2);
	box-shadow: 0 10px 15px -3px color-mix(in srgb, var(--text, #000000) 10%, transparent), 0 4px 6px -4px color-mix(in srgb, var(--text, #000000) 10%, transparent);
  animation: tooltip-fade-in 0.3s ease;
}

:deep(.tooltip-arrow) {
	fill: var(--brand, #4149f2);
}

@keyframes tooltip-fade-in {
	from {opacity: 0;transform: scale(0.98)}
	to {opacity: 1;transform: scale(1)}
}
</style>
