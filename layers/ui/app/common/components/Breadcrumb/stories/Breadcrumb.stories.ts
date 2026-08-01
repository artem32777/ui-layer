import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import Breadcrumb from '../Breadcrumb.vue'
import breadcrumbTypesSource from '../Breadcrumb.types.ts?raw'

type BreadcrumbStoryArgs = ComponentProps<typeof Breadcrumb>

const meta = {
	title: 'UI/Breadcrumb',
	component: Breadcrumb,
	argTypes: {
		items: {
			control: 'object',
			table: {
				type: {
					summary: 'BreadcrumbItem[]',
					detail: breadcrumbTypesSource.trim(),
				},
			},
		},
		collapsed: { control: 'boolean' },
		separator: { control: 'text' },
	},
	args: {
		items: [
			{ label: 'Главная', href: '#' },
			{ label: 'Каталог', href: '#' },
			{ label: 'Электроника', href: '#' },
			{ label: 'Смартфоны', current: true },
		],
		collapsed: false,
		separator: '/',
	} satisfies BreadcrumbStoryArgs,
} satisfies Meta<typeof Breadcrumb>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {}

export const Collapsed: Story = {
	args: { collapsed: true },
}
