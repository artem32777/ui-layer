import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SpacingTable from './Spacing.vue'

const meta = {
	title: 'Design System/Examples',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Spacing: Story = {
	render: () => ({
		components: { SpacingTable },
		template: '<SpacingTable />',
	}),
}
