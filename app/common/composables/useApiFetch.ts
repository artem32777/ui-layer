import { createUseFetch, useNuxtApp } from '#imports'

export const useApiFetch = createUseFetch(options => ({
	watch: false,
	...options,
	$fetch: useNuxtApp().$api as typeof $fetch,
}))
