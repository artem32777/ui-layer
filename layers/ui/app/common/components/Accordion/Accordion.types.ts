export interface AccordionPropsItem {
	/** Триггер айтема. */
	trigger: string
	/** Контент, который показывается внутри раскрытого айтема. рендерится через v-html */
	content: string
}

export interface AccordionProps {
	/** Массив айтемов аккордиона. */
	items: AccordionPropsItem[]
	/** Режим открытия: один айтем или несколько одновременно. */
	type?: AccordionType
	/** Отключает весь аккордеон и запрещает открытие. */
	disabled?: boolean
}

export const accordionTypes = ['single', 'multiple'] as const

export type AccordionType = typeof accordionTypes[number]
