<script setup lang="ts">
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { useNuxtApp } from '#imports'
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import { FormInput } from '#layers/ui/app/modules/form'
import { useAuthStore } from '#layers/admin/app/modules/auth/stores/authStore'
import { navigateTo, useRoute } from '~/common/utils/router'

const { handleSubmit, isSubmitting } = useForm({
	validationSchema: z.object({
		email: z.email('Введите корректный email'),
		password: z.string().min(1, 'Введите пароль'),
	}),
})

const authStore = useAuthStore()
const route = useRoute()

const submit = handleSubmit(async (values) => {
	await useNuxtApp().$api('/auth/login', {
		method: 'POST',
		body: values,
	})
	if (!await authStore.fetchUser(true)) {
		return
	}

	const redirect = typeof route.query.redirect === 'string'
		&& route.query.redirect.startsWith('/')
		&& !route.query.redirect.startsWith('//')
		? route.query.redirect
		: '/'

	await navigateTo(redirect)
})
</script>

<template>
	<form
		class="login-form"
		@submit="submit"
	>
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

		<Button
			class="login-form__submit"
			type="submit"
			size="xl"
			:state="isSubmitting ? 'progress' : 'default'"
		>
			Войти
		</Button>
	</form>
</template>

<style scoped lang="scss">
.login-form {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 16px;
}

.login-form__submit {
	width: 100%;
	margin-top: 8px;
}
</style>
