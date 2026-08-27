import type { IconName } from '#layers/ui/app/modules/svg-icon'

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
	/** Визуальный вариант. */
	variant?: SelectVariant
	/** Размер поля выбора. */
	size?: SelectSize
	/** Иконка слева от текста. */
	icon?: IconName
	/** Разрешает выбрать несколько значений. */
	multiple?: T
	/** Состояние ошибки. */
	invalid?: boolean
	/** Недоступное состояние. */
	disabled?: boolean
}

export const selectVariants = ['fill'] as const
export const selectSizes = ['medium', 'big'] as const

export type SelectVariant = typeof selectVariants[number]
export type SelectSize = typeof selectSizes[number]
