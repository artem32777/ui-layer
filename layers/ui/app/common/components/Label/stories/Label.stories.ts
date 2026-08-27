import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { labelSizes, labelVariants } from '../Label.types.ts'
import Label from '../Label.vue'
import LabelStoryStates from './LabelStoryStates.vue'

type LabelStoryArgs = ComponentProps<typeof Label>

const meta = {
	title: 'UI/Label',
	component: Label,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		variant: { control: 'select', options: labelVariants },
		size: { control: 'select', options: labelSizes },
		text: { control: 'text' },
	},
	args: {
		text: 'Label',
		variant: 'primary',
		size: 'medium',
	} satisfies LabelStoryArgs,
	render: (args: LabelStoryArgs) => ({
		components: { Label },
		setup() { return { args } },
		template: '<Label v-bind="args" />',
	}),
} satisfies Meta<LabelStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const Base: Story = {}

export const States: Story = {
	render: (args: LabelStoryArgs) => ({
		components: { LabelStoryStates },
		setup() {
			return { args }
		},
		template: '<LabelStoryStates :text="args.text" />',
	}),
}
