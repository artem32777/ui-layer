<script setup lang="ts" generic="TData, TValue">
import { FlexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table'
import type { Cell, Header, Row } from '@tanstack/vue-table'
import type {
	DataTableCellSlotContext,
	DataTableHeaderSlotContext,
	DataTableProps,
	DataTableSlots,
} from './DataTable.types'

const props = withDefaults(defineProps<DataTableProps<TData, TValue>>(), {
	loading: false,
	emptyText: 'No results.',
})

defineSlots<DataTableSlots<TData>>()

const emit = defineEmits<{
	'row-click': [row: TData, event: MouseEvent]
}>()

const table = useVueTable<TData>({
	...props.options,
	get data() {
		return props.data
	},
	get columns() {
		return props.columns
	},
	getCoreRowModel: props.options?.getCoreRowModel ?? getCoreRowModel(),
	getFilteredRowModel: props.options?.getFilteredRowModel ?? getFilteredRowModel(),
	getPaginationRowModel: props.options?.getPaginationRowModel ?? getPaginationRowModel(),
	getSortedRowModel: props.options?.getSortedRowModel ?? getSortedRowModel(),
})

function getHeaderContext(header: Header<TData, unknown>): DataTableHeaderSlotContext<TData> {
	return { table, header, column: header.column }
}

function getCellContext(cell: Cell<TData, unknown>): DataTableCellSlotContext<TData> {
	return { table, cell, row: cell.row, column: cell.column, value: cell.getValue() }
}

function getAriaSort(header: Header<TData, unknown>) {
	const direction = header.column.getIsSorted()

	if (direction === 'asc') {
		return 'ascending'
	}

	if (direction === 'desc') {
		return 'descending'
	}

	return header.column.getCanSort() ? 'none' : undefined
}

function handleRowClick(row: Row<TData>, event: MouseEvent) {
	emit('row-click', row.original, event)
}

defineExpose({ table })
</script>

<template>
	<div class="ui-data-table">
		<slot
			name="toolbar"
			:table="table"
		/>

		<div class="ui-data-table__container">
			<table class="ui-data-table__table">
				<caption v-if="$slots.caption">
					<slot
						name="caption"
						:table="table"
					/>
				</caption>

				<thead class="ui-data-table__head">
					<tr
						v-for="headerGroup in table.getHeaderGroups()"
						:key="headerGroup.id"
					>
						<th
							v-for="header in headerGroup.headers"
							:key="header.id"
							:colspan="header.colSpan"
							scope="col"
							:aria-sort="getAriaSort(header)"
						>
							<template v-if="!header.isPlaceholder">
								<slot
									:name="`header-${header.column.id}`"
									v-bind="getHeaderContext(header)"
								>
									<slot
										name="header"
										v-bind="getHeaderContext(header)"
									>
										<FlexRender
											:render="header.column.columnDef.header"
											:props="header.getContext()"
										/>
									</slot>
								</slot>
							</template>
						</th>
					</tr>
				</thead>

				<tbody>
					<tr v-if="loading">
						<td
							class="ui-data-table__state"
							:colspan="Math.max(table.getVisibleLeafColumns().length, 1)"
						>
							<slot
								name="loading"
								:table="table"
							>
								Loading...
							</slot>
						</td>
					</tr>

					<template v-else-if="table.getRowModel().rows.length">
						<tr
							v-for="row in table.getRowModel().rows"
							:key="row.id"
							:data-state="row.getIsSelected() ? 'selected' : undefined"
							@click="handleRowClick(row, $event)"
						>
							<td
								v-for="cell in row.getVisibleCells()"
								:key="cell.id"
							>
								<slot
									:name="`cell-${cell.column.id}`"
									v-bind="getCellContext(cell)"
								>
									<slot
										name="cell"
										v-bind="getCellContext(cell)"
									>
										<FlexRender
											:render="cell.column.columnDef.cell"
											:props="cell.getContext()"
										/>
									</slot>
								</slot>
							</td>
						</tr>
					</template>

					<tr v-else>
						<td
							class="ui-data-table__state"
							:colspan="Math.max(table.getVisibleLeafColumns().length, 1)"
						>
							<slot
								name="empty"
								:table="table"
							>
								{{ emptyText }}
							</slot>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<slot
			name="footer"
			:table="table"
		/>
	</div>
</template>

<style scoped lang="scss">
.ui-data-table {
  width: 100%;
}

.ui-data-table__container {
  overflow: auto;
  border: 1px solid var(--grey, #e2e2e2);
  border-radius: 8px;
}

.ui-data-table__table {
  width: 100%;
  border-collapse: collapse;
}

.ui-data-table__head {
  background-color: var(--grey, #e2e2e2);
}

th,
td {
  height: 44px;
  padding: 0 12px;
  text-align: start;
}

th {
  height: 40px;
  color: var(--additional-2, #6b5b72);
  font-weight: 500;
  white-space: nowrap;
}

td {
  color: var(--text, #000000);
}

tr {
  border-bottom: 1px solid var(--grey, #e2e2e2);

  &:last-child {
    border-bottom: 0;
  }

  &[data-state='selected'] {
    background-color: color-mix(in srgb, var(--brand, #4149f2) 8%, transparent);
  }
}

.ui-data-table__state {
  height: 72px;
  color: var(--additional-2, #6b5b72);
  text-align: center;
}
</style>
