import type { StorybookConfig } from '@storybook/vue3-vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { getSharedScssAdditionalData } from '../layers/ui/nuxt.config.ts'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const appDir = resolve(rootDir, 'app')
const uiLayerDir = resolve(rootDir, 'layers/ui')

const config: StorybookConfig = {
	stories: [
		'../layers/ui/app/**/*.mdx',
		'../{app,layers/ui/app}/**/*.stories.@(js|jsx|mjs|ts|tsx)',
	],
	addons: [
		'@storybook/addon-docs',
		'@storybook/addon-a11y',
		'@storybook/addon-vitest',
	],
	framework: {
		name: '@storybook/vue3-vite',
		options: {},
	},
	staticDirs: ['../public'],
	viteFinal: async (viteConfig) => {
		viteConfig.plugins = [
			...(viteConfig.plugins ?? []),
			vue(),
		]

		viteConfig.resolve ??= {}
		viteConfig.resolve.alias = {
			'~/common/composables/useApiFetch': resolve(rootDir, '.storybook/use-api-fetch.ts'),
			...(viteConfig.resolve.alias as Record<string, string> ?? {}),
			// В Storybook нет Nuxt runtime, поэтому `#imports` ведёт на небольшой browser-only адаптер из `.storybook/nuxt-imports.ts`.
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
			additionalData: `${getSharedScssAdditionalData(rootDir)}\n`,
		}

		return viteConfig
	},
}

export default config
