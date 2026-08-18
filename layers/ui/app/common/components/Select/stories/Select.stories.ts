import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ConcreteComponent } from 'vue'
import { reactive } from 'vue'
import { expect, waitFor, within } from 'storybook/test'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import Select from '../Select.vue'
import selectTypesSource from '../Select.types.ts?raw'
import type { SelectProps, SelectOption } from '../Select.types.ts'
import { selectSizes, selectVariants } from '../Select.types'

type SelectStoryArgs = SelectProps<boolean> & {
	modelValue?: string | string[]
}

const options: SelectOption[] = [
	{ label: 'Москва', value: 'moscow' },
	{ label: 'Санкт-Петербург', value: 'saint-petersburg' },
	{ label: 'Казань', value: 'kazan' },
	{ label: 'Минск', value: 'minsk' },
	{ label: 'Гомель', value: 'gomel1', disabled: true },
	{ label: 'Гомель2', value: 'gomel2' },
	{ label: 'Гомель3', value: 'gomel3' },
]

const meta = {
	title: 'UI/Select',
	component: Select as unknown as ConcreteComponent<SelectStoryArgs>,
	argTypes: {
		modelValue: {
			description: 'Выбранное значение или значения',
			control: 'object',
			table: { type: { summary: 'string | string[]' } },
		},
		options: {
			control: 'object',
			table: {
				type: {
					summary: 'SelectOption[]',
					detail: selectTypesSource.trim(),
				},
			},
		},
		placeholder: { control: 'text' },
		variant: { control: 'select', options: selectVariants },
		size: { control: 'select', options: selectSizes },
		multiple: { control: 'boolean' },
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
	},
	args: {
		options,
		modelValue: undefined,
		placeholder: 'Выберите город',
		variant: 'primary',
		size: 'medium',
		disabled: false,
		multiple: false,
		invalid: false,
	} satisfies SelectStoryArgs,
	render: (args: SelectStoryArgs) => ({
		components: { Select },
		setup() {
			return { args }
		},
		template: `
      <Select
          v-model="args.modelValue"
          :placeholder="args.placeholder"
          :variant="args.variant"
          :size="args.size"
          :options="args.options"
          :disabled="args.disabled"
          :multiple="args.multiple"
          :invalid="args.invalid"
      />
    `,
	}),
} satisfies Meta<SelectStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const DocsMultiple: Story = {
	tags: ['!dev'],
	args: {
		modelValue: ['moscow', 'kazan'],
		multiple: true,
	},
}

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.select-story--hovered .select',
			focus: '.select-story--focused .select',
		},
	},
	render: (args: SelectStoryArgs) => ({
		components: { Select, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			const models = reactive({
				selected: 'moscow',
				multiple: [],
				multipleSelected: ['moscow', 'kazan'],
			})

			return { args, models }
		},
		template: `
			<StoryGrid>
				<StoryGridSection title="primary">
					<StoryGridRow>
						<StoryGridItem title="Default">
							<Select v-bind="args" />
						</StoryGridItem>
						<StoryGridItem title="Hover" class="select-story--hovered">
							<Select v-bind="args" />
						</StoryGridItem>
						<StoryGridItem title="Focus" class="select-story--focused">
							<Select v-bind="args" />
						</StoryGridItem>
						<StoryGridItem title="Invalid">
							<Select v-bind="args" invalid />
						</StoryGridItem>
						<StoryGridItem title="Selected">
							<Select v-bind="args" v-model="models.selected" />
						</StoryGridItem>
						<StoryGridItem title="Multiple selected">
							<Select v-bind="args" v-model="models.multipleSelected" :multiple="true" />
						</StoryGridItem>
						<StoryGridItem title="Disabled">
							<Select v-bind="args" disabled />
						</StoryGridItem>
					</StoryGridRow>
				</StoryGridSection>
				<StoryGridSection title="secondary">
					<StoryGridRow>
						<StoryGridItem title="Default">
							<Select v-bind="args" variant="secondary" />
						</StoryGridItem>
						<StoryGridItem title="Hover" class="select-story--hovered">
							<Select v-bind="args" variant="secondary" />
						</StoryGridItem>
						<StoryGridItem title="Focus" class="select-story--focused">
							<Select v-bind="args" variant="secondary" />
						</StoryGridItem>
						<StoryGridItem title="Invalid">
							<Select v-bind="args" variant="secondary" invalid />
						</StoryGridItem>
						<StoryGridItem title="Selected">
							<Select v-bind="args" v-model="models.selected" variant="secondary" />
						</StoryGridItem>
						<StoryGridItem title="Multiple selected">
							<Select v-bind="args" v-model="models.multipleSelected"  variant="secondary"  :multiple="true"/>
						</StoryGridItem>
						<StoryGridItem title="Disabled">
							<Select v-bind="args" variant="secondary" disabled />
						</StoryGridItem>
					</StoryGridRow>
				</StoryGridSection>
			</StoryGrid>
		`,
	}),
}

export const Tests: Story = {
	play: async ({ canvas, canvasElement, userEvent }) => {
		const trigger = canvas.getByRole('combobox')
		const body = within(canvasElement.ownerDocument.body)

		await expect(trigger).toHaveTextContent('Выберите город')
		await userEvent.click(trigger)

		await expect(await body.findByRole('option', { name: 'Гомель' })).toHaveAttribute('aria-disabled', 'true')
		await userEvent.click(await body.findByRole('option', { name: 'Казань' }))

		await waitFor(() => expect(trigger).toHaveTextContent('Казань'))
		await waitFor(() => expect(body.queryByRole('listbox')).not.toBeInTheDocument())
	},
}
