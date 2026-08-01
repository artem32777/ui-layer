export interface RadioOption {
	/** Текстовая подпись рядом с радиокнопкой. */
	label: string
	/** Уникальное значение варианта. */
	value: string
	/** Отключает конкретный вариант и запрещает его выбор. */
	disabled?: boolean
}

export interface RadioGroupProps {
	/** Список вариантов выбора. */
	options: RadioOption[]
	/** Показывает состояние ошибки для всей группы. */
	invalid?: boolean
}
