import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { type ConcreteComponent, reactive } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, fn } from 'storybook/test'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import { pinInputTypes } from '../PinInput.types.ts'
import PinInput from '../PinInput.vue'

type PinInputStoryArgs = ComponentProps<typeof PinInput>
const pinInputVariants = [
	{ title: 'base', type: 'text', mask: false },
	{ title: 'numeric', type: 'number', mask: false },
	{ title: 'masked', type: 'text', mask: true },
]

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
			options: pinInputTypes,
		},
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
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

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.pin-input-story--hovered',
			focusWithin: '.pin-input-story--focused',
		},
	},
	render: (args: PinInputStoryArgs) => ({
		components: { PinInput, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			return { args, pinInputVariants }
		},
		template: `
			<StoryGrid>
				<StoryGridSection
					v-for="variant in pinInputVariants"
					:key="variant.title"
					:title="variant.title"
				>
					<StoryGridRow>
						<StoryGridItem title="default">
							<PinInput
								v-bind="args"
								:type="variant.type"
								:mask="variant.mask"
							/>
						</StoryGridItem>
						<StoryGridItem title="hover">
							<PinInput
								v-bind="args"
								:type="variant.type"
								:mask="variant.mask"
								class="pin-input-story--hovered"
							/>
						</StoryGridItem>
						<StoryGridItem title="focus">
							<PinInput
								v-bind="args"
								:type="variant.type"
								:mask="variant.mask"
								class="pin-input-story--focused"
							/>
						</StoryGridItem>
						<StoryGridItem title="invalid">
							<PinInput
								v-bind="args"
								:type="variant.type"
								:mask="variant.mask"
								invalid
							/>
						</StoryGridItem>
						<StoryGridItem title="disabled">
							<PinInput
								v-bind="args"
								:type="variant.type"
								:mask="variant.mask"
								disabled
							/>
						</StoryGridItem>
					</StoryGridRow>
				</StoryGridSection>
			</StoryGrid>
		`,
	}),
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
