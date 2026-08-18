import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import Textarea from '../Textarea.vue'
import { ref } from 'vue'

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
			const model = ref('Текст')
			return { args, model }
		},
		template: `
			<StoryGrid>
				<StoryGridRow>
					<StoryGridItem title="default">
						<Textarea
							v-bind="args"
						/>
					</StoryGridItem>
					<StoryGridItem title="filled">
						<Textarea v-bind="args" v-model="model"/>
					</StoryGridItem>
					<StoryGridItem title="hover">
						<Textarea
							v-bind="args"
							class="textarea-story--hovered"
						/>
					</StoryGridItem>
					<StoryGridItem title="focus">
						<Textarea
							v-bind="args"
							class="textarea-story--focused"
						/>
					</StoryGridItem>
					<StoryGridItem title="invalid">
						<Textarea
							v-bind="args"
							invalid
						/>
					</StoryGridItem>
					<StoryGridItem title="disabled">
						<Textarea
							v-bind="args"
							disabled
						/>
					</StoryGridItem>
				</StoryGridRow>
			</StoryGrid>
		`,
	}),
}
