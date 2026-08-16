import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import { getStringsArrFromKey } from '~/common/utils/getStringsArrFromKey'
import Toggle from '../Toggle.vue'

type ToggleStoryArgs = ComponentProps<typeof Toggle>

const getOptions = getStringsArrFromKey<ToggleStoryArgs>()

const renderStates = (args: ToggleStoryArgs) => ({
	components: { Toggle },
	setup() { return { args } },
	template: `
		<div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 24px;">
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span>default</span>
				<Toggle v-bind="args" v-model="args.modelValue" :disabled="false" aria-label="Полужирное начертание">B</Toggle>
			</div>
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span>pressed</span>
				<Toggle v-bind="args" :model-value="true" :disabled="false" aria-label="Полужирное начертание, нажато">B</Toggle>
			</div>
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span>disabled</span>
				<Toggle v-bind="args" v-model="args.modelValue" disabled aria-label="Полужирное начертание, недоступно">B</Toggle>
			</div>
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span>sm</span>
				<Toggle v-bind="args" v-model="args.modelValue" size="sm" :disabled="false" aria-label="Полужирное начертание, sm">B</Toggle>
			</div>
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span>lg</span>
				<Toggle v-bind="args" v-model="args.modelValue" size="lg" :disabled="false" aria-label="Полужирное начертание, lg">B</Toggle>
			</div>
		</div>
	`,
})

const meta = {
	title: 'UI/Toggle',
	component: Toggle,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		modelValue: { description: 'Нажатое состояние переключателя.' },
		variant: {
			control: 'select',
			options: getOptions('variant', ['base', 'outline']),
		},
		size: {
			control: 'select',
			options: getOptions('size', ['sm', 'md', 'lg']),
		},
		disabled: { control: 'boolean' },
	},
	args: {
		modelValue: false,
		disabled: false,
	} satisfies ToggleStoryArgs,
	render: (args: ToggleStoryArgs) => ({
		components: { Toggle },
		setup() { return { args } },
		template: '<Toggle v-bind="args" v-model="args.modelValue" aria-label="Полужирное начертание">B</Toggle>',
	}),
} satisfies Meta<typeof Toggle>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const Base: Story = {
	render: renderStates,
}

export const Outline: Story = {
	args: {
		variant: 'outline',
	} satisfies Partial<ToggleStoryArgs>,
	render: renderStates,
}

export const Tests: Story = {
	play: async ({ args, canvas, userEvent }) => {
		const toggle = canvas.getByRole('button', { name: 'Полужирное начертание' })

		await expect(toggle).toHaveAttribute('aria-pressed', 'false')
		await userEvent.click(toggle)
		await expect(toggle).toHaveAttribute('aria-pressed', 'true')
		await expect(args.modelValue).toBe(true)
		await userEvent.keyboard(' ')
		await expect(toggle).toHaveAttribute('aria-pressed', 'false')
		await expect(args.modelValue).toBe(false)
	},
}
