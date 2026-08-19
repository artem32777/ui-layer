export interface PaginationProps {
	/** Общее количество элементов в списке. */
	totalPages?: number
	/** Количество элементов на одной странице. */
	itemsPerPage?: number
	/** Отключает пагинацию и запрещает навигацию. */
	disabled?: boolean
}
