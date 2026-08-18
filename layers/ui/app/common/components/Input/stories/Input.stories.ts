import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import { inputSizes, inputVariants } from '../Input.types.ts'
import Input from '../Input.vue'

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
	},
	args: {
		placeholder: 'Введите значение',
		variant: 'primary',
		disabled: false,
		invalid: false,
		size: 'medium',
		type: 'text',
		modelValue: '',
	} satisfies InputStoryArgs,
	render: (args: InputStoryArgs) => ({
		components: { Input },
		setup() { return { args } },
		template: '<Input v-bind="args" v-model="args.modelValue" aria-label="Input" />',
	}),
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.input-story--hovered',
			focus: '.input-story--focused',
		},
	},
	render: (args: InputStoryArgs) => ({
		components: { Input, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			return { args, inputVariants }
		},
		template: `
			<StoryGrid>
				<StoryGridSection
					v-for="variant in inputVariants"
					:key="variant"
					:title="variant"
				>
					<StoryGridRow>
						<StoryGridItem title="default">
							<Input
								v-bind="args"
								v-model="args.modelValue"
								:variant="variant"
							/>
						</StoryGridItem>
						<StoryGridItem title="hover">
							<Input
								v-bind="args"
								v-model="args.modelValue"
								:variant="variant"
								class="input-story--hovered"
							/>
						</StoryGridItem>
						<StoryGridItem title="focus">
							<Input
								v-bind="args"
								v-model="args.modelValue"
								:variant="variant"
								class="input-story--focused"
							/>
						</StoryGridItem>
						<StoryGridItem title="invalid">
							<Input
								v-bind="args"
								v-model="args.modelValue"
								:variant="variant"
								invalid
							/>
						</StoryGridItem>
						<StoryGridItem title="disabled">
							<Input
								v-bind="args"
								v-model="args.modelValue"
								:variant="variant"
								disabled
							/>
						</StoryGridItem>
					</StoryGridRow>
				</StoryGridSection>
			</StoryGrid>
		`,
	}),
}
