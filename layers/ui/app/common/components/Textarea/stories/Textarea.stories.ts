import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import Textarea from '../Textarea.vue'

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
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
	},
	args: {
		placeholder: 'Введите сообщение',
		disabled: false,
		invalid: false,
		modelValue: '',
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

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.textarea-story--hovered',
			focus: '.textarea-story--focused',
		},
	},
	render: (args: TextareaStoryArgs) => ({
		components: { Textarea, StoryGrid, StoryGridItem, StoryGridRow },
		setup() {
			return { args }
		},
		template: `
			<StoryGrid>
				<StoryGridRow>
					<StoryGridItem title="default">
						<Textarea
							v-bind="args"
							v-model="args.modelValue"
							aria-label="Textarea default"
						/>
					</StoryGridItem>
					<StoryGridItem title="hover">
						<Textarea
							v-bind="args"
							v-model="args.modelValue"
							class="textarea-story--hovered"
							aria-label="Textarea hover"
						/>
					</StoryGridItem>
					<StoryGridItem title="focus">
						<Textarea
							v-bind="args"
							v-model="args.modelValue"
							class="textarea-story--focused"
							aria-label="Textarea focus"
						/>
					</StoryGridItem>
					<StoryGridItem title="invalid">
						<Textarea
							v-bind="args"
							v-model="args.modelValue"
							invalid
							aria-label="Textarea invalid"
						/>
					</StoryGridItem>
					<StoryGridItem title="disabled">
						<Textarea
							v-bind="args"
							v-model="args.modelValue"
							disabled
							aria-label="Textarea disabled"
						/>
					</StoryGridItem>
				</StoryGridRow>
			</StoryGrid>
		`,
	}),
}
