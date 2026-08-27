import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { useArgs } from 'storybook/preview-api'
import { expect } from 'storybook/test'
import IconPickerControl from '@@/.storybook/components/IconPickerControl.vue'
import { inputSizes, inputVariants } from '../Input.types.ts'
import Input from '../Input.vue'
import InputStoryForm from './InputStoryForm.vue'
import InputStoryStates from './InputStoryStates.vue'
import { VMessage } from '#layers/ui/app/modules/form'
import { iconNameList } from '#layers/ui/app/modules/svg-icon'

type InputStoryArgs = ComponentProps<typeof Input>

const meta = {
	title: 'UI/Input',
	component: Input,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		modelValue: {
			description: 'Текущее значение поля ввода.',
			control: 'text',
			table: { type: { summary: 'string' } },
		},
		placeholder: { control: 'text' },
		variant: { control: 'select', options: inputVariants },
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
		size: { control: 'select', options: inputSizes },
		icon: { control: 'select', options: iconNameList },
	},
	args: {
		placeholder: 'Введите значение',
		variant: 'fill',
		disabled: false,
		invalid: false,
		size: 'medium',
		type: 'text',
		modelValue: '',
	} satisfies InputStoryArgs,
	render: (args: InputStoryArgs) => ({
		components: { Input },
		setup() { return { args } },
		template: '<Input v-bind="args" v-model="args.modelValue" aria-label="Поле ввода" />',
	}),
} satisfies Meta<InputStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const Base: Story = {
	render: (args: InputStoryArgs) => {
		const [, updateArgs] = useArgs<InputStoryArgs>()

		return {
			components: { Input, IconPickerControl },
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

					<div>
						<Input v-bind="args" v-model="args.modelValue" aria-label="Поле ввода" />
					</div>
				</div>
			`,
		}
	},
}

export const Form: Story = {
	args: {
		placeholder: 'Email',
		type: 'email',
	},
	render: (args: InputStoryArgs) => {
		const [, updateArgs] = useArgs<InputStoryArgs>()

		return {
			components: { InputStoryForm, IconPickerControl },
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

					<InputStoryForm
						v-bind="args"
						label="Email"
					/>
				</div>
			`,
		}
	},
}

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.input-story--hovered .input__field',
			focus: '.input-story--focused .input__field',
		},
	},
	render: (args: InputStoryArgs) => ({
		components: { InputStoryStates },
		setup() {
			return { args }
		},
		template: '<InputStoryStates v-bind="args" />',
	}),
}

export const FormDocsExample: Story = {
	tags: ['!dev'],
	args: {
		placeholder: 'Email',
		type: 'email',
	},
	render: (args: InputStoryArgs) => ({
		components: { InputStoryForm },
		setup() {
			return { args }
		},
		template: '<InputStoryForm v-bind="args" label="Email" />',
	}),
}

export const Tests: Story = {
	args: {
		placeholder: 'Email',
		type: 'email',
	},
	render: (args: InputStoryArgs) => ({
		components: { InputStoryForm },
		setup() {
			return { args }
		},
		template: '<InputStoryForm v-bind="args" label="Email" />',
	}),
	play: async ({ canvas, userEvent }) => {
		const input = canvas.getByRole('textbox')

		await userEvent.type(input, 'invalid')
		await expect(canvas.queryByText(VMessage.email)).toBeNull()

		await userEvent.tab()
		await expect(await canvas.findByText(VMessage.email)).toBeVisible()

		await userEvent.clear(input)
		await userEvent.type(input, 'test@example.com')
		await userEvent.tab()
		await expect(canvas.queryByText(VMessage.email)).toBeNull()
	},
}
