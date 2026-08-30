export interface ChipProps {
	/** Тип чипа: переключатель, дропдаун или с кнопкой закрытия. */
	type?: ChipType
	/** Размер. */
	size?: ChipSize
	/** Текст. Если не передан, используется default-слот. */
	text?: string
	/** Отключает чип. */
	disabled?: boolean
}

export const chipTypes = ['toggle', 'dropdown', 'dismissible'] as const
export const chipSizes = ['small', 'medium'] as const

export type ChipType = typeof chipTypes[number]
export type ChipSize = typeof chipSizes[number]
