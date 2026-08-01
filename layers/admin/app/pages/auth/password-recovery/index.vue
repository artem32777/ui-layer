<script setup lang="ts">
import { definePageMeta } from '#imports'
import PasswordRecoveryForm from '#layers/admin/app/modules/auth/components/PasswordRecoveryForm.vue'

definePageMeta({
	layout: 'admin-auth',
})
</script>

<template>
	<main class="auth-password-recovery-page">
		<h1 class="auth-password-recovery-page__title">
			Восстановление пароля
		</h1>

		<PasswordRecoveryForm />
	</main>
</template>

<style scoped lang="scss">
.auth-password-recovery-page {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 480px;
	gap: 24px;
}

.auth-password-recovery-page__title {
	margin: 0;
}
</style>
