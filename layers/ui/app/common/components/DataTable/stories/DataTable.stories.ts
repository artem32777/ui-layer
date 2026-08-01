import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DataTableExample from './DataTableExample.vue'
import DataTableServerExample from './DataTableServerExample.vue'
import dataTableExampleSource from './DataTableExample.vue?raw'
import dataTableServerExampleSource from './DataTableServerExample.vue?raw'

const meta = {
	title: 'UI/DataTable',
	parameters: {
		a11y: { test: 'error' },
	},
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Server: Story = {
	render: () => ({
		components: { DataTableServerExample },
		template: '<DataTableServerExample />',
	}),
	parameters: {
		docs: {
			source: {
				code: dataTableServerExampleSource,
				language: 'vue',
			},
		},
	},
}

export const Client: Story = {
	render: () => ({
		components: { DataTableExample },
		template: '<DataTableExample />',
	}),
	parameters: {
		docs: {
			source: {
				code: dataTableExampleSource,
				language: 'vue',
			},
		},
	},
}
