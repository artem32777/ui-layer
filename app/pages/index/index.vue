<script setup lang="ts">
import SvgIcon from '#layers/ui/app/modules/svg-icon/components/SvgIcon.vue'
import Accordion, { type AccordionPropsItem } from '#layers/ui/app/common/components/Accordion/Accordion.vue'
import PageBlocks from '../../common/components/page-blocks/PageBlocks.vue'

const items: AccordionPropsItem[] = [
	{
		trigger: '1',
		content: '2',
	},
	{
		trigger: '3',
		content: '4',
	},
]
</script>

<template>
	<div>
		<SvgIcon name="download" />

		<Accordion :items="items" />
	</div>
</template>

<style scoped lang="scss">
.test {
  @include font-size(h2);
}
</style>
