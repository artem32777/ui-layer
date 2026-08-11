import { resolve } from 'node:path'
import { playwright } from '@vitest/browser-playwright'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		projects: [
			{
				extends: true,
				plugins: [
					storybookTest({
						configDir: resolve(import.meta.dirname, '.storybook'),
						storybookScript: 'npm run storybook -- --no-open',
					}),
				],
				test: {
					name: 'storybook',
					browser: {
						enabled: true,
						provider: playwright({}),
						headless: true,
						instances: [{ browser: 'chromium' }],
						api: {
							host: '127.0.0.1',
						},
					},
				},
			},
		],
	},
})
