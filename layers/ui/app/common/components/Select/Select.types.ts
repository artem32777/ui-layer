export interface SelectOption {
	/** Текст варианта. */
	label: string
	/** Значение варианта. */
	value: string
	/** Запрещает выбор варианта. */
	disabled?: boolean
	/** Название группы вариантов. */
	group?: string
}
