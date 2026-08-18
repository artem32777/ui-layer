export interface NumberFieldProps {
	/** Визуальный вариант */
	variant?: NumberFieldVariant
	/** Размер */
	size?: NumberFieldSize
	/** Начальное значение. */
	defaultValue?: number
	/** Минимальное  значение. */
	min?: number
	/** Максимальное  значение. */
	max?: number
	/** Шаг изменения значения. */
	step?: number
	/** Отключает поле. */
	disabled?: boolean
	/** Отмечает поле как невалидное. */
	invalid?: boolean
}

export const numberFieldVariants = ['primary', 'secondary'] as const
export const numberFieldSizes = ['small', 'medium', 'big'] as const

export type NumberFieldVariant = typeof numberFieldVariants[number]
export type NumberFieldSize = typeof numberFieldSizes[number]
