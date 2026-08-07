import type { SerializableHead } from 'unhead/types'
import type { HeaderProps } from '~/config/layouts-parts/header/Header.vue'

export interface PageDocument {
	id: string
	path: string
	template: string
	revision: number
	seo?: SerializableHead
	header?: HeaderProps
	blocks: {
		name: string
		settings: Record<string, unknown>[]
		content: Record<string, unknown>[]
	}[]
}
