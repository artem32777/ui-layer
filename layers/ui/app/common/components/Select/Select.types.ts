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

export interface SelectProps<T> {
	/** Доступные варианты выбора. */
	options: SelectOption[]
	/** Текст, отображаемый до выбора значения. */
	placeholder?: string
	/** Визуальный вариант */
	variant?: 'primary' | 'secondary'
	/** Размер поля выбора. */
	size?: 'small' | 'medium' | 'big'
	/** Разрешает выбрать несколько значений. */
	multiple?: T
	/** Состояние ошибки */
	invalid?: boolean
	/** Недоступное состояние */
	disabled?: boolean
}

export const selectVariants = ['primary', 'secondary'] as const
export const selectSizes = ['small', 'medium', 'big'] as const

export type SelectVariant = typeof selectVariants[number]
export type SelectSize = typeof selectSizes[number]
