import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import Switch from '../Switch.vue'

type SwitchStoryArgs = ComponentProps<typeof Switch>
const switchChecked = [false, true]

const meta = {
	title: 'UI/Switch',
	component: Switch,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		modelValue: {
			description: 'Включённое состояние переключателя.',
			control: 'boolean',
			table: { type: { summary: 'boolean' } },
		},
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
	},
	args: {
		modelValue: false,
		disabled: false,
		invalid: false,
	} satisfies SwitchStoryArgs,
	render: (args: SwitchStoryArgs) => ({
		components: { Switch },
		setup() { return { args } },
		template: '<Switch v-bind="args" v-model="args.modelValue" aria-label="Переключатель" />',
	}),
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.switch-story--hovered',
			focusVisible: '.switch-story--focused',
		},
	},
	render: (args: SwitchStoryArgs) => ({
		components: { Switch, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			return { args, switchChecked }
		},
		template: `
			<StoryGrid>
				<StoryGridSection
					v-for="checked in switchChecked"
					:key="String(checked)"
					:title="checked ? 'checked' : 'default'"
				>
					<StoryGridRow>
						<StoryGridItem title="default">
							<Switch
								v-bind="args"
								:model-value="checked"
							/>
						</StoryGridItem>
						<StoryGridItem title="hover">
							<Switch
								v-bind="args"
								:model-value="checked"
								class="switch-story--hovered"
							/>
						</StoryGridItem>
						<StoryGridItem title="focus">
							<Switch
								v-bind="args"
								:model-value="checked"
								class="switch-story--focused"
							/>
						</StoryGridItem>
						<StoryGridItem title="invalid">
							<Switch
								v-bind="args"
								:model-value="checked"
								invalid
							/>
						</StoryGridItem>
						<StoryGridItem title="disabled">
							<Switch
								v-bind="args"
								:model-value="checked"
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
	play: async ({ canvas, userEvent }) => {
		const switchControl = canvas.getByRole('switch')

		await expect(switchControl).not.toBeChecked()
		await userEvent.click(switchControl)
		await expect(switchControl).toBeChecked()
		await userEvent.keyboard(' ')
		await expect(switchControl).not.toBeChecked()
	},
}
