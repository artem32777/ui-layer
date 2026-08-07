import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, waitFor } from 'storybook/test'
import Rating from '../Rating.vue'

type RatingStoryArgs = ComponentProps<typeof Rating>

const renderStates = (args: RatingStoryArgs) => ({
	components: { Rating },
	setup() { return { args } },
	template: `
		<div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 24px;">
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span style="color: #666; font-size: 12px; line-height: 1;">default</span>
				<Rating v-bind="args" v-model="args.modelValue" :invalid="false" :disabled="false" aria-label="Оценка" />
			</div>
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span style="color: #666; font-size: 12px; line-height: 1;">invalid</span>
				<Rating v-bind="args" v-model="args.modelValue" invalid :disabled="false" aria-label="Некорректная оценка" />
			</div>
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<span style="color: #666; font-size: 12px; line-height: 1;">disabled</span>
				<Rating v-bind="args" v-model="args.modelValue" :invalid="false" disabled aria-label="Недоступная оценка" />
			</div>
		</div>
	`,
})

const meta = {
	title: 'UI/Rating',
	component: Rating,
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		modelValue: {
			description: 'Выбранное значение рейтинга.',
			control: { type: 'number', min: 0 },
			table: { type: { summary: 'number' } },
		},
		length: { control: { type: 'number', min: 1 } },
		step: {
			control: 'select',
			options: [1, 0.5, 0.25, 0.1],
		},
		clearable: { control: 'boolean' },
		hoverable: { control: 'boolean' },
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
	},
	args: {
		modelValue: 3,
		length: 5,
		step: 1,
		clearable: false,
		hoverable: false,
		disabled: false,
		invalid: false,
	} satisfies RatingStoryArgs,
	render: (args: RatingStoryArgs) => ({
		components: { Rating },
		setup() { return { args } },
		template: '<Rating v-bind="args" v-model="args.modelValue" aria-label="Оценка" />',
	}),
} satisfies Meta<typeof Rating>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
	args: {
		modelValue: 3.5,
		step: 0.5,
		clearable: true,
		hoverable: true,
	} satisfies Partial<RatingStoryArgs>,
}

export const Base: Story = {
	render: renderStates,
}

export const Fractional: Story = {
	args: {
		modelValue: 2.5,
		step: 0.5,
	} satisfies Partial<RatingStoryArgs>,
	play: async ({ canvas }) => {
		const halfThirdStar = canvas.getByRole('radio', { name: '2.5 из 5' })
		const halfThirdStarIcon = halfThirdStar.querySelector('svg')

		await expect(halfThirdStar).toBeChecked()
		await expect(halfThirdStar).toHaveStyle({ position: 'absolute', overflow: 'hidden', width: '14px' })
		await expect(halfThirdStarIcon).toHaveStyle({ width: '28px', height: '28px' })
	},
}

export const Clearable: Story = {
	args: {
		clearable: true,
	} satisfies Partial<RatingStoryArgs>,
}

export const Hoverable: Story = {
	args: {
		hoverable: true,
	} satisfies Partial<RatingStoryArgs>,
}

export const Tests: Story = {
	args: {
		modelValue: 2,
		clearable: true,
	} satisfies Partial<RatingStoryArgs>,
	play: async ({ args, canvas, userEvent }) => {
		const rating = canvas.getByRole('radiogroup', { name: 'Оценка' })
		const secondStar = canvas.getByRole('radio', { name: '2 из 5' })
		const thirdStar = canvas.getByRole('radio', { name: '3 из 5' })

		await expect(rating).toHaveAttribute('aria-invalid', 'false')
		await expect(secondStar).toBeChecked()
		await userEvent.click(thirdStar)
		await expect(thirdStar).toBeChecked()
		await expect(args.modelValue).toBe(3)

		await userEvent.keyboard('{ArrowLeft}')
		await expect(secondStar).toHaveFocus()
		await userEvent.keyboard(' ')
		await waitFor(() => expect(secondStar).toBeChecked())

		await userEvent.click(secondStar)
		await expect(args.modelValue).toBe(0)
	},
}
