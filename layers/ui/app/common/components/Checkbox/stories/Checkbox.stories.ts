import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import { getStringsArrFromKey } from '~/common/utils/getStringsArrFromKey'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import Checkbox from '../Checkbox.vue'

type CheckboxStoryArgs = ComponentProps<typeof Checkbox>
const getOptions = getStringsArrFromKey<CheckboxStoryArgs>()

type CheckboxState = NonNullable<CheckboxStoryArgs['state']>
const checkboxStates = ['default', 'hovered', 'focused', 'pressed', 'disabled'] satisfies CheckboxState[]
const checkboxChecked = [false, true]

const meta = {
	title: 'UI/Checkbox',
	component: Checkbox,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		modelValue: {
			description: 'Выбранное состояние чекбокса.',
			control: 'select',
			options: [false, true],
		},
		state: {
			control: 'select',
			options: getOptions('state', ['default', 'disabled', 'focused', 'hovered', 'pressed']),
		},
		size: { control: 'number' },
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
	},
	args: {
		modelValue: false,
		state: 'default',
		size: 20,
		disabled: false,
		invalid: false,
	} satisfies CheckboxStoryArgs,
	render: (args: CheckboxStoryArgs) => ({
		components: { Checkbox },
		setup() {
			return { args }
		},
		template: '<Checkbox v-bind="args" v-model="args.modelValue">Текст чекбокса</Checkbox>',
	}),
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const States: Story = {
	render: (args: CheckboxStoryArgs) => ({
		components: { Checkbox, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			return { args, checkboxStates, checkboxChecked }
		},
		template: `
			<StoryGrid>
				<StoryGridSection
					v-for="checked in checkboxChecked"
					:key="String(checked)"
					:title="checked ? 'checked' : 'base'"
				>
					<StoryGridRow>
						<StoryGridItem
							v-for="state in checkboxStates"
							:key="state"
							:title="state"
						>
							<Checkbox v-bind="args" :model-value="checked" :state="state">
								Текст
							</Checkbox>
						</StoryGridItem>
					</StoryGridRow>
				</StoryGridSection>
			</StoryGrid>
		`,
	}),
}

export const Tests: Story = {
	play: async ({ canvas, userEvent }) => {
		const checkbox = canvas.getByRole('checkbox', { name: 'Текст чекбокса' })

		await expect(checkbox).not.toBeChecked()
		await userEvent.click(checkbox)
		await expect(checkbox).toBeChecked()
		await userEvent.keyboard(' ')
		await expect(checkbox).not.toBeChecked()
	},
}
