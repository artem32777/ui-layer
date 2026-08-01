import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Button from '../../Button/Button.vue'
import Toast from '../Toast.vue'

const meta = {
	title: 'UI/Toast',
	component: Toast,
	render: () => ({
		components: { Button, Toast },
		template: `
			<Toast>
				<template #trigger="{ showToast }">
					<Button variant="outline" @click="showToast">Показать уведомление</Button>
				</template>
			</Toast>
		`,
	}),
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {}
