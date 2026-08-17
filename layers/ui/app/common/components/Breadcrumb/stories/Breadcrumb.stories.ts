import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
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

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const States: Story = {
	render: (args: BreadcrumbStoryArgs) => ({
		components: { Breadcrumb, StoryGrid, StoryGridSection },
		setup() {
			const collapsedStates = [false, true]
			return { args, collapsedStates }
		},
		template: `
			<StoryGrid>
				<StoryGridSection
					v-for="collapsed in collapsedStates"
					:key="String(collapsed)"
					:title="collapsed ? 'collapsed' : 'base'"
				>
					<Breadcrumb v-bind="args" :collapsed="collapsed" />
				</StoryGridSection>
			</StoryGrid>
		`,
	}),
}

export const Tests: Story = {
	play: async ({ canvas }) => {
		await expect(canvas.getByRole('navigation', { name: 'breadcrumb' })).toBeVisible()
		await expect(canvas.getByRole('link', { name: 'Главная' })).toHaveAttribute('href', '#')
		await expect(canvas.getByRole('link', { name: 'Каталог' })).toHaveAttribute('href', '#')
		await expect(canvas.getByRole('link', { name: 'Электроника' })).toHaveAttribute('href', '#')
		await expect(canvas.getByText('Смартфоны')).toHaveAttribute('aria-current', 'page')
	},
}
