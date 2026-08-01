<script setup lang="ts">
import { pageBlockRegistry } from './PageBlockRegistry'

export interface PageBlock {
	name: string
	settings: Record<string, any>[]
	content: Record<string, any>[]
}

defineProps<{
	blocks: PageBlock[]
}>()
</script>

<template>
	<template v-if="blocks">
		<component
			:is="pageBlockRegistry[block.name]"
			v-for="block in blocks"
			:key="block.name"
			:settings="block.settings"
			:content="block.content"
		/>
	</template>
</template>

<style scoped lang="scss">

</style>
