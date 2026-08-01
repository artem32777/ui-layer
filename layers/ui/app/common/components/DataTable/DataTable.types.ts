import type {
	Cell,
	ColumnDef,
	Header,
	Row,
	Table,
	TableOptions,
} from '@tanstack/vue-table'

export type DataTableColumn<TData, TValue = unknown> = ColumnDef<TData, TValue>

export type DataTableOptions<TData> = Partial<
	Omit<TableOptions<TData>, 'columns' | 'data'>
>

export interface DataTableProps<TData, TValue = unknown> {
	columns: DataTableColumn<TData, TValue>[]
	data: TData[]
	options?: DataTableOptions<TData>
	loading?: boolean
	emptyText?: string
}

export interface DataTableSlotContext<TData> {
	table: Table<TData>
}

export interface DataTableHeaderSlotContext<TData> extends DataTableSlotContext<TData> {
	header: Header<TData, unknown>
	column: Header<TData, unknown>['column']
}

export interface DataTableCellSlotContext<TData> extends DataTableSlotContext<TData> {
	cell: Cell<TData, unknown>
	row: Row<TData>
	column: Cell<TData, unknown>['column']
	value: unknown
}

export interface DataTableRowSlotContext<TData> extends DataTableSlotContext<TData> {
	row: Row<TData>
}

export type DataTableSlots<TData> = {
	/** Панель над таблицей. Через `table` доступны фильтрация, сортировка и другие методы TanStack Table. */
	toolbar?: (props: DataTableSlotContext<TData>) => any
	/** Подпись таблицы, которая рендерится нативным элементом `caption`. */
	caption?: (props: DataTableSlotContext<TData>) => any
	/** Содержимое заголовков колонок. Для отдельной колонки используйте слот `header-{columnId}`. */
	header?: (props: DataTableHeaderSlotContext<TData>) => any
	/** Содержимое ячеек. Для отдельной колонки используйте слот `cell-{columnId}`. */
	cell?: (props: DataTableCellSlotContext<TData>) => any
	/** Заголовок конкретной колонки. Имя слота формируется как `header-{columnId}`. */
	[name: `header-${string}`]: ((props: DataTableHeaderSlotContext<TData>) => any) | undefined
	/** Ячейка конкретной колонки. Имя слота формируется как `cell-{columnId}`. */
	[name: `cell-${string}`]: ((props: DataTableCellSlotContext<TData>) => any) | undefined
	/** Состояние загрузки вместо строк таблицы. */
	loading?: (props: DataTableSlotContext<TData>) => any
	/** Состояние пустой таблицы или отсутствия результатов. */
	empty?: (props: DataTableSlotContext<TData>) => any
	/** Область под таблицей. Подходит для пагинации и счётчика строк. */
	footer?: (props: DataTableSlotContext<TData>) => any
}
