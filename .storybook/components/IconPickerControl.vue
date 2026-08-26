<script setup lang="ts">
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import Popover from '#layers/ui/app/common/components/Popover/Popover.vue'
import type { IconName } from '#layers/ui/app/modules/svg-icon'
import IconPicker from './IconPicker.vue'

withDefaults(defineProps<{
	/** Текст кнопки-триггера. */
	text: string
	/** С какой стороны показывать выбранную иконку на триггере. */
	side?: 'left' | 'right'
}>(), {
	side: 'left',
})

const modelValue = defineModel<IconName>()
</script>

<template>
	<Popover>
		<Button
			:text="text"
			variant="secondary"
			:icon-left="side === 'left' ? modelValue : undefined"
			:icon-right="side === 'right' ? modelValue : undefined"
		/>

		<template #content="{ close }">
			<IconPicker
				:model-value="modelValue"
				@update:model-value="modelValue = $event; close()"
			/>
		</template>
	</Popover>
</template>
