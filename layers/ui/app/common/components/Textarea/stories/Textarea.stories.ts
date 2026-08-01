import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import Textarea from '../Textarea.vue'

type TextareaStoryArgs = ComponentProps<typeof Textarea>

const renderStates = (args: TextareaStoryArgs) => ({
	components: { Textarea },
	setup() { return { args } },
	template: `
		<div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 24px;">
			<div style="display: flex; flex: 1 1 240px; flex-direction: column; gap: 8px;">
				<span style="color: #666; font-size: 12px; line-height: 1;">default</span>
				<Textarea v-bind="args" v-model="args.modelValue" :disabled="false" aria-label="Textarea" />
			</div>
			<div style="display: flex; flex: 1 1 240px; flex-direction: column; gap: 8px;">
				<span style="color: #666; font-size: 12px; line-height: 1;">invalid</span>
				<Textarea v-bind="args" v-model="args.modelValue" :disabled="false" aria-invalid="true" aria-label="Textarea invalid" />
			</div>
			<div style="display: flex; flex: 1 1 240px; flex-direction: column; gap: 8px;">
				<span style="color: #666; font-size: 12px; line-height: 1;">disabled</span>
				<Textarea v-bind="args" v-model="args.modelValue" disabled aria-label="Textarea disabled" />
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
			description: 'Текущее значение текстового поля.',
			control: 'text',
			table: { type: { summary: 'string' } },
		},
		rows: { control: 'number' },
		disabled: { control: 'boolean' },
	},
	args: {
		placeholder: 'Введите сообщение',
		modelValue: '',
		rows: 4,
		disabled: false,
	} satisfies TextareaStoryArgs,
	render: (args: TextareaStoryArgs) => ({
		components: { Textarea },
		setup() { return { args } },
		template: '<Textarea v-bind="args" v-model="args.modelValue" aria-label="Textarea" />',
	}),
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const DocsFilled: Story = {
	tags: ['!dev'],
	args: {
		modelValue: 'Текст в поле\nс переносом строки',
	} satisfies Partial<TextareaStoryArgs>,
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
