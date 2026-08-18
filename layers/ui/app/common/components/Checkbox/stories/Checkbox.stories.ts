import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import Checkbox from '../Checkbox.vue'

type CheckboxStoryArgs = ComponentProps<typeof Checkbox>
const checkboxChecked = [false, true]

const meta = {
	title: 'UI/Checkbox',
	component: Checkbox,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		modelValue: {
			description: 'Выбранное состояние чекбокса.',
			control: 'select',
			options: [false, true],
		},
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
		size: { control: 'number' },
		iconSize: { control: 'number' },
	},
	args: {
		modelValue: false,
		size: 20,
		iconSize: 14,
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
	parameters: {
		pseudo: {
			hover: '.checkbox-story--hovered',
			focusWithin: '.checkbox-story--focused',
		},
	},
	render: (args: CheckboxStoryArgs) => ({
		components: { Checkbox, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			return { args, checkboxChecked }
		},
		template: `
			<StoryGrid>
				<StoryGridSection
					v-for="checked in checkboxChecked"
					:key="String(checked)"
					:title="checked ? 'checked' : 'default'"
				>
					<StoryGridRow>
						<StoryGridItem title="default">
							<Checkbox v-bind="args" :model-value="checked" >
								Checkbox
							</Checkbox>
						</StoryGridItem>
						<StoryGridItem title="hover">
							<Checkbox v-bind="args" :model-value="checked"  class="checkbox-story--hovered">
								Checkbox
							</Checkbox>
						</StoryGridItem>
						<StoryGridItem title="focus">
							<Checkbox v-bind="args" :model-value="checked"  class="checkbox-story--focused">
								Checkbox
							</Checkbox>
						</StoryGridItem>
						<StoryGridItem title="disabled">
							<Checkbox v-bind="args" :model-value="checked" :disabled="true" >
								Checkbox
							</Checkbox>
						</StoryGridItem>
						<StoryGridItem title="invalid">
							<Checkbox v-bind="args" :model-value="checked" :invalid="true">
								Checkbox
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
