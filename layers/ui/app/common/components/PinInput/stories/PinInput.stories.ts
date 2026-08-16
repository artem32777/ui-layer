import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ConcreteComponent } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, fn } from 'storybook/test'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import PinInput from '../PinInput.vue'

type PinInputStoryArgs = ComponentProps<typeof PinInput>

const renderStates = (args: PinInputStoryArgs) => ({
	components: { PinInput, StoryGridItem, StoryGridRow },
	setup() { return { args } },
	template: `
		<StoryGridRow>
			<StoryGridItem title="default">
				<PinInput v-bind="args" v-model="args.modelValue" :invalid="false" :disabled="false" aria-label="Pin input" />
			</StoryGridItem>
			<StoryGridItem title="invalid">
				<PinInput v-bind="args" v-model="args.modelValue" invalid :disabled="false" aria-label="Invalid pin input" />
			</StoryGridItem>
			<StoryGridItem title="disabled">
				<PinInput v-bind="args" v-model="args.modelValue" :invalid="false" disabled aria-label="Disabled pin input" />
			</StoryGridItem>
		</StoryGridRow>
	`,
})

const meta = {
	title: 'UI/PinInput',
	component: PinInput as unknown as ConcreteComponent<PinInputStoryArgs>,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		modelValue: {
			description: 'Введённые значения полей.',
			control: 'object',
			table: { type: { summary: 'string[] | number[]' } },
		},
		type: {
			control: 'select',
			options: ['text', 'number'],
			table: { type: { summary: 'string | number' } },
		},
		invalid: { control: 'boolean' },
		disabled: { control: 'boolean' },
	},
	args: {
		modelValue: [],
		length: 6,
		placeholder: '○',
		mask: false,
		otp: false,
		type: 'text',
		invalid: false,
		disabled: false,
	} satisfies PinInputStoryArgs,
	render: (args: PinInputStoryArgs) => ({
		components: { PinInput },
		setup() { return { args } },
		template: '<PinInput v-bind="args" v-model="args.modelValue" aria-label="Pin input" />',
	}),
} satisfies Meta<PinInputStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const Base: Story = {
	render: renderStates,
}

export const Numeric: Story = {
	args: {
		type: 'number',
	} satisfies Partial<PinInputStoryArgs>,
}

export const Masked: Story = {
	args: {
		mask: true,
	} satisfies Partial<PinInputStoryArgs>,
}

export const Tests: Story = {
	args: {
		onComplete: fn(),
	},
	play: async ({ args, canvas, userEvent }) => {
		const inputs = canvas.getAllByRole('textbox')

		await userEvent.click(inputs[0]!)
		await userEvent.keyboard('123456')

		for (const [index, input] of inputs.entries())
			await expect(input).toHaveValue(String(index + 1))

		await expect(args.modelValue).toEqual(['1', '2', '3', '4', '5', '6'])
		await expect(args.onComplete).toHaveBeenCalledOnce()
		await expect(args.onComplete).toHaveBeenCalledWith(['1', '2', '3', '4', '5', '6'])
	},
}
