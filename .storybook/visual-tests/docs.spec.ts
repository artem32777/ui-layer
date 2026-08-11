import { expect, test } from '@playwright/test'

// Для regression-сценария достаточно полей, которые нужны при выборе пары Story + Docs.
interface StorybookIndex {
	entries: Record<string, {
		id: string
		type: 'story' | 'docs'
	}>
}

test('Docs открывается после Canvas без Illegal invocation', async ({
	page,
	request,
}) => {
	// Ошибка проявляется только при клиентском переходе Canvas → Docs.
	// Прямое открытие `iframe.html?viewMode=docs` не воспроизводит конфликт,
	// поэтому тест работает с настоящим manager UI и нажимает ссылку Docs.
	const indexResponse = await request.get('/index.json')
	expect(indexResponse.ok()).toBe(true)

	const { entries } = await indexResponse.json() as StorybookIndex
	// Form.mdx содержит больше всего Canvas-блоков и полностью нагружает Docs runtime.
	const storyWithDocs = Object.values(entries).find(entry => entry.id === 'form-form--field')

	// Если autodocs случайно отключат для всех компонентов, тест должен явно
	// сообщить о проблеме, а не завершиться зелёным без проверки.
	expect(storyWithDocs).toBeDefined()

	const illegalInvocationErrors: string[] = []
	page.on('pageerror', (error) => {
		if (error.message.includes('Illegal invocation')) {
			illegalInvocationErrors.push(error.message)
		}
	})
	page.on('console', (message) => {
		if (
			message.type() === 'error'
			&& message.text().includes('Illegal invocation')
		) {
			illegalInvocationErrors.push(message.text())
		}
	})

	await page.goto(`/?path=/story/${storyWithDocs!.id}`)

	const previewFrame = page.locator('#storybook-preview-iframe')
	await expect(previewFrame).toBeVisible()

	// Нажатие, а не второй `page.goto`, сохраняет тот же preview runtime —
	// именно в нём Storybook успевает установить проблемный focus getter.
	const componentId = storyWithDocs!.id.split('--')[0]
	const docsId = `${componentId}--docs`
	await page.locator(`a[href="/?path=/docs/${docsId}"]`).click()
	await expect(page).toHaveURL(/path=\/docs\//)

	const docsFrame = page.frameLocator('#storybook-preview-iframe')
	await expect(docsFrame.locator('#storybook-docs')).toBeVisible()
	await expect(
		docsFrame.getByText('Illegal invocation', { exact: true }),
	).toHaveCount(0)
	expect(illegalInvocationErrors).toEqual([])
})
