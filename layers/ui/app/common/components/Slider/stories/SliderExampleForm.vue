<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'
import FormSlider from '../FormSlider.vue'

const validationSchema = toTypedSchema(z.object({
	area: z.array(z.number()),
}))
</script>

<template>
	<Form
		:validation-schema="validationSchema"
		:initial-values="{ area: [20, 80] }"
	>
		<FormSlider
			name="area"
			label="Площадь"
			hint="Подсказка"
			additional-text="m²"
			size="big"
		/>
	</Form>
</template>
