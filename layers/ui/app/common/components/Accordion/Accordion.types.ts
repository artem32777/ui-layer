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
	type?: 'single' | 'multiple'
}
