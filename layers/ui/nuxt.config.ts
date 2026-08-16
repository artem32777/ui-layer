import { createResolver } from 'nuxt/kit'
import { baseNuxtConfig, getSharedScssAdditionalData } from '../../nuxt.config.ts'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
	...baseNuxtConfig,

	modules: [
		'reka-ui/nuxt',
		resolve('./app/modules/svg-icon/build-icons'),
		'vue-sonner/nuxt',
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
