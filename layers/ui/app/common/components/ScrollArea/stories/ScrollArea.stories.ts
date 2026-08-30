import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ScrollArea from '../ScrollArea.vue'
import ScrollAreaExample from './ScrollAreaExample.vue'

const meta = {
	title: 'UI/ScrollArea',
	component: ScrollArea,
	render: () => ({
		components: { ScrollAreaExample },
		template: '<ScrollAreaExample />',
	}),
} satisfies Meta<typeof ScrollArea>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {}

export const LongContent: Story = {
	render: () => ({
		components: { ScrollAreaExample },
		template: '<ScrollAreaExample :count="40" />',
	}),
}
