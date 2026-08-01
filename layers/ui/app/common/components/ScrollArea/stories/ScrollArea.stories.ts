import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ScrollArea from '../ScrollArea.vue'

const scrollAreaItemStyle = 'margin: 0; padding: 8px 0; border-bottom: 1px solid var(--grey); color: var(--additional-2); font-size: 14px;'

const meta = {
	title: 'UI/ScrollArea',
	component: ScrollArea,
	render: () => ({
		components: { ScrollArea },
		template: `
			<ScrollArea>
				<p
						v-for="index in 18"
						:key="index"
						style="${scrollAreaItemStyle}"
				>
					Scrollable item {{ index }}
				</p>
			</ScrollArea>
		`,
	}),
} satisfies Meta<typeof ScrollArea>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {}

export const LongContent: Story = {
	render: () => ({
		components: { ScrollArea },
		template: `
			<ClientOnly>
				<ScrollArea>
					<p
						v-for="index in 40"
						:key="index"
						style="${scrollAreaItemStyle}"
					>
						Длинный список, пункт {{ index }}
					</p>
				</ScrollArea>
			</ClientOnly>
		`,
	}),
}
