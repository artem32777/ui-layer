import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Radius from './Radius.vue'

const meta = {
	title: 'Design System/Examples',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const RadiusTokens: Story = {
	render: (_args, { globals }) => ({
		components: { RadiusTable: Radius },
		setup() {
			return {
				activeClass: String(globals.radius ?? 'radius-3'),
			}
		},
		template: '<RadiusTable :active-class="activeClass" />',
	}),
}
