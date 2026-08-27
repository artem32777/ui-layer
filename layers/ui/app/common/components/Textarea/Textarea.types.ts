export interface TextareaProps {
	/** Текст-подсказка внутри пустого поля. */
	placeholder?: string
	/** Визуальный вариант поля. */
	variant?: TextareaVariant
	/** Размер поля. */
	size?: TextareaSize
	/** Отключает поле. */
	disabled?: boolean
	/** Отмечает поле как невалидное. */
	invalid?: boolean
}

export const textareaVariants = ['fill'] as const
export const textareaSizes = ['medium', 'big'] as const

export type TextareaVariant = typeof textareaVariants[number]
export type TextareaSize = typeof textareaSizes[number]
