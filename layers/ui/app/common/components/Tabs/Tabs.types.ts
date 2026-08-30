import type { IconName } from '#layers/ui/app/modules/svg-icon'

export interface TabsTitle {
	/** Значение вкладки для v-model и имени слота. */
	value: string
	/** Подпись в TabsList. */
	label: string
	/** Иконка слева от текста. */
	iconLeft?: IconName
	/** Иконка справа от текста. */
	iconRight?: IconName
	/** Иконка без текста. */
	icon?: IconName
}

export interface TabsProps<T extends ReadonlyArray<TabsTitle> = TabsTitle[]> {
	/** Заголовки табов. */
	items: T
	/** Визуальный вариант табов. */
	variant?: TabsVariant
	/** Размер табов. */
	size?: TabsSize
	/** Отступы по бокам. */
	indent?: boolean
}

export const tabsVariants = ['button', 'text'] as const
export const tabsSizes = ['small', 'medium', 'big'] as const

export type TabsVariant = typeof tabsVariants[number]
export type TabsSize = typeof tabsSizes[number]
