import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ConcreteComponent } from 'vue'
import { expect, waitFor } from 'storybook/test'
import OverflowNavigation from '../OverflowNavigation.vue'
import overflowNavigationTypesSource from '../OverflowNavigation.types.ts?raw'

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
	argTypes: {
		items: {
			control: 'object',
			table: {
				type: {
					summary: 'T[]',
					detail: overflowNavigationTypesSource.trim(),
				},
			},
		},
		tag: { control: 'select', options: ['div', 'nav'] },
		overflowWidth: { control: 'number' },
		listSelector: { control: 'text' },
	},
	args: {
		items,
		tag: 'nav',
		overflowWidth: 104,
	},
	render: args => ({
		components: { OverflowNavigation: OverflowNavigation as unknown as ConcreteComponent<OverflowNavigationStoryArgs> },
		setup() { return { args } },
		template: `
			<div style="resize: horizontal; overflow: auto; width: 520px; min-width: 220px; max-width: 100%; padding: 16px; border: 1px dashed #9ca3af;">
				<OverflowNavigation v-bind="args">
					<template #default="{ visibleItems, overflowItems, hasOverflow }">
						<ul style="display: flex; align-items: center; gap: 16px; margin: 0; padding: 0; list-style: none; white-space: nowrap;">
							<li v-for="item in visibleItems" :key="item.label">
								<a href="#" style="color: inherit;">{{ item.label }}</a>
							</li>
							<li v-if="hasOverflow">
								<button type="button">Ещё ({{ overflowItems.length }})</button>
							</li>
						</ul>
						<p style="margin: 12px 0 0; color: #6b7280; font-size: 12px;">
							visibleItems: {{ visibleItems.length }}, overflowItems: {{ overflowItems.length }}, hasOverflow: {{ hasOverflow }}
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
	parameters: {
		viewport: { defaultViewport: 'responsive' },
	},
	render: args => ({
		components: { OverflowNavigation: OverflowNavigation as unknown as ConcreteComponent<OverflowNavigationStoryArgs> },
		setup() { return { args } },
		template: `
			<div style="width: 760px; max-width: 100%; padding: 16px; border: 1px dashed #9ca3af;">
				<OverflowNavigation v-bind="args">
					<template #default="{ visibleItems, overflowItems, hasOverflow }">
						<ul style="display: flex; align-items: center; gap: 16px; margin: 0; padding: 0; list-style: none; white-space: nowrap;">
							<li v-for="item in visibleItems" :key="item.label">{{ item.label }}</li>
							<li v-if="hasOverflow">Ещё ({{ overflowItems.length }})</li>
						</ul>
					</template>
				</OverflowNavigation>
			</div>
		`,
	}),
}

export const Tests: Story = {
	args: {
		items: [
			{ label: 'Главная страница жилого комплекса' },
			{ label: 'Каталог доступных квартир' },
			{ label: 'Условия доставки и оплаты' },
			{ label: 'Гарантия и документы' },
			{ label: 'Контактная информация' },
		],
		listSelector: '.overflow-navigation-test__list',
	},
	render: args => ({
		components: { OverflowNavigation: OverflowNavigation as unknown as ConcreteComponent<OverflowNavigationStoryArgs> },
		setup() { return { args } },
		template: `
			<div style="width: 520px; padding: 16px; border: 1px dashed #9ca3af;">
				<OverflowNavigation v-bind="args">
					<template #default="{ visibleItems, overflowItems, hasOverflow }">
						<div>
							<ul class="overflow-navigation-test__list" style="display: flex; align-items: center; gap: 16px; margin: 0; padding: 0; list-style: none; white-space: nowrap;">
								<li v-for="item in visibleItems" :key="item.label">{{ item.label }}</li>
								<li v-if="hasOverflow">
									<button type="button">Ещё ({{ overflowItems.length }})</button>
								</li>
							</ul>
							<p>visibleItems: {{ visibleItems.length }}, overflowItems: {{ overflowItems.length }}, hasOverflow: {{ hasOverflow }}</p>
						</div>
					</template>
				</OverflowNavigation>
			</div>
		`,
	}),
	play: async ({ canvas }) => {
		await waitFor(() => expect(canvas.getByText(/hasOverflow: true/)).toBeInTheDocument())
		await expect(canvas.getByText(/overflowItems: [1-9]/)).toBeInTheDocument()
		await expect(canvas.getByRole('button', { name: /Ещё \([1-9]/ })).toBeVisible()
	},
}
