<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'
import { FormCheckbox, VRule } from '#layers/ui/app/modules/form'

const validationSchema = toTypedSchema(z.object({
	agreement: VRule.checkbox(),
}))
</script>

<template>
	<Form
		:validation-schema="validationSchema"
		:initial-values="{ agreement: false }"
	>
		<FormCheckbox
			name="agreement"
			label="Согласие"
			hint="Подсказка"
		>
			Согласен с условиями
		</FormCheckbox>
	</Form>
</template>
