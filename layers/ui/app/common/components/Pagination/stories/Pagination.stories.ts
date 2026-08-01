import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import Pagination from '../Pagination.vue'

type PaginationStoryArgs = ComponentProps<typeof Pagination> & {
	page: number
}

const meta = {
	title: 'UI/Pagination',
	component: Pagination,
	argTypes: {
		page: {
			control: { type: 'number', min: 1 },
			table: { type: { summary: 'number' } },
		},
		totalPages: { control: { type: 'number', min: 0 } },
		itemsPerPage: { control: { type: 'number', min: 1 } },
	},
	args: {
		page: 1,
		totalPages: 100,
		itemsPerPage: 10,
	} satisfies PaginationStoryArgs,
	render: (args: PaginationStoryArgs) => ({
		components: { Pagination },
		setup() { return { args } },
		template: `
      <Pagination
          v-model:page="args.page"
          :totalPages="args.totalPages"
          :items-per-page="args.itemsPerPage"
      />
    `,
	}),
} satisfies Meta<PaginationStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {}

export const ManyPages: Story = {
	args: {
		page: 25,
		totalPages: 500,
		itemsPerPage: 10,
	},
}

export const SinglePage: Story = {
	args: {
		page: 1,
		totalPages: 8,
		itemsPerPage: 10,
	},
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
