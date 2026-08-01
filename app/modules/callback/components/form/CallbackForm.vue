<script setup lang="ts">
import { useForm } from 'vee-validate'
import { z } from 'zod'
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import FormInput from '#layers/ui/app/common/components/Form/FormInput.vue'
import FormPhoneInput from '#layers/ui/app/common/components/Form/FormPhoneInput.vue'
import CallbackFormStatus from './CallbackFormStatus.vue'
import { useApiFetch } from '../../../../common/composables/useApiFetch'
import { validation } from '#layers/ui/app/common/utils/validation'

const { handleSubmit, isSubmitting, values } = useForm({
	validationSchema: z.object({
		name: validation.name(),
		phone: validation.phone(),
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
				size="l"
				:state="isSubmitting ? 'progress' : 'default'"
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
