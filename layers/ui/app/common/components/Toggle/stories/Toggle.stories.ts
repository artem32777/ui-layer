import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import { toggleSizes, toggleVariants } from '../Toggle.types.ts'
import Toggle from '../Toggle.vue'

type ToggleStoryArgs = ComponentProps<typeof Toggle>
const togglePressed = [false, true]

const meta = {
	title: 'UI/Toggle',
	component: Toggle,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		modelValue: {
			description: 'Нажатое состояние переключателя.',
			control: 'boolean',
			table: { type: { summary: 'boolean' } },
		},
		variant: { control: 'select', options: toggleVariants },
		size: { control: 'select', options: toggleSizes },
		disabled: { control: 'boolean' },
	},
	args: {
		modelValue: false,
		variant: 'primary',
		size: 'medium',
		disabled: false,
	} satisfies ToggleStoryArgs,
	render: (args: ToggleStoryArgs) => ({
		components: { Toggle },
		setup() { return { args } },
		template: '<Toggle v-bind="args" v-model="args.modelValue" aria-label="Полужирное начертание">B</Toggle>',
	}),
} satisfies Meta<typeof Toggle>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.toggle-story--hovered',
			focusVisible: '.toggle-story--focused',
		},
	},
	render: (args: ToggleStoryArgs) => ({
		components: { Toggle, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			return { args, toggleVariants, togglePressed }
		},
		template: `
			<StoryGrid>
				<StoryGridSection
					v-for="variant in toggleVariants"
					:key="variant"
					:title="variant"
				>
					<StoryGridRow
						v-for="pressed in togglePressed"
						:key="String(pressed)"
					>
						<StoryGridItem :title="pressed ? 'on' : 'default'">
							<Toggle
								v-bind="args"
								:variant="variant"
								:model-value="pressed"
								aria-label="Полужирное начертание"
							>
								B
							</Toggle>
						</StoryGridItem>
						<StoryGridItem title="hover">
							<Toggle
								v-bind="args"
								:variant="variant"
								:model-value="pressed"
								class="toggle-story--hovered"
								aria-label="Полужирное начертание hover"
							>
								B
							</Toggle>
						</StoryGridItem>
						<StoryGridItem title="focus">
							<Toggle
								v-bind="args"
								:variant="variant"
								:model-value="pressed"
								class="toggle-story--focused"
								aria-label="Полужирное начертание focus"
							>
								B
							</Toggle>
						</StoryGridItem>
						<StoryGridItem title="disabled">
							<Toggle
								v-bind="args"
								:variant="variant"
								:model-value="pressed"
								disabled
								aria-label="Полужирное начертание disabled"
							>
								B
							</Toggle>
						</StoryGridItem>
					</StoryGridRow>
				</StoryGridSection>
			</StoryGrid>
		`,
	}),
}

export const Tests: Story = {
	play: async ({ args, canvas, userEvent }) => {
		const toggle = canvas.getByRole('button', { name: 'Полужирное начертание' })

		await expect(toggle).toHaveAttribute('aria-pressed', 'false')
		await userEvent.click(toggle)
		await expect(toggle).toHaveAttribute('aria-pressed', 'true')
		await expect(args.modelValue).toBe(true)
		await userEvent.keyboard(' ')
		await expect(toggle).toHaveAttribute('aria-pressed', 'false')
		await expect(args.modelValue).toBe(false)
	},
}
