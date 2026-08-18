export interface PinInputProps<T extends PinInputType = 'text'> {
	/** Количество полей для ввода. */
	length?: number
	/** Символ-заполнитель для пустых полей. */
	placeholder?: string
	/** Скрывает введённые символы. */
	mask?: boolean
	/** Включает автозаполнение одноразового кода на мобильных устройствах. */
	otp?: boolean
	/** Ограничивает ввод текстом или цифрами. */
	type?: T
	/** Отключает поле. */
	disabled?: boolean
	/** Отмечает поле как невалидное. */
	invalid?: boolean
}

export const pinInputTypes = ['text', 'number'] as const

export type PinInputType = typeof pinInputTypes[number]
