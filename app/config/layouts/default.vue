<script setup lang="ts">
import Footer from '../layouts-parts/footer/Footer.vue'
import type { HeaderProps } from '../layouts-parts/header/Header.types'
import Header from '../layouts-parts/header/Header.vue'
import PageBlocks, { type PageBlock } from '~/common/components/page-blocks/PageBlocks.vue'
import type { SerializableHead } from 'unhead/types'
import { RequestNames } from '~/config/constants'
import { computed } from 'vue'
import { useRoute } from '~/common/utils/router'
import { useHead } from '#imports'
import { useApiFetch } from '~/common/composables/useApiFetch'

interface PageData {
	seo?: SerializableHead
	header?: HeaderProps
	footer?: PageBlock
	blocks?: PageBlock[]
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
	<div>
		<Header
			v-if="data?.header"
			:logo-src="data.header.logoSrc"
			:menu-items="data.header.menuItems"
		/>
		<main class="layout">
			<PageBlocks
				v-if="data && data.blocks"
				:blocks="data.blocks"
			/>
			<slot />
		</main>
		<Footer />
	</div>
</template>

<style scoped lang="scss">
.layout {
  @include dvh(min-height, 100);
  width: 100%;
  padding-top: 20px;

  > * {
    max-width: 1900px;
    margin: 0 auto;
  }
}
</style>
