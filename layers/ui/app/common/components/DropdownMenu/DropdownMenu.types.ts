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
