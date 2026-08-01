<script setup lang="ts">
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

const query = ref('')
const { data, status } = useApiFetch<ProductsResponse>('/products')

const options = computed<DataTableOptions<Product>>(() => ({
	getRowId: row => row.id,
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
				v-model="query"
				:table="table"
				placeholder="Название или категория"
			/>
		</template>

		<template #header="{ column }">
			<DataTableSortButton :column="column">
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
			<DataTablePagination :table="table" />
		</template>
	</DataTable>
</template>
