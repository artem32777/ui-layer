import type { Component } from 'vue'
import type { PageBlock } from '~/common/components/page-blocks/PageBlocks.vue'
import { Visual } from '~/modules/visual'

export const pageBlockRegistry: Record<PageBlock['name'], Component> = {
	visual: Visual,
}
