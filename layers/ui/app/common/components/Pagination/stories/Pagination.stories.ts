import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import Pagination from '../Pagination.vue'

type PaginationStoryArgs = ComponentProps<typeof Pagination> & {
	page: number
}

const meta = {
	title: 'UI/Pagination',
	component: Pagination,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		page: {
			description: 'номер текущей страницы, если нужно управлять состоянием снаружи',
			control: { type: 'number', min: 1 },
			table: { type: { summary: 'number' } },
		},
		totalPages: { control: { type: 'number', min: 0 } },
		itemsPerPage: { control: { type: 'number', min: 1 } },
		disabled: { control: 'boolean' },
	},
	args: {
		page: 1,
		totalPages: 100,
		itemsPerPage: 10,
		disabled: false,
	} satisfies PaginationStoryArgs,
	render: (args: PaginationStoryArgs) => ({
		components: { Pagination },
		setup() { return { args } },
		template: '<Pagination v-bind="args" v-model:page="args.page" />',
	}),
} satisfies Meta<PaginationStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.pagination-story--hovered .pagination__item[data-selected]',
			focusVisible: '.pagination-story--focused .pagination__item[data-selected]',
		},
	},
	render: (args: PaginationStoryArgs) => ({
		components: { Pagination, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			return { args }
		},
		template: `
			<StoryGrid>
				<StoryGridSection title="default">
					<StoryGridRow>
						<StoryGridItem title="default">
							<Pagination v-bind="args" />
						</StoryGridItem>
						<StoryGridItem
							title="hover"
							class="pagination-story--hovered"
						>
							<Pagination v-bind="args" />
						</StoryGridItem>
						<StoryGridItem
							title="focus"
							class="pagination-story--focused"
						>
							<Pagination v-bind="args" />
						</StoryGridItem>
						<StoryGridItem title="disabled">
							<Pagination
								v-bind="args"
								disabled
							/>
						</StoryGridItem>
					</StoryGridRow>
				</StoryGridSection>
				<StoryGridSection title="ellipsis">
					<StoryGridRow>
						<StoryGridItem title="default">
							<Pagination
								v-bind="args"
								:page="25"
								:total-pages="500"
							/>
						</StoryGridItem>
					</StoryGridRow>
				</StoryGridSection>
			</StoryGrid>
		`,
	}),
}

export const Tests: Story = {
	play: async ({ canvas, userEvent }) => {
		const previous = canvas.getByRole('button', { name: 'Previous Page' })
		const next = canvas.getByRole('button', { name: 'Next Page' })
		const firstPage = canvas.getByRole('button', { name: 'Page 1' })

		await expect(previous).toBeDisabled()
		await expect(firstPage).toHaveAttribute('aria-current', 'page')

		await userEvent.click(next)
		await expect(canvas.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page')
		await expect(previous).not.toBeDisabled()

		await userEvent.click(canvas.getByRole('button', { name: 'Page 3' }))
		await expect(canvas.getByRole('button', { name: 'Page 3' })).toHaveAttribute('aria-current', 'page')
	},
}
