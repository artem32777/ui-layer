import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import ToggleGroup from '../ToggleGroup.vue'
import { toggleGroupTypes } from '../ToggleGroup.types.ts'
import toggleGroupTypesSource from '../ToggleGroup.types.ts?raw'
import type { ToggleGroupItemType } from '../ToggleGroup.types.ts'

type ToggleGroupStoryArgs = ComponentProps<typeof ToggleGroup>

const options = [
	{ label: 'L', value: 'left' },
	{ label: 'C', value: 'center' },
	{ label: 'R', value: 'right' },
] satisfies ToggleGroupItemType[]

const meta = {
	title: 'UI/ToggleGroup',
	component: ToggleGroup,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		modelValue: { description: 'Значение выбранного айтема' },
		items: {
			table: {
				type: {
					summary: 'ToggleGroupItemType[]',
					detail: toggleGroupTypesSource.trim(),
				},
			},
		},
		type: { control: 'select', options: toggleGroupTypes },
		disabled: { control: 'boolean' },
	},
	args: {
		modelValue: 'center',
		items: options,
		type: 'single',
		disabled: false,
	} satisfies ToggleGroupStoryArgs,
	render: (args: ToggleGroupStoryArgs) => ({
		components: { ToggleGroup },
		setup() { return { args } },
		template: '<ToggleGroup v-bind="args" v-model="args.modelValue" />',
	}),
} satisfies Meta<typeof ToggleGroup>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.toggle-group-story--hovered',
			focusWithin: '.toggle-group-story--focused',
		},
	},
	render: (args: ToggleGroupStoryArgs) => ({
		components: { ToggleGroup, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			return { args, toggleGroupTypes }
		},
		template: `
			<StoryGrid>
				<StoryGridSection
					v-for="type in toggleGroupTypes"
					:key="type"
					:title="type"
				>
					<StoryGridRow>
						<StoryGridItem title="default">
							<ToggleGroup
								v-bind="args"
								:type="type"
								:model-value="type === 'multiple' ? ['left', 'right'] : 'center'"
							/>
						</StoryGridItem>
						<StoryGridItem title="hover">
							<ToggleGroup
								v-bind="args"
								:type="type"
								:model-value="type === 'multiple' ? ['left', 'right'] : 'center'"
								class="toggle-group-story--hovered"
							/>
						</StoryGridItem>
						<StoryGridItem title="focus">
							<ToggleGroup
								v-bind="args"
								:type="type"
								:model-value="type === 'multiple' ? ['left', 'right'] : 'center'"
								class="toggle-group-story--focused"
							/>
						</StoryGridItem>
						<StoryGridItem title="disabled">
							<ToggleGroup
								v-bind="args"
								:type="type"
								:model-value="type === 'multiple' ? ['left', 'right'] : 'center'"
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
		const left = canvas.getByRole('button', { name: 'L' })
		const center = canvas.getByRole('button', { name: 'C' })

		await expect(left).toHaveAttribute('aria-pressed', 'false')
		await expect(center).toHaveAttribute('aria-pressed', 'true')

		await userEvent.click(left)
		await expect(left).toHaveAttribute('aria-pressed', 'true')
		await expect(center).toHaveAttribute('aria-pressed', 'false')
	},
}
