// Получает строковые варианты выбранного свойства.
// Например, для свойства variant?: 'base' | 'outline' вернёт тип 'base' | 'outline'.
type StringsFromKey<Args extends object, Key extends keyof Args> = Extract<NonNullable<Args[Key]>, string>

// Создаёт массив допустимых значений свойства и проверяет, что в нём перечислены
// все строковые варианты этого свойства.
//
// Пример:
// type Args = { variant?: 'base' | 'outline' }
// const getOptions = getStringsArrFromKey<Args>()
// getOptions('variant', ['base', 'outline']) // корректно
// getOptions('variant', ['base']) // ошибка: отсутствует 'outline'

export const getStringsArrFromKey = <Args extends object>() =>
	<Key extends keyof Args, const Options extends StringsFromKey<Args, Key>[]>(
		// По ключу TypeScript определяет, значения какого свойства нужно проверить.
		// Сам ключ внутри функции не используется.
		_key: Key,
		// Аргумент станет never, если в массиве нет хотя бы одного строкового варианта свойства.
		options: Exclude<StringsFromKey<Args, Key>, Options[number]> extends never ? Options : never,
	) => options
