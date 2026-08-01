<script setup lang="ts">
import DataTable from '../../../common/components/DataTable/DataTable.vue'
import type { DataTableColumn } from '../../../common/components/DataTable/DataTable.types'
import UiKitDemo from './UiKitDemo.vue'
import UiKitSection from './UiKitSection.vue'

interface Payment {
	id: string
	status: string
	email: string
	amount: number
}

const dataTableColumns: DataTableColumn<Payment>[] = [
	{ accessorKey: 'status', header: 'Status', enableSorting: true },
	{ accessorKey: 'email', header: 'Email', enableSorting: true },
	{
		accessorKey: 'amount',
		header: 'Amount',
		enableSorting: true,
		meta: { align: 'end' },
	},
]
const dataTableRows: Payment[] = [
	{ id: '1', status: 'Success', email: 'm@example.com', amount: 316 },
	{ id: '2', status: 'Processing', email: 'a@example.com', amount: 242 },
	{ id: '3', status: 'Failed', email: 'b@example.com', amount: 837 },
	{ id: '4', status: 'Success', email: 'c@example.com', amount: 721 },
]
</script>

<template>
	<UiKitSection title="Data Table">
		<UiKitDemo
			label="Filter and sortable columns"
			wide
		>
			<DataTable
				:columns="dataTableColumns"
				:data="dataTableRows"
			>
				<template #toolbar="{ table }">
					<div class="data-table-demo__toolbar">
						{{ table.getRowModel().rows.length }} rows
					</div>
				</template>
				<template #cell-amount="{ value }">
					{{ Number(value).toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					}) }}
				</template>
			</DataTable>
		</UiKitDemo>
	</UiKitSection>
</template>

<style scoped lang="scss">
.data-table-demo__toolbar {
	margin-bottom: 12px;
	color: var(--additional-2);
	font-size: 13px;
}
</style>
