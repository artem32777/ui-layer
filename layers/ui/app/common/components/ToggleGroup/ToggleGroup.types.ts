export interface ToggleGroupItemType {
	/** Текстовая подпись элемента. */
	label: string
	/** Уникальное значение элемента. */
	value: string
	/** Отключает конкретный элемент. */
	disabled?: boolean
}

export interface ToggleGroupProps {
	/** Список элементов группы. */
	items: ToggleGroupItemType[]
	/** Можно выбирать только один или несколько элементов. */
	type?: ToggleGroupType
	/** Отключает всю группу и запрещает выбор. */
	disabled?: boolean
}

export const toggleGroupTypes = ['single', 'multiple'] as const

export type ToggleGroupType = typeof toggleGroupTypes[number]
