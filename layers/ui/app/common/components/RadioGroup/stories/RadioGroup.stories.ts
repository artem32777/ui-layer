import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import RadioGroup from '../RadioGroup.vue'
import radioGroupTypesSource from '../RadioGroup.types.ts?raw'

type RadioGroupStoryArgs = ComponentProps<typeof RadioGroup>

const defaultOptions = [
	{ label: 'False', value: 'false' },
	{ label: 'True', value: 'true' },
	{ label: 'Disabled', value: 'disabled', disabled: true },
]

const renderStates = (args: RadioGroupStoryArgs) => ({
	components: { RadioGroup },
	setup() { return { args } },
	template: `
		<div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 24px;">
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span style="color: #666; font-size: 12px; line-height: 1;">default</span>
				<RadioGroup v-bind="args" v-model="args.modelValue" :invalid="false" />
			</div>
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span style="color: #666; font-size: 12px; line-height: 1;">invalid</span>
				<RadioGroup v-bind="args" v-model="args.modelValue" invalid />
			</div>
		</div>
	`,
})

const meta = {
	title: 'UI/RadioGroup',
	component: RadioGroup,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		modelValue: {
			description: 'Выбранное значение группы радиокнопок.',
			control: 'text',
			table: { type: { summary: 'string' } },
		},
		options: {
			control: 'object',
			table: {
				type: {
					summary: 'RadioOption[]',
					detail: radioGroupTypesSource.trim(),
				},
			},
		},
		invalid: { control: 'boolean' },
	},
	args: {
		modelValue: 'true',
		options: defaultOptions,
		invalid: false,
	} satisfies RadioGroupStoryArgs,
	render: (args: RadioGroupStoryArgs) => ({
		components: { RadioGroup },
		setup() { return { args } },
		template: '<RadioGroup v-bind="args" v-model="args.modelValue" />',
	}),
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
	args: {
		modelValue: '',
	} satisfies Partial<RadioGroupStoryArgs>,
}

export const Base: Story = {
	args: {
		modelValue: '',
	} satisfies Partial<RadioGroupStoryArgs>,
	render: renderStates,
}

export const Checked: Story = {
	args: {
		modelValue: 'true',
	} satisfies Partial<RadioGroupStoryArgs>,
	render: renderStates,
}

export const Tests: Story = {
	play: async ({ canvas, userEvent }) => {
		const falseOption = canvas.getByRole('radio', { name: 'False' })
		const trueOption = canvas.getByRole('radio', { name: 'True' })
		const disabledOption = canvas.getByRole('radio', { name: 'Disabled' })

		await expect(trueOption).toBeChecked()
		await expect(falseOption).not.toBeChecked()
		await expect(disabledOption).toBeDisabled()

		await userEvent.click(falseOption)
		await expect(falseOption).toBeChecked()
		await expect(trueOption).not.toBeChecked()

		await userEvent.keyboard('{ArrowDown}')
		await expect(trueOption).toHaveFocus()
		await userEvent.keyboard(' ')
		await expect(trueOption).toBeChecked()
	},
}
