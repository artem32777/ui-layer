import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, waitFor } from 'storybook/test'
import NavigationMenu from '../NavigationMenu.vue'
import navigationMenuTypesSource from '../NavigationMenu.types.ts?raw'
import { items } from './NavigationMenu.items'

type NavigationMenuStoryArgs = ComponentProps<typeof NavigationMenu>

const meta = {
	title: 'UI/NavigationMenu',
	component: NavigationMenu,
	argTypes: {
		items: {
			control: 'object',
			description:
				'Рекурсивное дерево ссылок и раскрывающихся групп. Количество уровней вложенности не ограничено.',
			table: {
				type: {
					summary: 'NavigationMenuItem[]',
					detail: navigationMenuTypesSource.trim(),
				},
			},
		},
	},
	args: {
		items,
	} satisfies NavigationMenuStoryArgs,
	parameters: {
		a11y: { test: 'error' },
		layout: 'fullscreen',
	},
	render: (args: NavigationMenuStoryArgs) => ({
		components: { NavigationMenu },
		setup() {
			return { args }
		},
		template: `
			<div style="box-sizing: border-box; display: flex; align-items: flex-start; width: 100%; min-height: 800px; padding: 64px 16px 360px; overflow: visible;">
				<NavigationMenu :items="args.items" />
			</div>
		`,
	}),
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<NavigationMenuStoryArgs>

export const Base: Story = {}

export const Tests: Story = {
	play: async ({ canvas, userEvent }) => {
		const services = canvas.getByRole('button', { name: 'Услуги' })

		await expect(services).toHaveAttribute('aria-expanded', 'false')
		await userEvent.hover(services)
		await waitFor(() =>
			expect(services).toHaveAttribute('aria-expanded', 'true'),
		)
		await waitFor(() =>
			expect(canvas.getByRole('link', { name: 'Стратегия' })).toBeVisible(),
		)

		const development = canvas.getByRole('button', { name: 'Разработка' })

		await userEvent.click(development)
		await waitFor(() =>
			expect(development).toHaveAttribute('aria-expanded', 'true'),
		)
		await waitFor(() =>
			expect(
				canvas.getByRole('link', { name: 'Веб-приложения' }),
			).toBeVisible(),
		)

		const purchaseOptions = canvas.getByRole('button', { name: 'Как купить' })

		await userEvent.hover(purchaseOptions)
		await waitFor(() =>
			expect(purchaseOptions).toHaveAttribute('aria-expanded', 'true'),
		)
		await waitFor(() =>
			expect(canvas.getByRole('link', { name: 'Ипотека' })).toBeVisible(),
		)

		await userEvent.keyboard('{Escape}')
		await waitFor(() =>
			expect(services).toHaveAttribute('aria-expanded', 'false'),
		)
	},
}
