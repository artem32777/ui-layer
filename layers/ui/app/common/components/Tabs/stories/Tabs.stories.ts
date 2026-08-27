import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ConcreteComponent } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, waitFor } from 'storybook/test'
import Tabs from '../Tabs.vue'
import { tabsSizes, tabsVariants } from '../Tabs.types.ts'
import tabsTypesSource from '../Tabs.types.ts?raw'
import TabsStoryStates from './TabsStoryStates.vue'

type TabsStoryArgs = ComponentProps<typeof Tabs>

const meta = {
	title: 'UI/Tabs',
	component: Tabs as unknown as ConcreteComponent<TabsStoryArgs>,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		modelValue: {
			control: 'select',
			options: ['account', 'password'],
			description: 'Значение активной вкладки. Нужно только если необходимо управление табами из родителя.',
		},
		variant: { control: 'select', options: tabsVariants },
		size: { control: 'select', options: tabsSizes },
		items: {
			control: 'object',
			table: {
				type: {
					summary: 'TabsTitle[]',
					detail: tabsTypesSource.trim(),
				},
			},
		},
		// Docgen видит динамический `:name="(item.value as TabValues)"` как имя слота — подменяем для Docs/Controls.
		'(item.value as TabValues)': {
			name: '[value]',
			description: 'Контент вкладки. Имя слота совпадает с `value` из `items` (например `#account`).',
			control: false,
			table: {
				category: 'slots',
				type: { summary: 'VNode' },
			},
		},
	},
	args: {
		modelValue: 'account',
		variant: 'button',
		size: 'medium',
		items: [
			{ value: 'account', label: 'Account' },
			{ value: 'password', label: 'Password' },
		],
	} satisfies TabsStoryArgs,
	render: (args: TabsStoryArgs) => ({
		components: { Tabs },
		setup() { return { args } },
		template: `
			<Tabs
				v-model="args.modelValue"
				:items="args.items"
				:variant="args.variant"
				:size="args.size"
			>
				<template #account>
					Make changes to your account here.
				</template>

				<template #password>
					Change your password here.
				</template>
			</Tabs>
		`,
	}),
} satisfies Meta<TabsStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const Base: Story = {}

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.tabs-story--hovered .tabs__trigger:nth-child(2)',
		},
	},
	render: (args: TabsStoryArgs) => ({
		components: { TabsStoryStates },
		setup() {
			return { args }
		},
		template: '<TabsStoryStates :variant="args.variant" :size="args.size" />',
	}),
}

export const Tests: Story = {
	play: async ({ canvas, userEvent }) => {
		const accountTab = canvas.getByRole('tab', { name: 'Account' })
		const passwordTab = canvas.getByRole('tab', { name: 'Password' })

		await expect(accountTab).toHaveAttribute('aria-selected', 'true')
		await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Make changes to your account here.')

		await userEvent.click(passwordTab)
		await waitFor(() => expect(passwordTab).toHaveAttribute('aria-selected', 'true'))
		await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Change your password here.')

		await userEvent.keyboard('{ArrowLeft}')
		await waitFor(() => expect(accountTab).toHaveAttribute('aria-selected', 'true'))
		await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Make changes to your account here.')
	},
}
