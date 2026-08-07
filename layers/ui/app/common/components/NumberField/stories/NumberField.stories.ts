import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, within } from 'storybook/test'
import { getStringsArrFromKey } from '~/common/utils/getStringsArrFromKey'
import NumberField from '../NumberField.vue'

type NumberFieldStoryArgs = ComponentProps<typeof NumberField>

const getOptions = getStringsArrFromKey<NumberFieldStoryArgs>()

const renderStates = (variant: NumberFieldStoryArgs['variant']) => (args: NumberFieldStoryArgs) => ({
	components: { NumberField },
	setup() { return { args, variant } },
	template: `
		<div style="display: flex; flex-direction: column; gap: 24px; max-width: 360px;">
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span style="color: #666; font-size: 12px; line-height: 1;">default</span>
				<label style="display: flex; flex-direction: column; gap: 8px;">
					Количество
					<NumberField v-bind="args" v-model="args.modelValue" :variant="variant" :disabled="false" />
				</label>
			</div>
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span style="color: #666; font-size: 12px; line-height: 1;">invalid</span>
				<label style="display: flex; flex-direction: column; gap: 8px;">
					Количество
					<NumberField v-bind="args" v-model="args.modelValue" :variant="variant" :disabled="false" aria-invalid="true" />
				</label>
			</div>
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span style="color: #666; font-size: 12px; line-height: 1;">disabled</span>
				<label style="display: flex; flex-direction: column; gap: 8px;">
					Количество
					<NumberField v-bind="args" v-model="args.modelValue" :variant="variant" disabled />
				</label>
			</div>
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span style="color: #666; font-size: 12px; line-height: 1;">size: sm</span>
				<label style="display: flex; flex-direction: column; gap: 8px;">
					Количество
					<NumberField v-bind="args" v-model="args.modelValue" :variant="variant" size="sm" :disabled="false" />
				</label>
			</div>
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span style="color: #666; font-size: 12px; line-height: 1;">size: lg</span>
				<label style="display: flex; flex-direction: column; gap: 8px;">
					Количество
					<NumberField v-bind="args" v-model="args.modelValue" :variant="variant" size="lg" :disabled="false" />
				</label>
			</div>
		</div>
	`,
})

const meta = {
	title: 'UI/NumberField',
	component: NumberField,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		modelValue: {
			description: 'Текущее значение.',
			table: { type: { summary: 'number | null' } },
		},
		variant: { options: getOptions('variant', ['base', 'secondary']) },
		size: { options: getOptions('size', ['sm', 'md', 'lg']) },
	},
	args: {
		modelValue: 10,
		variant: 'base',
		size: 'md',
		step: 1,
		disabled: false,
	} satisfies NumberFieldStoryArgs,
	render: (args: NumberFieldStoryArgs) => ({
		components: { NumberField },
		setup() { return { args } },
		template: '<label>Количество<NumberField v-bind="args" v-model="args.modelValue" aria-label="Количество" /></label>',
	}),
} satisfies Meta<typeof NumberField>

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
	} satisfies Partial<NumberFieldStoryArgs>,
	render: renderStates('secondary'),
}

export const Tests: Story = {
	play: async ({ canvas, userEvent }) => {
		const numberField = canvas.getByRole('group', { name: 'Количество' })
		const input = within(numberField).getByRole('spinbutton')
		const increment = within(numberField).getByRole('button', { name: 'Increase' })

		await expect(input).toHaveAttribute('aria-valuenow', '10')
		await userEvent.click(increment)
		await expect(input).toHaveAttribute('aria-valuenow', '11')
		await userEvent.keyboard('{ArrowDown}')
		await expect(input).toHaveAttribute('aria-valuenow', '10')
	},
}
