import type { SerializableHead } from 'unhead/types'

export interface PageDocument {
	id: string
	path: string
	template: string
	revision: number
	seo?: SerializableHead
	blocks: {
		name: string
		settings: Record<string, unknown>[]
		content: Record<string, unknown>[]
	}[]
}
