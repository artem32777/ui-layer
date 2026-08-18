import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import Breadcrumb from '../Breadcrumb.vue'
import breadcrumbTypesSource from '../Breadcrumb.types.ts?raw'
import type { BreadcrumbItem } from '../Breadcrumb.types.ts'

type BreadcrumbStoryArgs = ComponentProps<typeof Breadcrumb>

const defaultItems = [
	{ label: 'Главная', href: '#' },
	{ label: 'Каталог', href: '#' },
	{ label: 'Электроника', href: '#' },
	{ label: 'Смартфоны', current: true },
] satisfies BreadcrumbItem[]

const collapsedStates = [false, true]

const meta = {
	title: 'UI/Breadcrumb',
	component: Breadcrumb,
	parameters: { a11y: { test: 'error' } },
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
		items: defaultItems,
		collapsed: false,
		separator: '/',
	} satisfies BreadcrumbStoryArgs,
	render: (args: BreadcrumbStoryArgs) => ({
		components: { Breadcrumb },
		setup() { return { args } },
		template: '<Breadcrumb v-bind="args" />',
	}),
} satisfies Meta<typeof Breadcrumb>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.breadcrumb-story--hovered',
			focusWithin: '.breadcrumb-story--focused',
		},
	},
	render: (args: BreadcrumbStoryArgs) => ({
		components: { Breadcrumb, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			return { args, collapsedStates }
		},
		template: `
			<StoryGrid>
				<StoryGridSection
					v-for="collapsed in collapsedStates"
					:key="String(collapsed)"
					:title="collapsed ? 'collapsed' : 'base'"
				>
					<StoryGridRow>
						<StoryGridItem title="default">
							<Breadcrumb
								v-bind="args"
								:collapsed="collapsed"
							/>
						</StoryGridItem>
						<StoryGridItem title="hover">
							<Breadcrumb
								v-bind="args"
								:collapsed="collapsed"
								class="breadcrumb-story--hovered"
							/>
						</StoryGridItem>
						<StoryGridItem title="focus">
							<Breadcrumb
								v-bind="args"
								:collapsed="collapsed"
								class="breadcrumb-story--focused"
							/>
						</StoryGridItem>
					</StoryGridRow>
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
