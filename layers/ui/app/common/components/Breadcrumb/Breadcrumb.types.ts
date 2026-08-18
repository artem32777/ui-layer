export interface BreadcrumbItem {
	/** Текст элемента. */
	label: string
	/** Ссылка элемента. Если не передана, элемент рендерится как текущая страница. */
	href?: string
	/** Отмечает элемент как текущую страницу. */
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
