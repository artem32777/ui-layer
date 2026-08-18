export interface ToggleProps {
	/** Визуальный вариант. */
	variant?: ToggleVariant
	/** Размер. */
	size?: ToggleSize
	/** Отключает переключатель и запрещает взаимодействие. */
	disabled?: boolean
}

export const toggleVariants = ['primary', 'outline'] as const
export const toggleSizes = ['small', 'medium', 'big'] as const

export type ToggleVariant = typeof toggleVariants[number]
export type ToggleSize = typeof toggleSizes[number]
