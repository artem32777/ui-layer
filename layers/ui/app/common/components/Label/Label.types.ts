export interface LabelProps {
	/** Визуальная вариация. */
	variant?: LabelVariant
	/** Размер. */
	size?: LabelSize
	/** Текст. Если не передан, используется default-слот. */
	text?: string
}

export const labelVariants = ['primary', 'secondary', 'accent'] as const
export const labelSizes = ['small', 'medium'] as const

export type LabelVariant = typeof labelVariants[number]
export type LabelSize = typeof labelSizes[number]
