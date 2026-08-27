import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import RadioGroup from '../RadioGroup.vue'
import radioGroupTypesSource from '../RadioGroup.types.ts?raw'
import { ref } from 'vue'
import { ThemeNamesArray } from '#layers/ui/app/config/theme.ts'

type RadioGroupStoryArgs = ComponentProps<typeof RadioGroup>

const defaultOptions = [
	{ label: 'False', value: 'false' },
	{ label: 'True', value: 'true' },
	{ label: 'Disabled', value: 'disabled', disabled: true },
]

const radioGroupChecked = ['', 'false']

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
		theme: { control: ThemeNamesArray },
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
	},
	args: {
		modelValue: undefined,
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

export const Base: Story = {

}

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.radio-group-story--hovered .radio-group__item:first-child',
		},
	},
	render: (args: RadioGroupStoryArgs) => ({
		components: { RadioGroup, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			const value = ref('false')
			return { args, radioGroupChecked, value }
		},
		template: `
			<StoryGrid>
				<StoryGridSection
					v-for="checked in radioGroupChecked"
					:key="checked || 'default'"
					:title="checked ? 'checked' : 'default'"
				>
					<StoryGridRow>
						<StoryGridItem title="default">
							<RadioGroup
								v-bind="args"
								:model-value="checked"
							/>
						</StoryGridItem>
						<StoryGridItem title="hover">
							<RadioGroup
								v-bind="args"
								:model-value="checked"
								class="radio-group-story--hovered"
							/>
						</StoryGridItem>
						<StoryGridItem title="disabled">
							<RadioGroup
									v-bind="args"
									:model-value="checked"
									disabled
							/>
						</StoryGridItem>
						<StoryGridItem title="invalid">
							<RadioGroup
								v-bind="args"
								:model-value="checked"
								invalid
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
