/** Допустимое значение атрибута `target` для ссылки меню. */
export type NavigationMenuLinkTarget = '_blank' | '_self' | '_parent' | '_top'

/** Конечная ссылка навигационного меню. */
export interface NavigationMenuLinkItem {
	/** Отображаемый текст ссылки. */
	label: string

	/** Адрес перехода. */
	href: string

	/** Значение HTML-атрибута `target`. */
	target?: NavigationMenuLinkTarget

	/** Значение HTML-атрибута `rel`. */
	rel?: string
}

/** Пункт, открывающий следующий уровень меню. */
export interface NavigationMenuGroupItem {
	/** Отображаемый текст кнопки, открывающей вложенную панель. */
	label: string

	/** Пункты следующего уровня. Вложенность не ограничена. */
	children: NavigationMenuItem[]

	/** Минимальная ширина открываемой панели в пикселях. По умолчанию — 150. */
	width?: number
}

/** Пункт любого уровня: ссылка или группа со следующим уровнем. */
export type NavigationMenuItem = NavigationMenuLinkItem | NavigationMenuGroupItem

export interface NavigationMenuProps {
	/** Рекурсивное дерево ссылок и групп навигационного меню. */
	items: NavigationMenuItem[]
}

/** Проверяет, является ли пункт раскрывающейся группой. */
export function isNavigationMenuGroup(
	item: NavigationMenuItem,
): item is NavigationMenuGroupItem {
	return 'children' in item
}

/** Возвращает безопасное стабильное значение из содержимого пункта. */
export function getNavigationMenuItemValue(
	item: Pick<NavigationMenuItem, 'label'> & { href?: string },
) {
	const source = item.href ? `${item.label}-${item.href}` : item.label

	return `navigation-menu-${encodeURIComponent(source)}`
}
