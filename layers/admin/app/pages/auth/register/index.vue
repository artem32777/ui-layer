<script setup lang="ts">
import { definePageMeta } from '#imports'
import RegisterForm from '#layers/admin/app/modules/auth/components/RegisterForm.vue'

definePageMeta({
	layout: 'admin-auth',
})
</script>

<template>
	<main class="auth-register-page">
		<h1 class="auth-register-page__title">
			Регистрация
		</h1>

		<RegisterForm />
	</main>
</template>

<style scoped lang="scss">
.auth-register-page {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 480px;
	gap: 24px;
}

.auth-register-page__title {
	margin: 0;
}
</style>
