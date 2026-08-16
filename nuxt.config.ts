import type { NuxtConfig } from 'nuxt/schema'
import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineNuxtConfig } from 'nuxt/config'

const sharedScssDirectories = [
	'layers/ui/app/config/styles/shared',
	'layers/ui/app/common/mixins',
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
