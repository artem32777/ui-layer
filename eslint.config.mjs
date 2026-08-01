// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
	{
		rules: {
			'vue/multi-word-component-names': 0,
			'vue/no-v-html': 0,
			'vue/no-multiple-template-root': 0,
			'@stylistic/arrow-parens': 0,
			'@typescript-eslint/ban-ts-comment': 0,
			'@typescript-eslint/no-namespace': 0,
			'@typescript-eslint/no-explicit-any': 0,
			'no-restricted-imports': [
				'error',
				{
					paths: [
						{
							name: '#imports',
							importNames: [
								'navigateTo',
								'useRoute',
								'useRouter',
							],
							message: 'Используй типизированный роутер из ~/common/utils/router',
						},
						{
							name: '#app',
							importNames: [
								'navigateTo',
								'useRoute',
								'useRouter',
							],
							message: 'Используй типизированный роутер из ~/common/utils/router',
						},
					],
				},
			],
		},
	},
)
