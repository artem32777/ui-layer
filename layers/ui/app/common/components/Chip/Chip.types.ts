export interface ChipProps {
	/** Тип чипа: переключатель, дропдаун или с кнопкой закрытия. */
	type?: ChipType
	/** Текст. Если не передан, используется default-слот. */
	text?: string
	/** Отключает чип. */
	disabled?: boolean
}

export const chipTypes = ['toggle', 'dropdown', 'dismissible'] as const

export type ChipType = typeof chipTypes[number]
