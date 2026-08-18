<script setup lang="ts">
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'reka-ui'
import type { TooltipProps } from './Tooltip.types.ts'

// https://reka-ui.com/docs/components/tooltip

withDefaults(defineProps<TooltipProps>(), {
	side: 'top',
	align: 'center',
	offset: 10,
})

defineSlots<{
	/** Обязательный элемент или строка, которые открывают тултип. */
	default: any
	/** Содержимое тултипа (вместо prop `text`) */
	content?: any
}>()

const isOpenModel = defineModel<boolean>()
</script>

<template>
	<TooltipProvider :delay-duration="0">
		<TooltipRoot v-model:open="isOpenModel">
			<TooltipTrigger as="span">
				<slot />
			</TooltipTrigger>
			<TooltipPortal>
				<TooltipContent
					:side="side"
					:align="align"
					:side-offset="offset"
					class="tooltip-content"
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
