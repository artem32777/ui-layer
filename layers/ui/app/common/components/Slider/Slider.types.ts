export interface SliderProps {
	/** Суффикс / единица измерения. */
	additionalText?: string
	/** Количество ползунков: диапазон или одно значение. */
	variant?: SliderVariant
	/** Размер. */
	size?: SliderSize
	/** Минимальное значение шкалы. */
	min?: number
	/** Максимальное значение шкалы. */
	max?: number
	/** Шаг изменения. */
	step?: number
	/** Показывать процент от шкалы в варианте `one-point`. */
	percent?: boolean
	/** Отключает слайдер. */
	disabled?: boolean
	/** Отмечает поле как невалидное. */
	invalid?: boolean
}

export interface MultiSliderProps {
	/** Минимальное значение шкалы. */
	min?: number
	/** Максимальное значение шкалы. */
	max?: number
	/** Шаг изменения. */
	step?: number
	/** Отключает слайдер. */
	disabled?: boolean
}

export const sliderVariants = ['two-points', 'one-point'] as const
export const sliderSizes = ['medium', 'big'] as const

export type SliderVariant = typeof sliderVariants[number]
export type SliderSize = typeof sliderSizes[number]
