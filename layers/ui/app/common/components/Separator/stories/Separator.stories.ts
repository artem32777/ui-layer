import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import Separator from '../Separator.vue'

type SeparatorStoryArgs = ComponentProps<typeof Separator>

const meta = {
	title: 'UI/Separator',
	component: Separator,
	argTypes: {
		orientation: {
			control: 'select',
			options: ['horizontal', 'vertical'],
		},
		decorative: { control: 'boolean' },
	},
	args: {
		orientation: 'horizontal',
		decorative: false,
	} satisfies SeparatorStoryArgs,
} satisfies Meta<typeof Separator>

export default meta

type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
	render: args => ({
		components: { Separator },
		setup() { return { args } },
		template: `
			<div style="width: 320px;">
				<p>Содержимое над разделителем</p>
				<Separator v-bind="args" />
				<p>Содержимое под разделителем</p>
			</div>
		`,
	}),
}

export const Vertical: Story = {
	args: {
		orientation: 'vertical',
	},
	render: args => ({
		components: { Separator },
		setup() { return { args } },
		template: `
			<div style="display: flex; align-items: center; gap: 12px;">
				<span>Слева</span>
				<Separator v-bind="args" />
				<span>Справа</span>
			</div>
		`,
	}),
}

export const Semantic: Story = {
	args: {
		decorative: false,
	},
}
