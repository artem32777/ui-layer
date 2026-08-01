export interface OverflowNavigationProps<T> {
	/** Пункты навигации в порядке отображения. */
	items: T[]

	/** HTML-тег корневого элемента. */
	tag?: 'div' | 'nav'

	/** Ширина элемента, открывающего скрытые пункты, в пикселях. */
	overflowWidth?: number

	/** Селектор вложенного списка, непосредственные дети которого измеряются. */
	listSelector?: string
}
