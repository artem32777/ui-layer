export interface TabsTitle {
	/** Значение вкладки для v-model и имени слота. */
	value: string
	/** Подпись в TabsList. */
	label: string
}

export interface TabsProps {
	/** Визуальный вариант табов. */
	variant?: TabsVariant
	/** Размер табов. */
	size?: TabsSize
}

export const tabsVariants = ['button', 'text'] as const
export const tabsSizes = ['medium', 'big'] as const

export type TabsVariant = typeof tabsVariants[number]
export type TabsSize = typeof tabsSizes[number]
