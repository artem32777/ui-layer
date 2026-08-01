import { expect, test } from '@playwright/test'

// Нас интересует только минимальная часть сгенерированного Storybook index.
interface StorybookIndex {
	entries: Record<string, {
		id: string
		type: 'story' | 'docs'
	}>
}

test('visual regression for every story', async ({ page, request }) => {
	// Storybook сам публикует список всех story/docs в index.json.
	// Благодаря этому новые истории автоматически попадают в visual suite.
	const indexResponse = await request.get('/index.json')
	expect(indexResponse.ok()).toBe(true)

	const { entries } = await indexResponse.json() as StorybookIndex
	const stories = Object.values(entries)
		// MDX docs не дублируем: проверяем именно конечные состояния компонентов.
		.filter(entry => entry.type === 'story')
		// Детерминированный порядок упрощает чтение отчёта и поиск flaky story.
		.sort((first, second) => first.id.localeCompare(second.id))

	// Защита от ошибочного glob/config: пустой suite не должен быть зелёным.
	expect(stories.length).toBeGreaterThan(0)

	for (const story of stories) {
		await test.step(story.id, async () => {
			// Прямой iframe URL исключает manager UI из эталонного изображения.
			await page.goto(`/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story`)
			await page.locator('#storybook-root').waitFor({ state: 'attached' })

			// Ждём завершения Storybook render cycle. Portal-компоненты Reka UI
			// могут отрисовать содержимое вне #storybook-root, поэтому учитываем их.
			await page.waitForFunction(() => {
				const root = document.querySelector('#storybook-root')

				return root
					&& !root.hasAttribute('data-rendering')
					&& (root.childElementCount > 0 || document.body.querySelector('[data-reka-popper-content-wrapper]'))
			})

			// Шрифты и изображения должны стабилизироваться до pixel comparison.
			await page.evaluate(async () => {
				await document.fonts.ready
				await Promise.all(
					Array.from(document.images)
						.filter(image => !image.complete)
						.map(image => image.decode().catch(() => undefined)),
				)
			})

			// soft assertion позволяет проверить оставшиеся истории и собрать все
			// diff-файлы за один запуск, даже если одна из картинок изменилась.
			await expect.soft(page).toHaveScreenshot(`${story.id}.png`, {
				// Убираем два частых источника ложных visual diffs.
				animations: 'disabled',
				caret: 'hide',
				// Снимаем весь iframe, включая portal/dialog элементы.
				fullPage: true,
				scale: 'css',
			})
		})
	}
})
