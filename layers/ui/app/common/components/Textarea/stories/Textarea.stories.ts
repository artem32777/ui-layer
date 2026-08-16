import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import Textarea from '../Textarea.vue'

type TextareaStoryArgs = ComponentProps<typeof Textarea>

const renderStates = (args: TextareaStoryArgs) => ({
	components: { Textarea },
	setup() { return { args } },
	template: `
		<div style="display: flex; align-items: flex-start; gap: 24px;">
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span>default</span>
				<Textarea v-bind="args" v-model="args.modelValue" aria-label="Textarea" />
			</div>
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span>invalid</span>
				<Textarea v-bind="args" v-model="args.modelValue" aria-invalid="true" />
			</div>
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span>disabled</span>
				<Textarea v-bind="args" v-model="args.modelValue" disabled />
			</div>
		</div>
	`,
})

const meta = {
	title: 'UI/Textarea',
	component: Textarea,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		placeholder: { control: 'text' },
		modelValue: {
			description: 'Значение текстового поля.',
			control: 'text',
			table: { type: { summary: 'string' } },
		},
		invalid: { control: 'boolean' },
		disabled: { control: 'boolean' },
	},
	args: {
		placeholder: 'Введите сообщение',
		modelValue: '',
	} satisfies TextareaStoryArgs,
	render: (args: TextareaStoryArgs) => ({
		components: { Textarea },
		setup() { return { args } },
		template: '<Textarea v-bind="args" v-model="args.modelValue" />',
	}),
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const Base: Story = {
	render: renderStates,
}

export const Filled: Story = {
	args: {
		modelValue: 'Текст в поле\nс переносом строки',
	} satisfies Partial<TextareaStoryArgs>,
	render: renderStates,
}
