<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'
import { FormInput, VRule } from '#layers/ui/app/modules/form'

const validationSchema = toTypedSchema(z.object({
	email: VRule.email(),
}))
</script>

<template>
	<Form :validation-schema="validationSchema">
		<FormInput
			name="email"
			label="Email"
			placeholder="Введите почту"
			type="email"
		/>
	</Form>
</template>
