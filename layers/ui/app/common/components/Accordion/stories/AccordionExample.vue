<script setup lang="ts">
import Accordion, { type AccordionPropsItem } from '../Accordion.vue'

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
