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
		await expect(canvas.getAllByRole('button')).toHaveLength(3)
		const documentElement = canvasElement.ownerDocument.documentElement

		await userEvent.click(light)
		await userEvent.unhover(light)
		await expect(light).toHaveAttribute('aria-pressed', 'true')
		await waitFor(() => expect(getComputedStyle(light).backgroundColor).toBe('rgb(24, 29, 51)'))
		await expect(getComputedStyle(light).color).toBe('rgb(255, 255, 255)')
		await waitFor(() => expect(documentElement).not.toHaveClass('theme-dark'))

		await userEvent.click(dark)
		await userEvent.unhover(dark)
		await expect(dark).toHaveAttribute('aria-pressed', 'true')
		await waitFor(() => expect(getComputedStyle(dark).backgroundColor).toBe('rgb(255, 255, 255)'))
		await expect(getComputedStyle(dark).color).toBe('rgb(24, 29, 51)')
		await waitFor(() => expect(documentElement).toHaveClass('theme-dark'))

		await userEvent.click(system)
		await expect(system).toHaveAttribute('aria-pressed', 'true')
		await waitFor(() => expect(documentElement.classList.contains('theme-dark')).toBe(canvasElement.ownerDocument.defaultView!.matchMedia('(prefers-color-scheme: dark)').matches))

		await userEvent.click(light)
		await waitFor(() => expect(documentElement).not.toHaveClass('theme-dark'))
	},
}
