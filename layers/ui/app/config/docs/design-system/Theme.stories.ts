import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ThemeTable from './Theme.vue'

const meta = {
	title: 'Design System/Examples',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Theme: Story = {
	parameters: {
		theme: { lockBackground: true },
	},
	render: () => ({
		components: { ThemeTable },
		template: '<ThemeTable />',
	}),
}
