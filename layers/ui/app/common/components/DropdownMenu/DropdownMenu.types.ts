export interface DropdownMenuItem {
	/** Текст пункта меню. */
	label: string
	/** Действие при клике */
	onClick?: () => unknown
	/** Вложенные пункты, которые отображаются в подменю. */
	children?: DropdownMenuItem[]
	/** Отключает пункт меню и запрещает взаимодействие с ним. */
	disabled?: boolean
}

export interface DropdownMenuProps {
	/** Пункты меню для стандартного отображения через DropdownMenuItems. */
	items?: DropdownMenuItem[]
	/** Расстояние между триггером и выпадающим меню в пикселях. */
	offset?: number
}
