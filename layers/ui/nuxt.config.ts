import { createResolver } from 'nuxt/kit'
import { defineNuxtConfig } from 'nuxt/config'
import { baseNuxtConfig } from '../../nuxt.config.ts'
import { readdirSync } from 'node:fs'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
	...baseNuxtConfig,

	modules: [
		'reka-ui/nuxt',
		resolve('./app/modules/svg-icon/build-icons'),
		'vue-sonner/nuxt',
		'@pinia/nuxt',
		'@vueuse/nuxt',
	],

	css: [resolve('./app/config/styles/index.scss'), 'swiper/css'],

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `${getSharedScssAdditionalData(resolve('../..'))}\n`,
				},
			},
		},
	},

	svgIcons: {
		iconsDir: resolve('./app/modules/svg-icon/icon-source'),
		runtimeIconNamesPath: resolve('./app/modules/svg-icon/runtime/iconNames.ts'),
		rootGroupTitle: 'Корень',
		recursive: true,
	},

	vueSonner: { css: false },
})

export function getSharedScssAdditionalData(rootDir: string) {
	return [
		'layers/ui/app/config/styles/shared',
		'layers/ui/app/common/mixins',
	]
		.flatMap(directory => readdirSync(resolve(rootDir, directory), { withFileTypes: true })
			.filter(file => file.isFile() && file.name.endsWith('.scss'))
			.map(file => `@use "~~/${directory}/${file.name}" as *;`))
		.join('\n')
}
