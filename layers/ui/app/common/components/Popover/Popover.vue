<script setup lang="ts">
import { PopoverArrow, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'

// https://reka-ui.com/docs/components/popover

interface PopoverProps {
	/** Расстояние между триггером и содержимым поповера в пикселях. */
	offset?: number
	/** Предпочтительная сторона открытия. При нехватке места меняется на противоположную. */
	side?: 'top' | 'bottom'
}

withDefaults(defineProps<PopoverProps>(), {
	offset: 6,
	side: 'bottom',
})

defineSlots<{
	/** Элемент, по клику на который открывается поповер. */
	default: () => any
	/** Содержимое поповера. */
	content: (props: { close: () => void }) => any
}>()

const modelValue = defineModel<boolean>({ default: false })
</script>

<template>
	<PopoverRoot
		v-slot="{ close }"
		v-model:open="modelValue"
	>
		<PopoverTrigger as-child>
			<slot />
		</PopoverTrigger>

		<PopoverPortal>
			<PopoverContent
				class="popover__content"
				align="start"
				:side="side"
				:side-offset="offset"
			>
				<slot
					name="content"
					:close="close"
				/>
				<PopoverArrow
					class="popover__arrow"
					:height="8"
					:width="16"
				/>
			</PopoverContent>
		</PopoverPortal>
	</PopoverRoot>
</template>

<style scoped lang="scss">
:deep(.popover__content) {
	min-width: 200px;
	padding: 16px;
	border-radius: 8px;
	color: var(--text, #000000);
	background: var(--background, #ffffff);
	border: 1px solid color-mix(in srgb, var(--neutral-950, #000000) 15%, transparent);
	animation: popover-fade-in 0.2s ease;
	z-index: $z-dropdown;
}

:deep(.popover__arrow) {
	fill: var(--background, #ffffff);
	transform: translateY(-1px);
	filter: drop-shadow(0 1px 0 color-mix(in srgb, var(--neutral-950, #000000) 15%, transparent));
}

@keyframes popover-fade-in {
	from {opacity: 0;transform: scale(0.90)}
	to {opacity: 1;transform: scale(1)}
}
</style>
