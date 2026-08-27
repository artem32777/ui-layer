import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import { textareaSizes, textareaVariants } from '../Textarea.types.ts'
import Textarea from '../Textarea.vue'
import TextareaStoryForm from './TextareaStoryForm.vue'
import TextareaStoryStates from './TextareaStoryStates.vue'

type TextareaStoryArgs = ComponentProps<typeof Textarea>

const meta = {
	title: 'UI/Textarea',
	component: Textarea,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		modelValue: {
			description: 'Значение поля.',
			control: 'text',
			table: { type: { summary: 'string' } },
		},
		placeholder: { control: 'text' },
		variant: { control: 'select', options: textareaVariants },
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
		size: { control: 'select', options: textareaSizes },
	},
	args: {
		placeholder: 'Введите сообщение',
		variant: 'fill',
		disabled: false,
		invalid: false,
		size: 'medium',
		modelValue: '',
	} satisfies TextareaStoryArgs,
	render: (args: TextareaStoryArgs) => ({
		components: { Textarea },
		setup() { return { args } },
		template: '<Textarea v-bind="args" v-model="args.modelValue" aria-label="Текстовое поле" />',
	}),
} satisfies Meta<TextareaStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const Base: Story = {
	render: (args: TextareaStoryArgs) => ({
		components: { Textarea },
		setup() {
			return { args }
		},
		template: '<Textarea v-bind="args" v-model="args.modelValue" aria-label="Текстовое поле" />',
	}),
}

export const Form: Story = {
	args: {
		placeholder: 'Введите сообщение',
	},
	render: (args: TextareaStoryArgs) => ({
		components: { TextareaStoryForm },
		setup() {
			return { args }
		},
		template: '<TextareaStoryForm v-bind="args" label="Сообщение" />',
	}),
}

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.textarea-story--hovered .textarea',
			focus: '.textarea-story--focused .textarea',
		},
	},
	render: (args: TextareaStoryArgs) => ({
		components: { TextareaStoryStates },
		setup() {
			return { args }
		},
		template: '<TextareaStoryStates v-bind="args" />',
	}),
}

export const FormDocsExample: Story = {
	tags: ['!dev'],
	args: {
		placeholder: 'Введите сообщение',
	},
	render: (args: TextareaStoryArgs) => ({
		components: { TextareaStoryForm },
		setup() {
			return { args }
		},
		template: '<TextareaStoryForm v-bind="args" label="Сообщение" />',
	}),
}

export const Tests: Story = {
	args: {
		placeholder: 'Введите сообщение',
	},
	render: (args: TextareaStoryArgs) => ({
		components: { TextareaStoryForm },
		setup() {
			return { args }
		},
		template: '<TextareaStoryForm v-bind="args" label="Сообщение" />',
	}),
	play: async ({ canvas, userEvent }) => {
		const input = canvas.getByRole('textbox')

		await userEvent.type(input, '   ')
		await expect(canvas.queryByText('Минимум 5 символов')).toBeNull()

		await userEvent.tab()
		await expect(await canvas.findByText('Минимум 5 символов')).toBeVisible()

		await userEvent.clear(input)
		await userEvent.type(input, 'Текст сообщения')
		await userEvent.tab()
		await expect(canvas.queryByText('Минимум 5 символов')).toBeNull()
	},
}
