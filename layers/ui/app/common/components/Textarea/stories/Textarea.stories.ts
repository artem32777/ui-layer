import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import Textarea from '../Textarea.vue'

type TextareaStoryArgs = ComponentProps<typeof Textarea>

const renderStates = (args: TextareaStoryArgs) => ({
	components: { StoryGridItem, StoryGridRow, Textarea },
	setup() { return { args } },
	template: `
		<StoryGridRow>
			<StoryGridItem title="default">
				<Textarea v-bind="args" v-model="args.modelValue" aria-label="Textarea" />
			</StoryGridItem>
			<StoryGridItem title="invalid">
				<Textarea v-bind="args" v-model="args.modelValue" aria-invalid="true" />
			</StoryGridItem>
			<StoryGridItem title="disabled">
				<Textarea v-bind="args" v-model="args.modelValue" disabled />
			</StoryGridItem>
		</StoryGridRow>
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
