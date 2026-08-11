import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import ToggleGroup from '../ToggleGroup.vue'
import toggleGroupTypesSource from '../ToggleGroup.types.ts?raw'
import type { ToggleGroupItemType } from '../ToggleGroup.types.ts'

type ToggleGroupStoryArgs = ComponentProps<typeof ToggleGroup>

const options = [
	{ label: 'L', value: 'left' },
	{ label: 'C', value: 'center' },
	{ label: 'R', value: 'right' },
] satisfies ToggleGroupItemType[]

const meta = {
	title: 'UI/ToggleGroup',
	component: ToggleGroup,
	argTypes: {
		modelValue: { description: 'Значение выбранного айтема' },
		items: {
			table: {
				type: {
					summary: 'ToggleGroupItemType[]',
					detail: toggleGroupTypesSource.trim(),
				},
			},
		},
		type: { control: 'select', options: ['single', 'multiple'] },
	},
	args: {
		modelValue: 'center',
		items: options,
		type: 'single',
	} satisfies ToggleGroupStoryArgs,
	render: (args: ToggleGroupStoryArgs) => ({
		components: { ToggleGroup },
		setup() { return { args } },
		template: '<ToggleGroup v-model="args.modelValue" :items="args.items" :type="args.type" />',
	}),
} satisfies Meta<typeof ToggleGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Single: Story = {}

export const Multiple: Story = {
	args: {
		modelValue: ['left', 'right'],
		type: 'multiple',
	},
}

export const Tests: Story = {
	play: async ({ canvas, userEvent }) => {
		const left = canvas.getByRole('button', { name: 'L' })
		const center = canvas.getByRole('button', { name: 'C' })

		await expect(left).toHaveAttribute('aria-pressed', 'false')
		await expect(center).toHaveAttribute('aria-pressed', 'true')

		await userEvent.click(left)
		await expect(left).toHaveAttribute('aria-pressed', 'true')
		await expect(center).toHaveAttribute('aria-pressed', 'false')
	},
}
