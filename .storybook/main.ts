import type { StorybookConfig } from '@storybook/vue3-vite'
import { readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { getBreakpointViewports } from './breakpoints.ts'

// Storybook запускается из корня проекта, но сам конфиг лежит в `.storybook`.
// Абсолютные пути ниже не зависят от текущей рабочей директории процесса.
const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const appDir = resolve(rootDir, 'app')
const uiLayerDir = resolve(rootDir, 'layers/ui')

const config: StorybookConfig = {
	// Подключаем как обычные CSF-истории, так и написанную вручную MDX-документацию.
	stories: [
		'../app/**/*.stories.@(js|jsx|mjs|ts|tsx)',
		'../layers/ui/app/common/components/**/*.mdx',
		'../layers/ui/app/common/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
	],
	// docs — MDX/Autodocs, a11y — axe-проверки, vitest — запуск play-функций
	// и accessibility-тестов из интерфейса Storybook.
	addons: [
		'@storybook/addon-docs',
		'@storybook/addon-a11y',
		'@storybook/addon-vitest',
	],
	framework: {
		name: '@storybook/vue3-vite',
		options: {},
	},
	// Файлы из Nuxt `public` становятся доступны историям от корня URL.
	staticDirs: ['../public'],
	viteFinal: async (viteConfig) => {
		viteConfig.define = {
			...viteConfig.define,
			__STORYBOOK_BREAKPOINT_VIEWPORTS__: JSON.stringify(
				getBreakpointViewports(
					resolve(rootDir, 'app/config/styles/shared/breakpoints.scss'),
				),
			),
		}

		// Storybook 10 + Vite 8 в этом проекте не добавляют Vue SFC transform
		// для файлов слоя автоматически, поэтому регистрируем plugin-vue явно.
		viteConfig.plugins = [
			...(viteConfig.plugins ?? []),
			vue(),
		]

		viteConfig.resolve ??= {}
		viteConfig.resolve.alias = {
			'~/common/composables/useApiFetch': resolve(rootDir, '.storybook/use-api-fetch.ts'),
			...(viteConfig.resolve.alias as Record<string, string> ?? {}),
			// В Storybook нет Nuxt runtime, поэтому `#imports` ведёт на небольшой
			// browser-only адаптер из `.storybook/nuxt-imports.ts`.
			'#imports': resolve(rootDir, '.storybook/nuxt-imports.ts'),
			// Повторяем Nuxt aliases, используемые компонентами UI-слоя.
			'#layers/ui': uiLayerDir,
			'@': appDir,
			'~': appDir,
			'@@': rootDir,
			'~~': rootDir,
		}

		// Scoped SCSS компонентов использует общие переменные и mixins без
		// локальных @use. Передаём те же зависимости, что и `nuxt.config.ts`.
		viteConfig.css ??= {}
		viteConfig.css.preprocessorOptions ??= {}
		viteConfig.css.preprocessorOptions.scss = {
			...viteConfig.css.preprocessorOptions.scss,
			additionalData: `${getSharedScssAdditionalData()}\n`,
		}

		return viteConfig
	},
}

export default config

/**
 * Формирует общий SCSS-пролог для каждого `<style lang="scss">`.
 * Список директорий синхронизирован с `getSharedScssAdditionalData`
 * в корневом `nuxt.config.ts`.
 */
function getSharedScssAdditionalData() {
	const directories = [
		'app/config/styles/shared',
		'app/common/mixins',
	]

	return directories
		.flatMap(directory => readdirSync(resolve(rootDir, directory), { withFileTypes: true })
			.filter(file => file.isFile() && file.name.endsWith('.scss'))
			.map(file => `@use "~~/${directory}/${file.name}" as *;`))
		.join('\n')
}
