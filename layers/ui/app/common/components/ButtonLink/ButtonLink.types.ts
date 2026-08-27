import type { IconName } from '#layers/ui/app/modules/svg-icon'
import type { ThemeNames } from '#layers/ui/app/config/theme.ts'

export interface ButtonLinkProps {
	/** Визуальная вариация. */
	variant?: ButtonLinkVariant
	/** Размер. */
	size?: ButtonLinkSize
	/** Текст ссылки. Если не передан, используется default-слот. */
	text?: string
	/** URL ссылки. */
	href?: string
	/** Иконка слева от текста. */
	iconLeft?: IconName
	/** Иконка справа от текста. */
	iconRight?: IconName
	/** Отключает ссылку. */
	disabled?: boolean
	/** Цветовая тема. */
	theme?: ThemeNames
}

export const buttonLinkVariants = ['dark', 'on-media', 'accent'] as const
export const buttonLinkSizes = ['medium', 'big'] as const

export type ButtonLinkVariant = typeof buttonLinkVariants[number]
export type ButtonLinkSize = typeof buttonLinkSizes[number]
