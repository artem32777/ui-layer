import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ColorsTable from './Colors.vue'
import ThemeColorsTable from './ThemeColors.vue'

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

export const ThemeColors: Story = {
	render: () => ({
		components: { ThemeColorsTable },
		template: '<ThemeColorsTable />',
	}),
}
