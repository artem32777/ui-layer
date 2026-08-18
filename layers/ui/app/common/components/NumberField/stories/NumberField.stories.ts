import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, within } from 'storybook/test'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import { numberFieldSizes, numberFieldVariants } from '../NumberField.types.ts'
import NumberField from '../NumberField.vue'

type NumberFieldStoryArgs = ComponentProps<typeof NumberField>

const meta = {
	title: 'UI/NumberField',
	component: NumberField,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		modelValue: {
			description: 'Текущее значение.',
			table: { type: { summary: 'number | null' } },
		},
		variant: { control: 'select', options: numberFieldVariants },
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
		size: { control: 'select', options: numberFieldSizes },
	},
	args: {
		modelValue: 10,
		variant: 'primary',
		disabled: false,
		invalid: false,
		size: 'medium',
		step: 1,
	} satisfies NumberFieldStoryArgs,
	render: (args: NumberFieldStoryArgs) => ({
		components: { NumberField },
		setup() { return { args } },
		template: '<label>Количество<NumberField v-bind="args" v-model="args.modelValue" aria-label="Количество" /></label>',
	}),
} satisfies Meta<typeof NumberField>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.number-field-story--hovered',
			focusWithin: '.number-field-story--focused',
		},
	},
	render: (args: NumberFieldStoryArgs) => ({
		components: { NumberField, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			return { args, numberFieldVariants }
		},
		template: `
			<StoryGrid>
				<StoryGridSection
					v-for="variant in numberFieldVariants"
					:key="variant"
					:title="variant"
				>
					<StoryGridRow>
						<StoryGridItem title="default" style="width: 180px;">
							<NumberField
								v-bind="args"
								v-model="args.modelValue"
								:variant="variant"
						
							/>
						</StoryGridItem>
						<StoryGridItem title="hover" style="width: 180px;">
							<NumberField
								v-bind="args"
								v-model="args.modelValue"
								:variant="variant"
								class="number-field-story--hovered"
							/>
						</StoryGridItem>
						<StoryGridItem title="focus" style="width: 180px;">
							<NumberField
								v-bind="args"
								v-model="args.modelValue"
								:variant="variant"
								class="number-field-story--focused"
							/>
						</StoryGridItem>
						<StoryGridItem title="invalid" style="width: 180px;">
							<NumberField
								v-bind="args"
								v-model="args.modelValue"
								:variant="variant"
								invalid
							/>
						</StoryGridItem>
						<StoryGridItem title="disabled" style="width: 180px;">
							<NumberField
								v-bind="args"
								v-model="args.modelValue"
								:variant="variant"
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
		const numberField = canvas.getByRole('group', { name: 'Количество' })
		const input = within(numberField).getByRole('spinbutton')
		const increment = within(numberField).getByRole('button', { name: 'Increase' })

		await expect(input).toHaveAttribute('aria-valuenow', '10')
		await userEvent.click(increment)
		await expect(input).toHaveAttribute('aria-valuenow', '11')
		await userEvent.keyboard('{ArrowDown}')
		await expect(input).toHaveAttribute('aria-valuenow', '10')
	},
}
