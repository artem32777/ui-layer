import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ConcreteComponent } from 'vue'
import { expect, waitFor } from 'storybook/test'
import OverflowNavigation from '../OverflowNavigation.vue'

interface NavigationItem {
	label: string
}

interface OverflowNavigationStoryArgs {
	items: NavigationItem[]
	tag?: 'div' | 'nav'
	overflowWidth?: number
	listSelector?: string
}

const items: NavigationItem[] = [
	{ label: 'Главная' },
	{ label: 'Каталог' },
	{ label: 'Доставка и оплата' },
	{ label: 'Гарантия' },
	{ label: 'Контакты' },
]

const meta = {
	title: 'UI/OverflowNavigation',
	component: OverflowNavigation as unknown as ConcreteComponent<OverflowNavigationStoryArgs>,
	args: {
		items: items,
		tag: 'nav',
		overflowWidth: 104,
	},
	render: args => ({
		components: { OverflowNavigation: OverflowNavigation as unknown as ConcreteComponent<OverflowNavigationStoryArgs> },
		setup() { return { args } },
		template: `
			<div
				:style="{
					resize: 'horizontal',
					overflow: 'auto',
					minWidth: '220px',
					maxWidth: '100%',
					padding: '16px',
					border: '1px dashed #9ca3af',
				}"
			>
				<OverflowNavigation
					:items="args.items"
					:tag="args.tag"
					:overflow-width="args.overflowWidth"
					:list-selector="args.listSelector"
				>
					<template #default="{ visibleItems, overflowItems }">
						<ul style="display: flex; align-items: center; gap: 16px; margin: 0; padding: 0; list-style: none; white-space: nowrap;">
							<li v-for="item in visibleItems" :key="item.label">
								<a href="#" style="color: inherit;">{{ item.label }}</a>
							</li>
							<li v-if="overflowItems.length > 1">
								<button type="button">Ещё ({{ overflowItems.length }})</button>
							</li>
						</ul>
						<p style="margin: 12px 0 0; color: #6b7280; font-size: 12px;">
							visibleItems: {{ visibleItems.length }}, overflowItems: {{ overflowItems.length }}
						</p>
					</template>
				</OverflowNavigation>
			</div>
		`,
	}),
} satisfies Meta<OverflowNavigationStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {}

export const WithoutOverflow: Story = {
	args: {
	},
	parameters: {
		viewport: { defaultViewport: 'responsive' },
	},
}

export const Tests: Story = {
	args: {
		items: items,
	},
	decorators: [
		() => ({
			template: '<div style="width: 280px"><story /></div>',
		}),
	],
	play: async ({ canvas }) => {
		await waitFor(() => expect(canvas.getByText(/overflowItems: [1-9]/)).toBeInTheDocument())
		await expect(canvas.getByRole('button', { name: /Ещё \([1-9]/ })).toBeVisible()
	},
}
