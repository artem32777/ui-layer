import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import RadioGroup from '../RadioGroup.vue'
import radioGroupTypesSource from '../RadioGroup.types.ts?raw'

type RadioGroupStoryArgs = ComponentProps<typeof RadioGroup>

const defaultOptions = [
	{ label: 'False', value: 'false' },
	{ label: 'True', value: 'true' },
	{ label: 'Disabled', value: 'disabled', disabled: true },
]

const radioGroupChecked = ['', 'true']

const meta = {
	title: 'UI/RadioGroup',
	component: RadioGroup,
	parameters: { a11y: { test: 'error' } },
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
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
	},
	args: {
		modelValue: 'true',
		options: defaultOptions,
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
	parameters: {
		pseudo: {
			hover: '.radio-group-story--hovered',
			focusWithin: '.radio-group-story--focused',
		},
	},
	render: (args: RadioGroupStoryArgs) => ({
		components: { RadioGroup, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			return { args, radioGroupChecked }
		},
		template: `
			<StoryGrid>
				<StoryGridSection
					v-for="checked in radioGroupChecked"
					:key="checked || 'base'"
					:title="checked ? 'checked' : 'base'"
				>
					<StoryGridRow>
						<StoryGridItem title="default">
							<RadioGroup
								v-bind="args"
								:model-value="checked"
								:aria-label="(checked ? 'checked' : 'base') + ' default'"
							/>
						</StoryGridItem>
						<StoryGridItem title="hover">
							<RadioGroup
								v-bind="args"
								:model-value="checked"
								class="radio-group-story--hovered"
								:aria-label="(checked ? 'checked' : 'base') + ' hover'"
							/>
						</StoryGridItem>
						<StoryGridItem title="focus">
							<RadioGroup
								v-bind="args"
								:model-value="checked"
								class="radio-group-story--focused"
								:aria-label="(checked ? 'checked' : 'base') + ' focus'"
							/>
						</StoryGridItem>
						<StoryGridItem title="invalid">
							<RadioGroup
								v-bind="args"
								:model-value="checked"
								invalid
								:aria-label="(checked ? 'checked' : 'base') + ' invalid'"
							/>
						</StoryGridItem>
						<StoryGridItem title="disabled">
							<RadioGroup
								v-bind="args"
								:model-value="checked"
								disabled
								:aria-label="(checked ? 'checked' : 'base') + ' disabled'"
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
