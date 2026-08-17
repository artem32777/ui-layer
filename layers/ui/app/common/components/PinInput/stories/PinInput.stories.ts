import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ConcreteComponent } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, fn } from 'storybook/test'
import { getStringsArrFromKey } from '~/common/utils/getStringsArrFromKey'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import PinInput from '../PinInput.vue'

type PinInputStoryArgs = ComponentProps<typeof PinInput>
type PinInputState = NonNullable<PinInputStoryArgs['state']>

const getOptions = getStringsArrFromKey<PinInputStoryArgs>()
const pinInputStates = ['default', 'hovered', 'focused', 'invalid', 'disabled'] satisfies PinInputState[]
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
			options: ['text', 'number'],
			table: { type: { summary: 'string | number' } },
		},
		state: {
			control: 'select',
			options: getOptions('state', ['default', 'hovered', 'focused', 'invalid', 'disabled']),
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
		state: 'default',
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
	render: (args: PinInputStoryArgs) => ({
		components: { PinInput, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			return { args, pinInputStates, pinInputVariants }
		},
		template: `
			<StoryGrid>
				<StoryGridSection
					v-for="variant in pinInputVariants"
					:key="variant.title"
					:title="variant.title"
				>
					<StoryGridRow>
						<StoryGridItem
							v-for="state in pinInputStates"
							:key="state"
							:title="state"
						>
							<PinInput
								v-bind="args"
								v-model="args.modelValue"
								:type="variant.type"
								:mask="variant.mask"
								:state="state"
								:invalid="state === 'invalid'"
								:disabled="state === 'disabled'"
								:aria-label="'Pin input ' + variant.title + ' ' + state"
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
