import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ConcreteComponent } from 'vue'
import { expect, waitFor } from 'storybook/test'
import { useArgs } from 'storybook/preview-api'
import IconPickerControl from '@@/.storybook/components/IconPickerControl.vue'
import Tabs from '../Tabs.vue'
import { tabsSizes, tabsVariants, type TabsProps, type TabsTitle } from '../Tabs.types.ts'
import tabsTypesSource from '../Tabs.types.ts?raw'
import TabsStoryStates from './TabsStoryStates.vue'
import { iconNameList, type IconName } from '#layers/ui/app/modules/svg-icon'

type TabsStoryArgs = TabsProps & {
	modelValue?: string
	iconLeft?: IconName
	iconRight?: IconName
	icon?: IconName
}

const defaultItems = [
	{ value: 'account', label: 'Account' },
	{ value: 'password', label: 'Password' },
] satisfies TabsTitle[]

const meta = {
	title: 'UI/Tabs',
	component: Tabs as unknown as ConcreteComponent<TabsStoryArgs>,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		'modelValue': {
			control: 'select',
			options: ['account', 'password'],
			description: 'Значение активной вкладки. Нужно только если необходимо управление табами из родителя.',
		},
		'items': {
			control: 'object',
			table: {
				type: {
					summary: 'TabsTitle[]',
					detail: tabsTypesSource.trim(),
				},
			},
		},
		'variant': { control: 'select', options: tabsVariants },
		'size': { control: 'select', options: tabsSizes },
		'indent': { control: 'boolean' },
		'iconLeft': { control: 'select', options: iconNameList },
		'iconRight': { control: 'select', options: iconNameList },
		'icon': { control: 'select', options: iconNameList },
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
	} as Meta<TabsStoryArgs>['argTypes'],
	args: {
		modelValue: 'account',
		items: defaultItems,
		variant: 'button',
		size: 'medium',
		indent: false,
	} satisfies TabsStoryArgs,
	render: (args: TabsStoryArgs) => ({
		components: { Tabs: Tabs as unknown as ConcreteComponent<TabsStoryArgs> },
		setup() { return { args } },
		template: `
			<Tabs
				v-model="args.modelValue"
				:items="args.items.map((item) => ({ ...item, iconLeft: args.iconLeft, iconRight: args.iconRight, icon: args.icon }))"
				:variant="args.variant"
				:size="args.size"
				:indent="args.indent"
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

export const Base: Story = {
	render: (args: TabsStoryArgs) => {
		const [, updateArgs] = useArgs<TabsStoryArgs>()

		return {
			components: { Tabs: Tabs as unknown as ConcreteComponent<TabsStoryArgs>, IconPickerControl },
			setup() {
				return { args, updateArgs }
			},
			template: `
				<div style="display: grid; gap: 24px;">
					<div style="display: flex; gap: 12px; flex-wrap: wrap;">
						<IconPickerControl
							text="Выбрать левую иконку"
							side="left"
							:model-value="args.iconLeft"
							@update:model-value="updateArgs({ iconLeft: $event })"
						/>

						<IconPickerControl
							text="Выбрать правую иконку"
							side="right"
							:model-value="args.iconRight"
							@update:model-value="updateArgs({ iconRight: $event })"
						/>
					</div>

					<Tabs
						v-model="args.modelValue"
						:items="args.items.map((item) => ({ ...item, iconLeft: args.iconLeft, iconRight: args.iconRight, icon: args.icon }))"
						:variant="args.variant"
						:size="args.size"
						:indent="args.indent"
					>
						<template #account>
							Make changes to your account here.
						</template>

						<template #password>
							Change your password here.
						</template>
					</Tabs>
				</div>
			`,
		}
	},
}

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
		template: '<TabsStoryStates :indent="args.indent" :icon-left="args.iconLeft" :icon-right="args.iconRight" :icon="args.icon" />',
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
