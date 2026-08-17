import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, within } from 'storybook/test'
import { getStringsArrFromKey } from '~/common/utils/getStringsArrFromKey'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import NumberField from '../NumberField.vue'

type NumberFieldStoryArgs = ComponentProps<typeof NumberField>
type NumberFieldState = NonNullable<NumberFieldStoryArgs['state']>
type NumberFieldVariant = NonNullable<NumberFieldStoryArgs['variant']>

const getOptions = getStringsArrFromKey<NumberFieldStoryArgs>()
const numberFieldStates = ['default', 'hovered', 'focused', 'invalid', 'disabled'] satisfies NumberFieldState[]
const numberFieldVariants = ['base', 'secondary'] satisfies NumberFieldVariant[]

const meta = {
	title: 'UI/NumberField',
	component: NumberField,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		modelValue: {
			description: 'Текущее значение.',
			table: { type: { summary: 'number | null' } },
		},
		variant: {
			control: 'select',
			options: getOptions('variant', ['base', 'secondary']),
		},
		state: {
			control: 'select',
			options: getOptions('state', ['default', 'hovered', 'focused', 'invalid', 'disabled']),
		},
		size: {
			control: 'select',
			options: getOptions('size', ['sm', 'md', 'lg']),
		},
		disabled: { control: 'boolean' },
	},
	args: {
		modelValue: 10,
		variant: 'base',
		state: 'default',
		size: 'md',
		step: 1,
		disabled: false,
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
	render: (args: NumberFieldStoryArgs) => ({
		components: { NumberField, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			return { args, numberFieldStates, numberFieldVariants }
		},
		template: `
			<StoryGrid>
				<StoryGridSection
					v-for="variant in numberFieldVariants"
					:key="variant"
					:title="variant"
				>
					<StoryGridRow>
						<StoryGridItem
							v-for="state in numberFieldStates"
							:key="state"
							:title="state"
							style="width: 180px;"
						>
							<NumberField
								v-bind="args"
								v-model="args.modelValue"
								:variant="variant"
								:state="state"
								:disabled="state === 'disabled'"
								:aria-label="'Количество ' + state"
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
