<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'
import { FormTextarea, VRule } from '#layers/ui/app/modules/form'

const validationSchema = toTypedSchema(z.object({
	message: VRule.name(5, 'Минимум 5 символов'),
}))
</script>

<template>
	<Form :validation-schema="validationSchema">
		<FormTextarea
			name="message"
			label="Сообщение"
			placeholder="Введите сообщение"
		/>
	</Form>
</template>
