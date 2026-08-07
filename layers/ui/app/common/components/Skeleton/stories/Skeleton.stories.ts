import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import Skeleton from '../Skeleton.vue'

type SkeletonStoryArgs = ComponentProps<typeof Skeleton>

const meta = {
	title: 'UI/Skeleton',
	component: Skeleton,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		width: { control: 'text' },
		height: { control: 'text' },
		borderRadius: { control: 'text' },
		animated: { control: 'boolean' },
	},
	args: {
		width: '320px',
		height: '1em',
		borderRadius: '4px',
		animated: true,
	} satisfies SkeletonStoryArgs,
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {}

export const WithoutAnimation: Story = {
	args: {
		animated: false,
	} satisfies Partial<SkeletonStoryArgs>,
}

export const Composition: Story = {
	render: args => ({
		components: { Skeleton },
		setup() { return { args } },
		template: `
			<div style="display: flex; flex-direction: column; gap: 12px; width: 320px;">
				<Skeleton v-bind="args" width="64px" height="64px" border-radius="50%" />
				<Skeleton v-bind="args" width="75%" height="20px" />
				<Skeleton v-bind="args" width="100%" height="14px" />
				<Skeleton v-bind="args" width="90%" height="14px" />
			</div>
		`,
	}),
}
