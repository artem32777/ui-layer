<script setup lang="ts">
import Button from '#layers/ui/app/common/components/Button/Button.vue'

defineProps<{
	status: 'success' | 'error' | 'idle' | 'pending'
}>()

const emit = defineEmits<{
	close: []
}>()
</script>

<template>
	<div
		v-if="status === 'success' || status === 'error'"
		class="callback-form-status"
		:class="`callback-form-status_${status}`"
		@animationend="emit('close')"
	>
		<p class="callback-form-status__title">
			{{ status === 'error' ? 'Не удалось отправить заявку' : 'Заявка отправлена' }}
		</p>
		<p class="callback-form-status__text">
			{{ status === 'error' ? 'Попробуйте отправить форму ещё раз.' : 'Мы скоро свяжемся с вами.' }}
		</p>
		<Button
			type="button"
			variant="secondary"
			@click="emit('close')"
		>
			Понятно
		</Button>
	</div>
</template>

<style scoped lang="scss">
.callback-form-status {
	position: absolute;
	inset: 0;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	padding: 24px;
	border: 1px solid color-mix(in srgb, var(--primary) 20%, transparent);
	border-radius: 8px;
	color: var(--neutral-950);
	background-color: color-mix(in srgb, var(--white) 96%, transparent);
	text-align: center;
	animation: callback-form-status 4s ease forwards;
	transition: opacity 0.3s ease, transform 0.3s ease;

	&.callback-form-status_success {
		border-color: color-mix(in srgb, var(--primary) 35%, transparent);
	}

	&.callback-form-status_error {
		border-color: color-mix(in srgb, var(--accent) 35%, transparent);
	}
}

.callback-form-status__title {
	margin: 0 0 8px;
	font-weight: 600;
}

.callback-form-status__text {
	margin: 0 0 20px;
	color: color-mix(in srgb, var(--neutral-950) 70%, transparent);
}

@keyframes callback-form-status {
	0%,
	80% {
		opacity: 1;
	}

	100% {
		opacity: 0;
	}
}
</style>
