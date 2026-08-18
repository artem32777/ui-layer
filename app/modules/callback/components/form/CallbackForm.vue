<script setup lang="ts">
import { useForm } from 'vee-validate'
import { z } from 'zod'
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import { FormInput, FormPhoneInput, VRule } from '#layers/ui/app/modules/form'
import CallbackFormStatus from './CallbackFormStatus.vue'
import { useApiFetch } from '../../../../common/composables/useApiFetch'

const { handleSubmit, isSubmitting, values } = useForm({
	validationSchema: z.object({
		name: VRule.name(),
		phone: VRule.phone(),
	}),
})

const { execute, status, clear } = useApiFetch('/callback', {
	method: 'POST',
	body: values,
	immediate: false,
})
</script>

<template>
	<div class="callback-form">
		<form
			class="callback-form__form"
			@submit="handleSubmit(() => execute())"
		>
			<FormInput
				name="name"
				placeholder="Имя"
				:disabled="isSubmitting"
			/>

			<FormPhoneInput
				name="phone"
				:disabled="isSubmitting"
			/>

			<Button
				class="callback-form__submit"
				type="submit"
				:disabled="isSubmitting"
			>
				Отправить
			</Button>
		</form>

		<CallbackFormStatus
			:status="status"
			@close="clear"
		/>
	</div>
</template>

<style scoped lang="scss">
.callback-form {
	position: relative;
	overflow: hidden;
}

.callback-form__form {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.callback-form__submit {
	width: 100%;
	margin-top: 8px;
}
</style>
