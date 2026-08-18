export interface InputProps {
	/** Текст-подсказка внутри пустого поля. */
	placeholder?: string
	/** Визуальный вариант поля. */
	variant?: InputVariant
	/** Размер поля ввода. */
	size?: InputSize
	/** Тип input. */
	type?: string
	/** Отключает поле. */
	disabled?: boolean
	/** Отмечает поле как невалидное. */
	invalid?: boolean
}

export const inputVariants = ['primary', 'secondary'] as const
export const inputSizes = ['small', 'medium', 'big'] as const

export type InputVariant = typeof inputVariants[number]
export type InputSize = typeof inputSizes[number]
