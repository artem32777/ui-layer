import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ConcreteComponent } from 'vue'
import { expect, waitFor, within } from 'storybook/test'
import Select from '../Select.vue'
import type { SelectProps } from '../Select.vue'
import selectTypesSource from '../Select.types.ts?raw'

type SelectStoryArgs = SelectProps<boolean> & {
	modelValue?: string | string[]
}

const options = [
	{ label: 'Москва', value: 'moscow', group: 'Россия' },
	{ label: 'Санкт-Петербург', value: 'saint-petersburg', group: 'Россия' },
	{ label: 'Казань', value: 'kazan', group: 'Россия' },
	{ label: 'Минск', value: 'minsk', group: 'Беларусь' },
	{ label: 'Гомель', value: 'gomel1', group: 'Беларусь', disabled: true },
	{ label: 'Гомель2', value: 'gomel2', group: 'Беларусь' },
	{ label: 'Гомель3', value: 'gomel3', group: 'Беларусь' },
]

const renderStates = (args: SelectStoryArgs) => ({
	components: { Select },
	setup() {
		return { args }
	},
	template: `
    <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 24px;">
      <div>
        <span>default</span>
        <Select v-bind="args" v-model="args.modelValue" :disabled="false" :invalid="false"/>
      </div>
      <div>
        <span>invalid</span>
        <Select v-bind="args" v-model="args.modelValue" :disabled="false" invalid/>
      </div>
      <div>
        <span>disabled</span>
        <Select v-bind="args" v-model="args.modelValue" disabled :invalid="false"/>
      </div>
    </div>
  `,
})

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

export const DocsSelected: Story = {
	tags: ['!dev'],
	args: {
		modelValue: 'moscow',
	},
}

export const DocsMultiple: Story = {
	tags: ['!dev'],
	args: {
		modelValue: ['moscow', 'kazan'],
		multiple: true,
	},
}

export const Base: Story = {
	render: renderStates,
}

export const Secondary: Story = {
	args: {
		variant: 'secondary',
	},
	render: renderStates,
}

export const Selected: Story = {
	args: {
		modelValue: 'moscow',
	},
	render: renderStates,
}

export const Multiple: Story = {
	args: {
		modelValue: ['moscow', 'kazan'],
		multiple: true,
	},
	render: renderStates,
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
