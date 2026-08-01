<script setup lang="ts">
import { useForm } from 'vee-validate'
import { z } from 'zod'
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import FormInput from '#layers/ui/app/common/components/Form/FormInput.vue'
import { useApiFetch } from '../../../../../../app/common/composables/useApiFetch'
import { validation } from '#layers/ui/app/common/utils/validation'

const { handleSubmit, isSubmitting, values } = useForm({
	validationSchema: z.object({
		name: validation.name(),
		email: z.email('Введите корректный email'),
		password: z.string().min(6, 'Пароль должен содержать не менее 6 символов'),
		passwordConfirmation: z.string().min(1, 'Повторите пароль'),
	}).refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
		message: 'Пароли не совпадают',
		path: ['passwordConfirmation'],
	}),
})

const { execute } = useApiFetch('/auth/register', {
	method: 'POST',
	body: values,
	immediate: false,
})
</script>

<template>
	<form
		class="register-form"
		@submit="handleSubmit(() => execute())"
	>
		<FormInput
			name="name"
			placeholder="Имя"
			:disabled="isSubmitting"
		/>

		<FormInput
			name="email"
			type="email"
			placeholder="Email"
			:disabled="isSubmitting"
		/>

		<FormInput
			name="password"
			type="password"
			placeholder="Пароль"
			:disabled="isSubmitting"
		/>

		<FormInput
			name="passwordConfirmation"
			type="password"
			placeholder="Повторите пароль"
			:disabled="isSubmitting"
		/>

		<Button
			class="register-form__submit"
			type="submit"
			size="xl"
			:state="isSubmitting ? 'progress' : 'default'"
		>
			Зарегистрироваться
		</Button>
	</form>
</template>

<style scoped lang="scss">
.register-form {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 16px;
}

.register-form__submit {
	width: 100%;
	margin-top: 8px;
}
</style>
