export const RequestNames = {
	CmsPage: 'cms-page',
} as const

export type RequestKeyType = typeof RequestNames[keyof typeof RequestNames]
