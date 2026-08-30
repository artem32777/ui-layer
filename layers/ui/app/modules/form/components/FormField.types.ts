export interface FormFieldProps {
	/** Имя поля в форме. */
	name: string
	/** Текст лейбла над полем. */
	label?: string
	/** Подсказка под полем. */
	hint?: string
}

export const formFieldArgTypes = {
	label: { control: 'text' },
	hint: { control: 'text' },
} as const
