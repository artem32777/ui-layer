import { resolve } from 'node:path'
import { playwright } from '@vitest/browser-playwright'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { defineConfig } from 'vitest/config'

// Конфиг находится непосредственно в Storybook config directory.
// resolve здесь оставлен явным, чтобы путь одинаково работал в CLI и UI addon.
const storybookConfigDir = resolve(import.meta.dirname)

export default defineConfig({
	test: {
		// Отдельный project не смешивает story-тесты с будущими unit-тестами
		// приложения, которые можно будет добавить вторым проектом.
		projects: [
			{
				extends: true,
				plugins: [
					// Превращает каждую CSF story в Vitest test:
					// render smoke-test + play-функция + подключённый a11y addon.
					storybookTest({
						configDir: storybookConfigDir,
						// Используется только в watch/debug режиме для ссылок
						// из ошибки Vitest обратно в интерактивный Storybook.
						storybookScript: 'npm run storybook -- --no-open',
					}),
				],
				test: {
					// Имя используется командой `vitest --project=storybook`.
					name: 'storybook',
					browser: {
						// Компоненты проверяются в настоящем Chromium, не в jsdom.
						enabled: true,
						provider: playwright({}),
						headless: true,
						instances: [{ browser: 'chromium' }],
						api: {
							// Явный IPv4 устраняет localhost/IPv6 connection refused
							// на Windows. Доступ остаётся только локальным.
							host: '127.0.0.1',
							// Storybook test addon использует browser API для
							// запуска тестов и сохранения test artifacts.
							allowExec: true,
							allowWrite: true,
						},
					},
				},
			},
		],
	},
})
