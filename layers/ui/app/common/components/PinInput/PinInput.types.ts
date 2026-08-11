export interface PinInputProps<T extends 'text' | 'number' = 'text'> {
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
	/** Отображает состояние ошибки. */
	invalid?: boolean
	/** Отключает поля и запрещает ввод. */
	disabled?: boolean
}
