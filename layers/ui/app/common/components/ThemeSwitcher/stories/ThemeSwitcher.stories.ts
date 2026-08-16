import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, waitFor } from 'storybook/test'
import ThemeSwitcher from '../ThemeSwitcher.vue'

const meta = {
	title: 'UI/ThemeSwitcher',
	component: ThemeSwitcher,
} satisfies Meta<typeof ThemeSwitcher>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {}

export const Tests: Story = {
	play: async ({ canvas, canvasElement, userEvent }) => {
		const light = canvas.getByRole('button', { name: 'Светлая тема' })
		const dark = canvas.getByRole('button', { name: 'Тёмная тема' })
		const system = canvas.getByRole('button', { name: 'Системная тема' })
		const documentElement = canvasElement.ownerDocument.documentElement

		await userEvent.click(light)
		await expect(light).toHaveAttribute('aria-pressed', 'true')
		await waitFor(() => expect(documentElement).not.toHaveClass('dark'))

		await userEvent.click(dark)
		await expect(dark).toHaveAttribute('aria-pressed', 'true')
		await expect(light).toHaveAttribute('aria-pressed', 'false')
		await waitFor(() => expect(documentElement).toHaveClass('dark'))

		await userEvent.click(system)
		await expect(system).toHaveAttribute('aria-pressed', 'true')

		await userEvent.click(light)
		await waitFor(() => expect(documentElement).not.toHaveClass('dark'))
	},
}
