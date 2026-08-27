import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import { chipTypes } from '../Chip.types.ts'
import Chip from '../Chip.vue'
import ChipStoryStates from './ChipStoryStates.vue'

type ChipStoryArgs = ComponentProps<typeof Chip>

const meta = {
	title: 'UI/Chip',
	component: Chip,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		type: { control: 'select', options: chipTypes },
		text: { control: 'text' },
		modelValue: { control: 'boolean' },
		disabled: { control: 'boolean' },
	},
	args: {
		text: 'Chip',
		type: 'toggle',
		modelValue: false,
		disabled: false,
	} satisfies ChipStoryArgs,
	render: (args: ChipStoryArgs) => ({
		components: { Chip },
		setup() { return { args } },
		template: '<Chip v-bind="args" v-model="args.modelValue" />',
	}),
} satisfies Meta<ChipStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const Base: Story = {}

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.chip-story--hovered',
		},
	},
	render: (args: ChipStoryArgs) => ({
		components: { ChipStoryStates },
		setup() {
			return { args }
		},
		template: '<ChipStoryStates :text="args.text" />',
	}),
}

export const Tests: Story = {
	play: async ({ canvas, userEvent }) => {
		const chip = canvas.getByRole('button', { name: 'Chip' })

		await expect(chip).toHaveAttribute('aria-pressed', 'false')
		await userEvent.click(chip)
		await expect(chip).toHaveAttribute('aria-pressed', 'true')
		await userEvent.click(chip)
		await expect(chip).toHaveAttribute('aria-pressed', 'false')
	},
}
