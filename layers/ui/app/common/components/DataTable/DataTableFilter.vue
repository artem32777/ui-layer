<script setup lang="ts" generic="TData">
import type { Table } from '@tanstack/vue-table'
import { useId, watch } from 'vue'
import Input from '../Input/Input.vue'

const props = withDefaults(defineProps<{
	/** Экземпляр TanStack Table, доступный в slot props компонента DataTable. */
	table: Table<TData>
	/** Видимая подпись поля поиска. */
	label?: string
	/** Подсказка внутри поля поиска. */
	placeholder?: string
}>(), {
	label: 'Поиск',
	placeholder: 'Поиск по таблице',
})

/** Значение глобального фильтра таблицы. */
const modelValue = defineModel<string>({ default: '' })
const inputId = useId()

watch(modelValue, (value) => {
	props.table.setGlobalFilter(value)
}, { immediate: true })
</script>

<template>
	<label
		class="ui-data-table-filter"
		:for="inputId"
	>
		<span class="ui-data-table-filter__label">
			{{ label }}
		</span>
		<Input
			:id="inputId"
			v-model="modelValue"
			class="ui-data-table-filter__input"
			type="search"
			size="sm"
			:placeholder="placeholder"
		/>
	</label>
</template>

<style scoped lang="scss">
.ui-data-table-filter {
	display: grid;
	gap: 6px;
	width: min(100%, 360px);
	margin-bottom: 12px;
}

.ui-data-table-filter__label {
	color: var(--additional-2, #6b5b72);
	font-size: 13px;
	font-weight: 500;
}

.ui-data-table-filter__input {
	max-width: none;
}
</style>
