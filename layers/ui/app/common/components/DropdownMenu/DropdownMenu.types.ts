export interface DropdownMenuItem {
	/** Текст пункта меню. */
	label: string
	/** Вложенные пункты, которые отображаются в подменю. */
	children?: DropdownMenuItem[]
	/** Отключает пункт меню и запрещает взаимодействие с ним. */
	disabled?: boolean
}
