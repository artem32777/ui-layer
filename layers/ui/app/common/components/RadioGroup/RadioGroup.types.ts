import type { ThemeNames } from '#layers/ui/app/config/theme.ts'

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
	/** Отключает всю группу и запрещает выбор. */
	disabled?: boolean
	/** Показывает состояние ошибки для всей группы. */
	invalid?: boolean
	/** Цветовая тема. */
	theme?: ThemeNames
}
