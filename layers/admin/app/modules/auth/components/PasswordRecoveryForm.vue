<script setup lang="ts">
import { useForm } from 'vee-validate'
import { z } from 'zod'
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import { FormInput } from '#layers/ui/app/modules/form'
import { useApiFetch } from '../../../../../../app/common/composables/useApiFetch'

const { handleSubmit, isSubmitting, values } = useForm({
	validationSchema: z.object({
		email: z.email('Введите корректный email'),
	}),
})

const { execute } = useApiFetch('/auth/password-recovery', {
	method: 'POST',
	body: values,
	immediate: false,
})
</script>

<template>
	<form
		class="password-recovery-form"
		@submit="handleSubmit(() => execute())"
	>
		<FormInput
			name="email"
			type="email"
			placeholder="Email"
			:disabled="isSubmitting"
		/>

		<Button
			class="password-recovery-form__submit"
			type="submit"
			size="xl"
			:state="isSubmitting ? 'progress' : 'default'"
		>
			Восстановить пароль
		</Button>
	</form>
</template>

<style scoped lang="scss">
.password-recovery-form {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 16px;
}

.password-recovery-form__submit {
	width: 100%;
	margin-top: 8px;
}
</style>
