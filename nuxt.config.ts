import type { NuxtConfig } from 'nuxt/schema'
import { readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'

const rootDir = dirname(fileURLToPath(import.meta.url))
const sharedScssDirectories = [
	'app/config/styles/shared',
	'app/common/mixins',
]

// https://nuxt.com/docs/api/configuration/nuxt-config
export const baseNuxtConfig = {
	dir: {
		layouts: 'config/layouts',
		middleware: 'config/middleware',
		plugins: 'config/plugins',
	},

	components: false,

	imports: {
		autoImport: false,
		scan: false,
	},

	pages: {
		pattern: [
			'**/*.vue',
			'!**/_components/**',
			'!**/_sections/**',
			...(process.env.NODE_ENV === 'production' ? ['!**/_*.vue', '!**/_*/**'] : []),
		],
	},
} satisfies NuxtConfig

export default defineNuxtConfig({
	...baseNuxtConfig,

	modules: [
		'@nuxt/eslint',
		// '@nuxt/hints',
		'@nuxtjs/device',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'nuxt-typed-router',
		'vue-sonner/nuxt',
	],

	devtools: { enabled: true },

	runtimeConfig: {
		public: {
			API_URL: '',
		},
	},

	css: ['@/config/styles/index.scss'],

	compatibilityDate: '2026-07-27',

	nitro: {
		routeRules: {
			'/': { prerender: true },
			// '/api/*': { cache: { maxAge: 60 * 60 } },
		},
	},

	typescript: {
		typeCheck: true,
	},

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `${getSharedScssAdditionalData(rootDir)}\n`,
				},
			},
		},
	},

	eslint: {
		config: {
			typescript: true,
			stylistic: {
				indent: 'tab',
				semi: false,
				quotes: 'single',
				commaDangle: 'always-multiline',
				braceStyle: '1tbs',
			},
		},
	},
})

export function getSharedScssAdditionalData(rootDir: string) {
	return sharedScssDirectories
		.flatMap(directory => readdirSync(resolve(rootDir, directory), { withFileTypes: true })
			.filter(file => file.isFile() && file.name.endsWith('.scss'))
			.map(file => `@use "~~/${directory}/${file.name}" as *;`))
		.join('\n')
}
