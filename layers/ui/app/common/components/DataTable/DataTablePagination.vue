<script setup lang="ts" generic="TData">
import type { Table } from '@tanstack/vue-table'
import { computed } from 'vue'
import Pagination from '../Pagination/Pagination.vue'

export interface DataTablePaginationRequest {
	/** Номер страницы для API, начиная с 1. */
	page: number
	/** Индекс страницы TanStack Table, начиная с 0. */
	pageIndex: number
	/** Количество строк на странице. */
	pageSize: number
}

const props = withDefaults(defineProps<{
	/** Экземпляр TanStack Table, доступный в slot props компонента DataTable. */
	table: Table<TData>
	/** Общее количество строк. Для серверной пагинации можно передать явно. */
	totalRows?: number
	/** Скрывает подпись с диапазоном отображаемых строк. */
	hideSummary?: boolean
	/** Блокирует переходы между страницами во время серверного запроса. */
	loading?: boolean
}>(), {
	hideSummary: false,
	loading: false,
})

const emit = defineEmits<{
	/**
	 * Точка подключения серверной загрузки. Вызывается после выбора страницы
	 * и подходит для запроса через `$fetch` или `useFetch`.
	 */
	request: [pagination: DataTablePaginationRequest]
}>()

const pageSize = computed(() => props.table.getState().pagination.pageSize)
const rowCount = computed(() => props.totalRows ?? props.table.getRowCount())
const page = computed({
	get: () => props.table.getState().pagination.pageIndex + 1,
	set: (value: number) => {
		const pageIndex = value - 1

		if (pageIndex === props.table.getState().pagination.pageIndex) {
			return
		}

		props.table.setPageIndex(pageIndex)
		emit('request', {
			page: value,
			pageIndex,
			pageSize: pageSize.value,
		})
	},
})

const firstVisibleRow = computed(() => {
	if (!rowCount.value) {
		return 0
	}

	return props.table.getState().pagination.pageIndex * pageSize.value + 1
})

const lastVisibleRow = computed(() => {
	const visibleRows = props.table.getRowModel().rows.length

	if (!visibleRows) {
		return 0
	}

	return Math.min(firstVisibleRow.value + visibleRows - 1, rowCount.value)
})
</script>

<template>
	<div
		class="ui-data-table-pagination"
		:class="{ 'ui-data-table-pagination--loading': loading }"
		:aria-busy="loading"
	>
		<p
			v-if="!hideSummary"
			class="ui-data-table-pagination__summary"
			aria-live="polite"
		>
			Показано {{ firstVisibleRow }}–{{ lastVisibleRow }} из {{ rowCount }}
		</p>

		<Pagination
			v-model:page="page"
			:total-pages="rowCount"
			:items-per-page="pageSize"
		/>
	</div>
</template>

<style scoped lang="scss">
.ui-data-table-pagination {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	margin-top: 12px;

  @media (max-width:$sm){
    align-items: flex-start;
    flex-direction: column;
  }

  &--loading {
    opacity: 0.6;
    pointer-events: none;
  }
}

.ui-data-table-pagination__summary {
	margin: 0;
	color: var(--additional-2, #6b5b72);
	font-size: 13px;
}
</style>
