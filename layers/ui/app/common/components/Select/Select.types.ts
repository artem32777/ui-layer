import type { IconName } from '#layers/ui/app/modules/svg-icon'
import type { DropdownMenuItem } from '#layers/ui/app/common/components/DropdownMenu/DropdownMenu.types.ts'

export type SelectOption = DropdownMenuItem

export interface SelectProps {
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
	multiple?: boolean
	/** Состояние ошибки. */
	invalid?: boolean
	/** Недоступное состояние. */
	disabled?: boolean
}

/** `string[]` при `multiple`, иначе `string`. */
export type SelectModelValue<Multiple extends SelectProps['multiple'] = false> = Multiple extends true ? string[] : string

export const selectVariants = ['fill'] as const
export const selectSizes = ['medium', 'big'] as const

export type SelectVariant = typeof selectVariants[number]
export type SelectSize = typeof selectSizes[number]
