import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { getStringsArrFromKey } from '~/common/utils/getStringsArrFromKey'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import Input from '../Input.vue'

type InputStoryArgs = ComponentProps<typeof Input>
type InputState = NonNullable<InputStoryArgs['state']>
type InputVariant = NonNullable<InputStoryArgs['variant']>

const getOptions = getStringsArrFromKey<InputStoryArgs>()
const inputStates = ['default', 'hovered', 'focused', 'invalid', 'disabled'] satisfies InputState[]
const inputVariants = ['base', 'secondary'] satisfies InputVariant[]

const meta = {
	title: 'UI/Input',
	component: Input,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		type: {
			control: 'select',
			options: getOptions('type', ['email', 'number', 'password', 'search', 'text', 'date', 'file', 'tel']),
		},
		size: {
			control: 'select',
			options: getOptions('size', ['sm', 'md', 'lg']),
		},
		variant: {
			control: 'select',
			options: getOptions('variant', ['base', 'secondary']),
		},
		state: {
			control: 'select',
			options: getOptions('state', ['default', 'hovered', 'focused', 'invalid', 'disabled']),
		},
		placeholder: { control: 'text' },
		modelValue: {
			description: 'Текущее значение поля ввода.',
			control: 'text',
			table: { type: { summary: 'string' } },
		},
		disabled: { control: 'boolean' },
	},
	args: {
		placeholder: 'Введите значение',
		variant: 'base',
		state: 'default',
		size: 'md',
		disabled: false,
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
	render: (args: InputStoryArgs) => ({
		components: { Input, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			return { args, inputStates, inputVariants }
		},
		template: `
			<StoryGrid>
				<StoryGridSection
					v-for="variant in inputVariants"
					:key="variant"
					:title="variant"
				>
					<StoryGridRow>
						<StoryGridItem
							v-for="state in inputStates"
							:key="state"
							:title="state"
							style="width: 180px;"
						>
							<Input
								v-bind="args"
								v-model="args.modelValue"
								:variant="variant"
								:state="state"
								:disabled="state === 'disabled'"
								:aria-label="'Input ' + state"
							/>
						</StoryGridItem>
					</StoryGridRow>
				</StoryGridSection>
			</StoryGrid>
		`,
	}),
}
