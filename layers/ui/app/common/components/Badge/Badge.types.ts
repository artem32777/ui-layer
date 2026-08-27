export interface BadgeProps {
	/** Визуальная вариация. */
	variant?: BadgeVariant
	/** Размер. */
	size?: BadgeSize
	/** Текст. Если не передан, используется default-слот. */
	text?: string
}

export const badgeVariants = ['primary', 'secondary', 'accent'] as const
export const badgeSizes = ['medium', 'big'] as const

export type BadgeVariant = typeof badgeVariants[number]
export type BadgeSize = typeof badgeSizes[number]
