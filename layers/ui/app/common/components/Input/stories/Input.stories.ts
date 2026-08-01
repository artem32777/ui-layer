import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { getStringsArrFromKey } from '~/common/utils/getStringsArrFromKey'
import Input from '../Input.vue'

type InputStoryArgs = ComponentProps<typeof Input>
type InputVariant = NonNullable<InputStoryArgs['variant']>

const getOptions = getStringsArrFromKey<InputStoryArgs>()

const renderStates = (variant: InputVariant) => (args: InputStoryArgs) => ({
	components: { Input },
	setup() { return { args, variant } },
	template: `
		<div style="display: flex; flex-direction: column; gap: 54px; max-width: 600px">
			<div style="display: flex; gap: 8px; flex-direction: column">
				<span style="color: #666; font-size: 12px; line-height: 1;">default</span>
				<Input v-bind="args" v-model="args.modelValue" :variant="variant" aria-label="Input" />
			</div>
			<div style="display: flex; gap: 8px; flex-direction: column;">
				<span style="color: #666; font-size: 12px; line-height: 1;">invalid</span>
				<Input v-bind="args" v-model="args.modelValue" :variant="variant" aria-invalid="true" aria-label="Input invalid" />
			</div>
			<div style="display: flex; gap: 8px; flex-direction: column;">
				<span style="color: #666; font-size: 12px; line-height: 1;">disabled</span>
				<Input v-bind="args" v-model="args.modelValue" :variant="variant" disabled aria-label="Input disabled" />
			</div>
			<div style="display: flex; gap: 8px; flex-direction: column;">
				<span style="color: #666; font-size: 12px; line-height: 1;">size: sm</span>
				<Input v-bind="args" v-model="args.modelValue" :variant="variant" size="sm" aria-label="Input disabled" />
			</div>
			<div style="display: flex; gap: 8px; flex-direction: column;">
				<span style="color: #666; font-size: 12px; line-height: 1;">size: lg</span>
				<Input v-bind="args" v-model="args.modelValue" :variant="variant" size="lg" aria-label="Input disabled" />
			</div>
		</div>
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
