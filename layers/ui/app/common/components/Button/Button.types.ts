import type { IconName } from '#layers/ui/app/modules/svg-icon'

export interface ButtonProps {
	/** Визуальная вариация. */
	variant?: ButtonVariant
	/** Размер. */
	size?: ButtonSize
	/** Текст кнопки. Если не передан, используется default-слот. */
	text?: string
	/** Поведение кнопки. */
	type?: 'button' | 'submit' | 'reset'
	/** Иконка слева от текста. */
	iconLeft?: IconName
	/** Иконка справа от текста. */
	iconRight?: IconName
	/** Отключает кнопку. */
	disabled?: boolean
}

export const buttonVariants = ['primary', 'secondary', 'accent', 'white'] as const
export const buttonSizes = ['small', 'medium', 'big'] as const

export type ButtonVariant = typeof buttonVariants[number]
export type ButtonSize = typeof buttonSizes[number]
