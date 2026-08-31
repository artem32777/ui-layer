import type { IconName } from '#layers/ui/app/modules/svg-icon'

export interface DropdownMenuProps {
	/** Пункты меню для стандартного отображения через DropdownMenuItems. */
	items?: DropdownMenuItem[]
	/** Расстояние между триггером и выпадающим меню в пикселях. */
	offset?: number
	/** Ширина меню равна ширине триггера. */
	matchTrigger?: boolean
	/** Закрывать меню после клика по пункту. */
	closeOnSelect?: boolean
}

export interface DropdownMenuItem {
	/** Текст пункта меню. */
	label: string
	/** Значение пункта. */
	value: string
	/** Вариант отображения пункта. */
	variant?: DropdownMenuItemVariant
	/** Пункт выбран. */
	selected?: boolean
	/** Название группы пунктов. */
	group?: string
	/** Описание под текстом пункта. */
	description?: string
	/** Иконка слева от текста пункта. */
	icon?: IconName
	/** Вложенные пункты, которые отображаются в подменю. */
	children?: DropdownMenuItem[]
	/** Отключает пункт меню и запрещает взаимодействие с ним. */
	disabled?: boolean
}

export const dropdownMenuItemVariants = ['simple', 'icon', 'checkbox', 'radio', 'switch'] as const
export type DropdownMenuItemVariant = typeof dropdownMenuItemVariants[number]
