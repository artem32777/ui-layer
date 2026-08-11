<script setup lang="ts" generic="T extends boolean = false">
// @ts-nocheck
import { computed, useId } from 'vue'
import Select from '#layers/ui/app/common/components/Select/Select.vue'
import type { SelectOption } from '#layers/ui/app/common/components/Select/Select.types.ts'

export interface PremisesFilterSelectItem {
	id: number
	value: number
	title: string
	checked: boolean
	disabled: boolean
}

export interface PremisesFilterSelectProps<T extends boolean = boolean> {
	type: 'select'
	category: string
	placeholder: string
	multiselect: T
	resetLabel: string
	items: PremisesFilterSelectItem[]
	disabled?: boolean
}

export type PremisesFilterSelectValue<T extends boolean> = T extends true
	? number[]
	: number | undefined

const props = defineProps<PremisesFilterSelectProps<T>>()

const model = defineModel<PremisesFilterSelectValue<T>>({ required: true })
const options = computed<SelectOption[]>(() => props.items.map(item => ({
	label: item.title,
	value: String(item.value),
	disabled: item.disabled,
})))

const selectModel = computed({
	get: () => Array.isArray(model.value)
		? model.value.map(String)
		: model.value === undefined ? undefined : String(model.value),
	set: (value: string | string[] | undefined) => {
		model.value = (Array.isArray(value)
			? value.map(Number)
			: value === undefined ? undefined : Number(value)) as PremisesFilterSelectValue<T>
	},
})
const id = useId()
</script>

<template>
	<div
		class="premises-filter-select"
		role="group"
		:aria-labelledby="id"
	>
		<span
			:id="id"
			class="premises-filter-select__label"
		>
			{{ placeholder }}
		</span>
		<div class="premises-filter-select__control">
			<Select
				v-model="selectModel"
				:options="options"
				:disabled="disabled"
				:multiple="multiselect"
				:placeholder="resetLabel"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
.premises-filter-select {
	display: flex;
	flex-direction: column;
	min-width: 0;
	gap: 4px;
}

.premises-filter-select__label {
	font-size: 14px;
	line-height: 1.5;
	opacity: 0.7;
}

.premises-filter-select__control {
	min-width: 0;

	:deep(.ui-select) {
		min-width: 0;
	}
}
</style>
