import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { useNuxtApp } from '#imports'
import { onBeforeUnmount, onMounted } from 'vue'
import Toast from '../Toast.vue'
import ToastExample from './ToastExample.vue'

const meta = {
	title: 'UI/Toast',
	component: Toast,
} satisfies Meta<typeof Toast>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
	render: () => ({
		components: { Toast, ToastExample },
		template: `
			<Toast />
			<ToastExample />
		`,
	}),
}

export const Opened: Story = {
	name: 'Все состояния',
	render: () => ({
		components: { Toast },
		setup() {
			const { $toast } = useNuxtApp()

			onMounted(() => {
				$toast('Без статуса', { duration: Infinity })
				$toast.success('Успешное действие', { duration: Infinity })
				$toast.info('Информационное сообщение', { duration: Infinity })
				$toast.warning('Предупреждение', { duration: Infinity })
				$toast.error('Ошибка', { duration: Infinity })
				$toast.loading('В процессе', { duration: Infinity })
			})

			onBeforeUnmount(() => $toast.dismiss())
		},
		template: '<div style="height: 380px;"><Toast expand :visible-toasts="6" /></div>',
	}),
}
