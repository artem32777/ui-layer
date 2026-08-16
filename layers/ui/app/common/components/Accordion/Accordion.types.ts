export interface AccordionPropsItem {
	/** Триггер айтема. */
	trigger: string
	/** Контент, который показывается внутри раскрытого айтема. рендерится через v-html */
	content: string
}
