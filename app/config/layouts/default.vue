<script setup lang="ts">
import Footer from '../layouts-parts/footer/Footer.vue'
import Header from '../layouts-parts/header/Header.vue'
import type { SerializableHead } from 'unhead/types'
import { RequestNames } from '~/config/constants'
import { computed } from 'vue'
import { useRoute } from '~/common/utils/router'
import { useHead } from '#imports'
import { useApiFetch } from '~/common/composables/useApiFetch'

interface PageData {
	seo?: SerializableHead
}

const route = useRoute()

const { data } = await useApiFetch<PageData>('/pages/resolve', {
	key: computed(() => `${RequestNames.CmsPage}:${route.path}`),
	query: computed(() => ({ path: route.path })),
	watch: [() => route.path],
})

useHead(() => data.value?.seo ?? {})
</script>

<template>
	<div class="layout">
		<Header />
		<slot />
		<Footer />
	</div>
</template>

<style scoped lang="scss">
.layout {
	@include dvh(min-height, 100);
	width: 100%;
}
</style>
