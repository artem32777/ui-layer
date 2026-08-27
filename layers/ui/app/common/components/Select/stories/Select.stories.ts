import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ConcreteComponent } from 'vue'
import { watch } from 'vue'
import { useArgs } from 'storybook/preview-api'
import { expect, waitFor, within } from 'storybook/test'
import IconPickerControl from '@@/.storybook/components/IconPickerControl.vue'
import Select from '../Select.vue'
import selectTypesSource from '../Select.types.ts?raw'
import type { SelectProps, SelectOption } from '../Select.types.ts'
import { selectSizes, selectVariants } from '../Select.types'
import SelectStoryForm from './SelectStoryForm.vue'
import SelectStoryStates from './SelectStoryStates.vue'
import { iconNameList } from '#layers/ui/app/modules/svg-icon'

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
	parameters: { a11y: { test: 'error' } },
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
		icon: { control: 'select', options: iconNameList },
		multiple: { control: 'boolean' },
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
	},
	args: {
		options,
		modelValue: undefined,
		placeholder: 'Выберите город',
		variant: 'fill',
		size: 'medium',
		disabled: false,
		multiple: false,
		invalid: false,
	} satisfies SelectStoryArgs,
	render: (args: SelectStoryArgs) => {
		const [, updateArgs] = useArgs<SelectStoryArgs>()

		return {
			components: { Select },
			setup() {
				watch(() => args.multiple, (multiple) => {
					updateArgs({ modelValue: multiple ? [] : undefined })
				})

				return { args }
			},
			template: `
				<Select
					:key="String(args.multiple)"
					v-bind="args"
					v-model="args.modelValue"
				/>
			`,
		}
	},
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

export const Base: Story = {
	render: (args: SelectStoryArgs) => {
		const [, updateArgs] = useArgs<SelectStoryArgs>()

		return {
			components: { Select, IconPickerControl },
			setup() {
				watch(() => args.multiple, (multiple) => {
					updateArgs({ modelValue: multiple ? [] : undefined })
				})

				return { args, updateArgs }
			},
			template: `
				<div style="display: grid; gap: 24px;">
					<div style="display: flex; gap: 12px; flex-wrap: wrap;">
						<IconPickerControl
							text="Выбрать иконку"
							side="left"
							:model-value="args.icon"
							@update:model-value="updateArgs({ icon: $event })"
						/>
					</div>

					<div>
						<Select
							:key="String(args.multiple)"
							v-bind="args"
							v-model="args.modelValue"
						/>
					</div>
				</div>
			`,
		}
	},
}

export const Form: Story = {
	render: (args: SelectStoryArgs) => {
		const [, updateArgs] = useArgs<SelectStoryArgs>()

		return {
			components: { SelectStoryForm, IconPickerControl },
			setup() {
				return { args, updateArgs }
			},
			template: `
				<div style="display: grid; gap: 24px;">
					<div style="display: flex; gap: 12px; flex-wrap: wrap;">
						<IconPickerControl
							text="Выбрать иконку"
							side="left"
							:model-value="args.icon"
							@update:model-value="updateArgs({ icon: $event })"
						/>
					</div>

					<SelectStoryForm
						v-bind="args"
						:show-error="args.invalid"
						label="Город"
					/>
				</div>
			`,
		}
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
		components: { SelectStoryStates },
		setup() {
			return { args }
		},
		template: '<SelectStoryStates v-bind="args" />',
	}),
}

export const FormDocsExample: Story = {
	tags: ['!dev'],
	render: (args: SelectStoryArgs) => ({
		components: { SelectStoryForm },
		setup() {
			return { args }
		},
		template: '<SelectStoryForm v-bind="args" label="Город" />',
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

export const FormTests: Story = {
	tags: ['!dev'],
	render: (args: SelectStoryArgs) => ({
		components: { SelectStoryForm },
		setup() {
			return { args }
		},
		template: '<SelectStoryForm v-bind="args" label="Город" />',
	}),
	play: async ({ canvas, canvasElement, userEvent }) => {
		const trigger = canvas.getByRole('combobox')
		const body = within(canvasElement.ownerDocument.body)

		await userEvent.click(trigger)
		await userEvent.keyboard('{Escape}')
		await expect(await canvas.findByText('Укажите город')).toBeVisible()

		await userEvent.click(trigger)
		await userEvent.click(await body.findByRole('option', { name: 'Казань' }))
		await expect(canvas.queryByText('Укажите город')).toBeNull()
	},
}
