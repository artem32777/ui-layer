import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import { getStringsArrFromKey } from '~/common/utils/getStringsArrFromKey'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import RadioGroup from '../RadioGroup.vue'
import radioGroupTypesSource from '../RadioGroup.types.ts?raw'

type RadioGroupStoryArgs = ComponentProps<typeof RadioGroup>
type RadioGroupState = NonNullable<RadioGroupStoryArgs['state']>

const getOptions = getStringsArrFromKey<RadioGroupStoryArgs>()
const defaultOptions = [
	{ label: 'False', value: 'false' },
	{ label: 'True', value: 'true' },
	{ label: 'Disabled', value: 'disabled', disabled: true },
]

const radioGroupStates = ['default', 'hovered', 'focused', 'invalid', 'disabled'] satisfies RadioGroupState[]
const radioGroupChecked = ['', 'true']

const meta = {
	title: 'UI/RadioGroup',
	component: RadioGroup,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		modelValue: {
			description: 'Выбранное значение группы радиокнопок.',
			control: 'text',
			table: { type: { summary: 'string' } },
		},
		options: {
			control: 'object',
			table: {
				type: {
					summary: 'RadioOption[]',
					detail: radioGroupTypesSource.trim(),
				},
			},
		},
		invalid: { control: 'boolean' },
		disabled: { control: 'boolean' },
		state: {
			control: 'select',
			options: getOptions('state', ['default', 'hovered', 'focused', 'invalid', 'disabled']),
		},
	},
	args: {
		modelValue: 'true',
		options: defaultOptions,
		state: 'default',
		invalid: false,
		disabled: false,
	} satisfies RadioGroupStoryArgs,
	render: (args: RadioGroupStoryArgs) => ({
		components: { RadioGroup },
		setup() { return { args } },
		template: '<RadioGroup v-bind="args" v-model="args.modelValue" />',
	}),
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
	args: {
		modelValue: '',
	} satisfies Partial<RadioGroupStoryArgs>,
}

export const States: Story = {
	render: (args: RadioGroupStoryArgs) => ({
		components: { RadioGroup, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			return { args, radioGroupChecked, radioGroupStates }
		},
		template: `
			<StoryGrid>
				<StoryGridSection
					v-for="checked in radioGroupChecked"
					:key="checked || 'base'"
					:title="checked ? 'checked' : 'base'"
				>
					<StoryGridRow>
						<StoryGridItem
							v-for="state in radioGroupStates"
							:key="state"
							:title="state"
						>
							<RadioGroup
								v-bind="args"
								:model-value="checked"
								:state="state"
								:invalid="state === 'invalid'"
								:disabled="state === 'disabled'"
								:aria-label="(checked ? 'checked' : 'base') + ' ' + state"
							/>
						</StoryGridItem>
					</StoryGridRow>
				</StoryGridSection>
			</StoryGrid>
		`,
	}),
}

export const Tests: Story = {
	play: async ({ canvas, userEvent }) => {
		const falseOption = canvas.getByRole('radio', { name: 'False' })
		const trueOption = canvas.getByRole('radio', { name: 'True' })
		const disabledOption = canvas.getByRole('radio', { name: 'Disabled' })

		await expect(trueOption).toBeChecked()
		await expect(falseOption).not.toBeChecked()
		await expect(disabledOption).toBeDisabled()

		await userEvent.click(falseOption)
		await expect(falseOption).toBeChecked()
		await expect(trueOption).not.toBeChecked()

		await userEvent.keyboard('{ArrowDown}')
		await expect(trueOption).toHaveFocus()
		await userEvent.keyboard(' ')
		await expect(trueOption).toBeChecked()
	},
}
