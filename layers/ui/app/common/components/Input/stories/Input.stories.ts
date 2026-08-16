import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { getStringsArrFromKey } from '~/common/utils/getStringsArrFromKey'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import Input from '../Input.vue'

type InputStoryArgs = ComponentProps<typeof Input>
type InputVariant = NonNullable<InputStoryArgs['variant']>

const getOptions = getStringsArrFromKey<InputStoryArgs>()

const renderStates = (variant: InputVariant) => (args: InputStoryArgs) => ({
	components: { Input, StoryGridItem, StoryGridRow },
	setup() { return { args, variant } },
	template: `
		<StoryGridRow style="max-width: 600px;">
			<StoryGridItem title="default" style="width: 100%;">
				<Input v-bind="args" v-model="args.modelValue" :variant="variant" aria-label="Input" />
			</StoryGridItem>
			<StoryGridItem title="invalid" style="width: 100%;">
				<Input v-bind="args" v-model="args.modelValue" :variant="variant" aria-invalid="true" aria-label="Input invalid" />
			</StoryGridItem>
			<StoryGridItem title="disabled" style="width: 100%;">
				<Input v-bind="args" v-model="args.modelValue" :variant="variant" disabled aria-label="Input disabled" />
			</StoryGridItem>
			<StoryGridItem title="size: sm" style="width: 100%;">
				<Input v-bind="args" v-model="args.modelValue" :variant="variant" size="sm" aria-label="Input disabled" />
			</StoryGridItem>
			<StoryGridItem title="size: lg" style="width: 100%;">
				<Input v-bind="args" v-model="args.modelValue" :variant="variant" size="lg" aria-label="Input disabled" />
			</StoryGridItem>
		</StoryGridRow>
	`,
})

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

export const Base: Story = {
	render: renderStates('base'),
}

export const Secondary: Story = {
	args: {
		variant: 'secondary',
	} satisfies Partial<InputStoryArgs>,
	render: renderStates('secondary'),
}
