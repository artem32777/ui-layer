<script setup lang="ts">
// https://reka-ui.com/docs/components/tooltip
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'reka-ui'

export interface TooltipProps {
	/** Текст тултипа. Если нужен конент сложнее строки, можно его передать в слоте */
	text?: string
}

defineProps<TooltipProps>()

defineSlots<{
	/** Элемент, который открывает тултип. */
	trigger: any

	/** Содержимое тултипа. */
	content?: any
}>()
</script>

<template>
	<TooltipProvider :delay-duration="0">
		<TooltipRoot>
			<TooltipTrigger as-child>
				<slot name="trigger" />
			</TooltipTrigger>
			<TooltipPortal>
				<TooltipContent
					class="ui-tooltip__content"
					:side-offset="5"
				>
					<slot name="content">
						{{ text }}
					</slot>
					<TooltipArrow class="ui-tooltip__arrow" />
				</TooltipContent>
			</TooltipPortal>
		</TooltipRoot>
	</TooltipProvider>
</template>

<style scoped lang="scss">
.ui-tooltip__content {
	padding: 6px 10px;
	border-radius: 6px;
	color: var(--white, #ffffff);
	background-color: var(--brand, #4149f2);
	box-shadow: 0 10px 15px -3px color-mix(in srgb, var(--text, #000000) 10%, transparent), 0 4px 6px -4px color-mix(in srgb, var(--text, #000000) 10%, transparent);
	font-size: 12px;
	animation: ui-tooltip-fade-in 0.3s ease;
	user-select: none;
	z-index: $z-tooltip;
}

.ui-tooltip__arrow {
	fill: var(--brand, #4149f2);
}

@keyframes ui-tooltip-fade-in {
	from {
		opacity: 0;
		transform: scale(0.98);
	}

	to {
		opacity: 1;
		transform: scale(1);
	}
}
</style>
