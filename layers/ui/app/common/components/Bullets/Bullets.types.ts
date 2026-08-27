export interface BulletsProps {
	/** Количество буллетов. */
	bulletsLength: number
	/** Визуальный вариант активного буллета. */
	variant?: BulletsVariant
	/** Размер. */
	size?: BulletsSize
}

export const bulletsVariants = ['long', 'circle'] as const
export const bulletsSizes = ['medium', 'big'] as const

export type BulletsVariant = typeof bulletsVariants[number]
export type BulletsSize = typeof bulletsSizes[number]
