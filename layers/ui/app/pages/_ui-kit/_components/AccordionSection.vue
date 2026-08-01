<script setup lang="ts">
import { ref } from 'vue'
import Accordion from '../../../common/components/Accordion/Accordion.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitSection from './UiKitSection.vue'

const accordionValue = ref('Is it accessible?')
const accordionItems = [
	{
		trigger: 'Is it accessible?',
		content: 'Yes. It adheres to the WAI-ARIA design pattern used by the primitive.',
	},
	{
		trigger: 'Is it unstyled?',
		content: 'Yes. The wrapper adds the visual CSS layer while Reka keeps behavior accessible.',
	},
	{
		trigger: 'Can it animate?',
		content: 'Yes. The content uses CSS variables exposed by Reka UI for height animations.',
	},
]
</script>

<template>
	<UiKitSection title="Accordion">
		<UiKitDemo label="Single">
			<Accordion
				v-model="accordionValue"
				:items="accordionItems"
				type="single"
			/>
		</UiKitDemo>
	</UiKitSection>
</template>
