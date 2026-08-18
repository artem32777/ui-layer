export interface BreadcrumbItem {
	label: string
	href?: string
	current?: boolean
}

export interface BreadcrumbsProps {
	/** Массив элементов хлебных крошек. */
	items: BreadcrumbItem[]
	/** Сворачивает промежуточные элементы в многоточие. */
	collapsed?: boolean
	/** Символ разделителя между элементами. */
	separator?: string
}
