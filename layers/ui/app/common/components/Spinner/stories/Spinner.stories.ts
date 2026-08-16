import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
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
		components: { Spinner, StoryGridItem, StoryGridRow },
		setup() { return { args } },
		template: `
			<StoryGridRow>
				<StoryGridItem title="s" style="align-items: center;">
					<Spinner v-bind="args" size="s" label="Загрузка, размер s" />
				</StoryGridItem>
				<StoryGridItem title="m" style="align-items: center;">
					<Spinner v-bind="args" size="m" label="Загрузка, размер m" />
				</StoryGridItem>
				<StoryGridItem title="l" style="align-items: center;">
					<Spinner v-bind="args" size="l" label="Загрузка, размер l" />
				</StoryGridItem>
			</StoryGridRow>
		`,
	}),
	play: async ({ canvas }) => {
		await expect(canvas.getByRole('status', { name: 'Загрузка, размер s' })).toBeVisible()
		await expect(canvas.getByRole('status', { name: 'Загрузка, размер m' })).toBeVisible()
		await expect(canvas.getByRole('status', { name: 'Загрузка, размер l' })).toBeVisible()
	},
}
