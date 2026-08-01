<script setup lang="ts">
import { functionalUpdate } from '@tanstack/vue-table'
import type { SortingState } from '@tanstack/vue-table'
import { computed, ref } from 'vue'
import { useApiFetch } from '~/common/composables/useApiFetch'
import DataTable from '../DataTable.vue'
import DataTableFilter from '../DataTableFilter.vue'
import DataTablePagination from '../DataTablePagination.vue'
import DataTableSortButton from '../DataTableSortButton.vue'
import type { DataTableColumn, DataTableOptions } from '../DataTable.types'

interface Product {
	id: string
	name: string
	category: string
	price: number
}

interface ProductsResponse {
	columns: DataTableColumn<Product>[]
	items: Product[]
	pagination: {
		page: number
		pageSize: number
		total: number
	}
}

const page = ref<number>()
const search = ref('')
const sorting = ref<SortingState>([])

const { data, status } = useApiFetch<ProductsResponse>('/products', {
	query: computed(() => ({
		page: page.value,
		search: search.value,
		sort: sorting.value[0]?.id,
		order: sorting.value[0]
			? sorting.value[0].desc ? 'desc' : 'asc'
			: undefined,
	})),
	watch: [page, search, sorting],
})

const options = computed<DataTableOptions<Product>>(() => ({
	getRowId: row => row.id,
	manualFiltering: true,
	manualPagination: true,
	manualSorting: true,
	state: {
		sorting: sorting.value,
	},
	onSortingChange: (updater) => {
		sorting.value = functionalUpdate(updater, sorting.value)
		page.value = undefined
	},
	initialState: {
		pagination: {
			pageIndex: data.value!.pagination.page - 1,
			pageSize: data.value!.pagination.pageSize,
		},
	},
}))
</script>

<template>
	<DataTable
		v-if="data"
		:columns="data.columns"
		:data="data.items"
		:loading="status === 'pending'"
		:options="options"
	>
		<template #toolbar="{ table }">
			<DataTableFilter
				v-model="search"
				:table="table"
				placeholder="Название или категория"
				@update:model-value="page = undefined; table.setPageIndex(0)"
			/>
		</template>

		<template #header="{ column, table }">
			<DataTableSortButton
				:column="column"
				@click="table.setPageIndex(0)"
			>
				{{ column.columnDef.header }}
			</DataTableSortButton>
		</template>

		<template #cell-price="{ value }">
			{{ Number(value).toLocaleString('ru-RU') }} ₽
		</template>

		<template #empty>
			Ничего не найдено
		</template>

		<template #footer="{ table }">
			<DataTablePagination
				:table="table"
				:total-rows="data.pagination.total"
				:loading="status === 'pending'"
				@request="page = $event.page"
			/>
		</template>
	</DataTable>
</template>
