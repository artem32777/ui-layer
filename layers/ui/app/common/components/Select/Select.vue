<script setup lang="ts" generic="T extends boolean = false">
import { computed } from 'vue'
import type { SelectOption } from './Select.types'
import SelectMenu from './SelectMenu.vue'
import SelectTrigger from './SelectTrigger.vue'

// https://reka-ui.com/docs/components/select

export interface SelectProps<T extends boolean = false> {
	/** Доступные варианты выбора. */
	options: SelectOption[]
	/** Текст, отображаемый до выбора значения. */
	placeholder?: string
	/** Визуальный вариант поля выбора. */
	variant?: 'base' | 'secondary'
	/** Размер поля выбора. */
	size?: 'sm' | 'md' | 'lg'
	/** Разрешает выбрать несколько значений. */
	multiple?: T
	/** Включает визуальное состояние ошибки. */
	invalid?: boolean
	/** Запрещает взаимодействие с компонентом. */
	disabled?: boolean
}

const props = withDefaults(defineProps<SelectProps<T>>(), {
	variant: 'base',
	size: 'md',
})

type ModelValue = T extends true ? string[] : string
const modelValue = defineModel<ModelValue>()

const selectedLabels = computed(() => (Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value])
	.flatMap(value => props.options.find(option => option.value === value)?.label ?? []))
</script>

<template>
	<SelectRoot
		v-model="modelValue"
		:multiple="multiple"
		:disabled="disabled"
	>
		<SelectTrigger
			:placeholder="placeholder || 'Выберите'"
			:selected-labels="selectedLabels"
			:multiple="multiple"
			:invalid="invalid"
			:variant="variant"
			:size="size"
		/>
		<ClientOnly>
			<SelectMenu :options="options" />
		</ClientOnly>
	</SelectRoot>
</template>
