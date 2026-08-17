import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ConcreteComponent } from 'vue'
import { reactive } from 'vue'
import { expect, waitFor, within } from 'storybook/test'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import Select from '../Select.vue'
import type { SelectProps } from '../Select.vue'
import selectTypesSource from '../Select.types.ts?raw'

type SelectStoryArgs = SelectProps<boolean> & {
	modelValue?: string | string[]
}

const options = [
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
			description: 'Выбранное значение. В режиме `multiple` хранит массив выбранных значений.',
			control: 'object',
			table: { type: { summary: 'string | string[]' } },
		},
		placeholder: { control: 'text' },
		variant: {
			control: 'select',
			options: ['base', 'secondary'],
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
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
		disabled: { control: 'boolean' },
		multiple: { control: 'boolean' },
		invalid: { control: 'boolean' },
	},
	args: {
		modelValue: undefined,
		placeholder: 'Выберите город',
		variant: 'base',
		size: 'md',
		options,
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
	render: (args: SelectStoryArgs) => ({
		components: { Select, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			const models = reactive({
				base: {
					default: undefined as string | undefined,
					selected: 'moscow',
					multiple: ['moscow', 'kazan'],
					disabled: undefined as string | undefined,
				},
				secondary: {
					default: undefined as string | undefined,
					selected: 'moscow',
					multiple: ['moscow', 'kazan'],
					disabled: undefined as string | undefined,
				},
			})

			return { args, models }
		},
		template: `
			<StoryGrid>
				<StoryGridSection title="base">
					<StoryGridRow>
						<StoryGridItem title="Default">
							<Select v-bind="args" v-model="models.base.default" variant="base" :multiple="false" :disabled="false" />
						</StoryGridItem>
						<StoryGridItem title="Selected">
							<Select v-bind="args" v-model="models.base.selected" variant="base" :multiple="false" :disabled="false" />
						</StoryGridItem>
						<StoryGridItem title="Multiple">
							<Select v-bind="args" v-model="models.base.multiple" variant="base" multiple :disabled="false" />
						</StoryGridItem>
						<StoryGridItem title="Disabled">
							<Select v-bind="args" v-model="models.base.disabled" variant="base" :multiple="false" disabled />
						</StoryGridItem>
					</StoryGridRow>
				</StoryGridSection>
				<StoryGridSection title="secondary">
					<StoryGridRow>
						<StoryGridItem title="Default">
							<Select v-bind="args" v-model="models.secondary.default" variant="secondary" :multiple="false" :disabled="false" />
						</StoryGridItem>
						<StoryGridItem title="Selected">
							<Select v-bind="args" v-model="models.secondary.selected" variant="secondary" :multiple="false" :disabled="false" />
						</StoryGridItem>
						<StoryGridItem title="Multiple">
							<Select v-bind="args" v-model="models.secondary.multiple" variant="secondary" multiple :disabled="false" />
						</StoryGridItem>
						<StoryGridItem title="Disabled">
							<Select v-bind="args" v-model="models.secondary.disabled" variant="secondary" :multiple="false" disabled />
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
