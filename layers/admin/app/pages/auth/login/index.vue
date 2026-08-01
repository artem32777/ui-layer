<script setup lang="ts">
import { definePageMeta } from '#imports'
import LoginForm from '#layers/admin/app/modules/auth/components/LoginForm.vue'

definePageMeta({
	layout: 'admin-auth',
})
</script>

<template>
	<main class="auth-login-page">
		<h1 class="auth-login-page__title">
			Вход
		</h1>

		<LoginForm />
	</main>
</template>

<style scoped lang="scss">
.auth-login-page {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 480px;
	gap: 24px;
}

.auth-login-page__title {
	margin: 0;
}
</style>
