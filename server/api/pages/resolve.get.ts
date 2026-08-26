import { createError, defineEventHandler, getQuery } from 'h3'
import { headerMock } from '../../mocks/header'
import { pageMocks } from '../../mocks/pages'

export default defineEventHandler(event => {
	const path = getQuery(event).path
	const normalizedPath = typeof path === 'string'
		? path.replace(/\/+$/, '') || '/'
		: '/'
	const page = pageMocks[normalizedPath as keyof typeof pageMocks]

	if (!page) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Not Found',
			message: 'Страница не найдена',
		})
	}

	return {
		...page,
		header: headerMock,
		seo: {
			htmlAttrs: {
				class: 'radius-3',
			},
		},
	}
})
