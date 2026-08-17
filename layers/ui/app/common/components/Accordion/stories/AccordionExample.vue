<script setup lang="ts">
import Accordion from '../Accordion.vue'
import type { AccordionPropsItem } from '#layers/ui/app/common/components/Accordion/Accordion.types.ts'

const items: AccordionPropsItem[] = [
	{
		trigger: 'Триггер аккордиона',
		content: 'Контент аккордиона',
	},
	{
		trigger: 'Доставка',
		content: 'Курьерская доставка доступна по городу и ближайшим районам.',
	},
]
</script>

<template>
	<Accordion :items="items" />
</template>
