import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Typography from './Typography.vue'

const meta = {
	title: 'Design System/Examples',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const TypographyScale: Story = {
	render: () => ({
		components: { TypographyEditor: Typography },
		template: '<TypographyEditor />',
	}),
}
