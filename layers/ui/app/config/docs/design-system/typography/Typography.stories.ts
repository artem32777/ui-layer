import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TypographyEditor from './TypographyEditor.vue'

const meta = {
	title: 'Design System/Examples',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const TypographyScale: Story = {
	render: () => ({
		components: { TypographyEditor },
		template: '<TypographyEditor />',
	}),
}
