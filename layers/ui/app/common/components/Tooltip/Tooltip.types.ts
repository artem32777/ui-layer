export interface TooltipProps {
	/** Текст тултипа. Если нужен конент сложнее строки, можно его передать в слоте */
	text?: string
	/** Где появляется тултип */
	side?: TooltipSide
	/** Положение стрелки-указателя */
	align?: TooltipAlign
	/** Отступ от триггера до тултипа */
	offset?: number
}

export const tooltipSides = ['top', 'right', 'bottom', 'left'] as const
export const tooltipAligns = ['start', 'center', 'end'] as const

export type TooltipSide = typeof tooltipSides[number]
export type TooltipAlign = typeof tooltipAligns[number]
