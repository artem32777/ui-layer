import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { badgeSizes, badgeVariants } from '../Badge.types.ts'
import Badge from '../Badge.vue'
import BadgeStoryStates from './BadgeStoryStates.vue'

type BadgeStoryArgs = ComponentProps<typeof Badge>

const meta = {
	title: 'UI/Badge',
	component: Badge,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		variant: { control: 'select', options: badgeVariants },
		size: { control: 'select', options: badgeSizes },
		text: { control: 'text' },
	},
	args: {
		text: '3',
		variant: 'primary',
		size: 'medium',
	} satisfies BadgeStoryArgs,
	render: (args: BadgeStoryArgs) => ({
		components: { Badge },
		setup() { return { args } },
		template: '<Badge v-bind="args" />',
	}),
} satisfies Meta<BadgeStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const Base: Story = {}

export const States: Story = {
	render: (args: BadgeStoryArgs) => ({
		components: { BadgeStoryStates },
		setup() {
			return { args }
		},
		template: '<BadgeStoryStates :text="args.text" />',
	}),
}
