import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import Spinner from '../Spinner.vue'

type SpinnerStoryArgs = ComponentProps<typeof Spinner>

const meta = {
	title: 'UI/Spinner',
	component: Spinner,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['s', 'm', 'l'],
		},
		label: { control: 'text' },
	},
	args: {
		size: 'm',
		label: 'Загрузка',
	} satisfies SpinnerStoryArgs,
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const Base: Story = {
	render: args => ({
		components: { Spinner },
		setup() { return { args } },
		template: `
			<div style="display: flex; align-items: flex-start; gap: 24px;">
				<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
					<span style="color: #666; font-size: 12px; line-height: 1;">s</span>
					<Spinner v-bind="args" size="s" label="Загрузка, размер s" />
				</div>
				<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
					<span style="color: #666; font-size: 12px; line-height: 1;">m</span>
					<Spinner v-bind="args" size="m" label="Загрузка, размер m" />
				</div>
				<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
					<span style="color: #666; font-size: 12px; line-height: 1;">l</span>
					<Spinner v-bind="args" size="l" label="Загрузка, размер l" />
				</div>
			</div>
		`,
	}),
	play: async ({ canvas }) => {
		await expect(canvas.getByRole('status', { name: 'Загрузка, размер s' })).toBeVisible()
		await expect(canvas.getByRole('status', { name: 'Загрузка, размер m' })).toBeVisible()
		await expect(canvas.getByRole('status', { name: 'Загрузка, размер l' })).toBeVisible()
	},
}
