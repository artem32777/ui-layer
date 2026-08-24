import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ColorsTable from './Colors.vue'

const meta = {
	title: 'Design System/Examples',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Colors: Story = {
	render: () => ({
		components: { ColorsTable },
		template: '<ColorsTable />',
	}),
}
