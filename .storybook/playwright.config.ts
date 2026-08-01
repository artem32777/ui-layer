import { resolve } from 'node:path'
import { defineConfig } from '@playwright/test'

// Команда webServer должна выполняться из package root, хотя сам конфиг
// теперь хранится рядом с остальной Storybook-инфраструктурой.
const projectRoot = resolve(import.meta.dirname, '..')
const visualTestPort = 6007
const visualTestUrl = `http://127.0.0.1:${visualTestPort}`

export default defineConfig({
	// Тест и PNG-эталоны лежат рядом в `.storybook/visual-tests`.
	testDir: './visual-tests',
	// Временные trace, diff и actual screenshots не коммитятся.
	outputDir: './test-results',

	// Один тест последовательно обходит Storybook index. Параллельный запуск
	// здесь не ускорит обход, зато может создать лишнюю нагрузку на dev server.
	fullyParallel: false,
	reporter: 'list',

	// Полный обход 100+ историй может быть заметно дольше обычного UI-теста.
	timeout: 10 * 60 * 1000,
	expect: {
		// Отдельный лимит на ожидание стабильного screenshot каждого story.
		timeout: 15_000,
	},
	use: {
		// Все относительные URL в тесте разрешаются относительно Storybook.
		baseURL: visualTestUrl,
		// Фиксированные locale/theme/viewport делают изображения воспроизводимыми.
		colorScheme: 'light',
		locale: 'ru-RU',
		viewport: {
			width: 1280,
			height: 720,
		},
	},
	webServer: {
		// Playwright сам поднимает отдельный Storybook перед тестом.
		command: 'npx storybook dev --ci --no-open -p 6007',
		cwd: projectRoot,
		// Готовность проверяем по story index, а не только по открытому TCP-порту.
		url: `${visualTestUrl}/index.json`,
		// Каждый запуск должен владеть своим Storybook-процессом и завершать его
		// только после окончания всех Playwright workers. Переиспользование сервера
		// здесь опасно: оставшийся после прерванного запуска процесс может исчезнуть
		// во время обхода stories и дать ERR_CONNECTION_REFUSED вместо visual diff.
		reuseExistingServer: false,
		timeout: 120_000,
	},
})
