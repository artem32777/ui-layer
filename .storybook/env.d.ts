// Позволяет TypeScript проверять side-effect imports глобальных SCSS-файлов
// в preview.ts. Фактическую обработку стилей выполняют Vite и Sass.
declare module '*.scss'

// Vite умеет импортировать файл как строку через `?raw`, но TypeScript
// требует отдельную декларацию для такого module specifier.
declare module '*.scss?raw' {
	const source: string
	export default source
}
