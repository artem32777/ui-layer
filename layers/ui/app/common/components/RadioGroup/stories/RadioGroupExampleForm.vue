<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'
import type { RadioOption } from '../RadioGroup.types.ts'
import { FormRadioGroup } from '#layers/ui/app/modules/form'

const options: RadioOption[] = [
	{ label: 'Курьером', value: 'courier' },
	{ label: 'Самовывоз', value: 'pickup' },
]

const validationSchema = toTypedSchema(z.object({
	delivery: z.string({ required_error: 'Выберите способ получения' }),
}))
</script>

<template>
	<Form :validation-schema="validationSchema">
		<FormRadioGroup
			name="delivery"
			label="Способ получения"
			:options="options"
		/>
	</Form>
</template>
