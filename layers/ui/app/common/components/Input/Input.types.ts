import type { IconName } from '#layers/ui/app/modules/svg-icon'

export interface InputProps {
	/** Текст-подсказка внутри пустого поля. */
	placeholder?: string
	/** Визуальный вариант поля. */
	variant?: InputVariant
	/** Размер поля ввода. */
	size?: InputSize
	/** Тип input. */
	type?: string
	/** Иконка слева от текста. */
	icon?: IconName
	/** Отключает поле. */
	disabled?: boolean
	/** Отмечает поле как невалидное. */
	invalid?: boolean
}

export const inputVariants = ['fill'] as const
export const inputSizes = ['medium', 'big'] as const

export type InputVariant = typeof inputVariants[number]
export type InputSize = typeof inputSizes[number]
