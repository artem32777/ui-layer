import type { IconName } from '#layers/ui/app/modules/svg-icon'
import type { ThemeNames } from '#layers/ui/app/config/theme.ts'

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
	/** Цветовая тема. */
	theme?: ThemeNames
}

export const buttonVariants = ['primary', 'secondary', 'accent', 'on-media'] as const
export const buttonSizes = ['small', 'medium', 'big', 'link'] as const

export type ButtonVariant = typeof buttonVariants[number]
export type ButtonSize = typeof buttonSizes[number]
