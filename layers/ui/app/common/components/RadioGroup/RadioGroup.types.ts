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
	/** Состояние. */
	state?: 'default' | 'hovered' | 'focused' | 'invalid' | 'disabled'
	/** Показывает состояние ошибки для всей группы. */
	invalid?: boolean
	/** Отключает всю группу и запрещает выбор. */
	disabled?: boolean
}
