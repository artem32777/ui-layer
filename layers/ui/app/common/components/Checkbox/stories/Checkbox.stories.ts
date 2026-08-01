import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import Checkbox from '../Checkbox.vue'

type CheckboxStoryArgs = ComponentProps<typeof Checkbox>

const renderStates = (args: CheckboxStoryArgs) => ({
	components: { Checkbox },
	setup() { return { args } },
	template: `
		<div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 24px;">
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span style="color: #666; font-size: 12px; line-height: 1;">default</span>
				<Checkbox v-bind="args" v-model="args.modelValue" :disabled="false" :invalid="false">
					Текст чекбокса default
				</Checkbox>
			</div>
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span style="color: #666; font-size: 12px; line-height: 1;">invalid</span>
				<Checkbox v-bind="args" v-model="args.modelValue" :disabled="false" invalid>
					Текст чекбокса invalid
				</Checkbox>
			</div>
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span style="color: #666; font-size: 12px; line-height: 1;">disabled</span>
				<Checkbox v-bind="args" v-model="args.modelValue" disabled :invalid="false">
					Текст чекбокса disabled
				</Checkbox>
			</div>
		</div>
	`,
})

const meta = {
	title: 'UI/Checkbox',
	component: Checkbox,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		modelValue: {
			description: 'Выбранное состояние чекбокса.',
			control: 'select',
			options: [false, true],
		},
		size: { control: 'number' },
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
	},
	args: {
		modelValue: false,
		size: 16,
		disabled: false,
		invalid: false,
	} satisfies CheckboxStoryArgs,
	render: (args: CheckboxStoryArgs) => ({
		components: { Checkbox },
		setup() { return { args } },
		template: '<Checkbox v-bind="args" v-model="args.modelValue">Текст чекбокса</Checkbox>',
	}),
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const Base: Story = {
	render: renderStates,
}

export const Checked: Story = {
	args: {
		modelValue: true,
	} satisfies Partial<CheckboxStoryArgs>,
	render: renderStates,
}

export const Tests: Story = {
	play: async ({ canvas, userEvent }) => {
		const checkbox = canvas.getByRole('checkbox', { name: 'Текст чекбокса' })

		await expect(checkbox).not.toBeChecked()
		await userEvent.click(checkbox)
		await expect(checkbox).toBeChecked()
		await userEvent.keyboard(' ')
		await expect(checkbox).not.toBeChecked()
	},
}
