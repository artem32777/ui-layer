import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, waitFor } from 'storybook/test'
import Accordion from '../Accordion.vue'
import accordionTypesSource from '../Accordion.types.ts?raw'
import { getStringsArrFromKey } from '~/common/utils/getStringsArrFromKey'

type AccordionStoryArgs = ComponentProps<typeof Accordion>

const getOptions = getStringsArrFromKey<AccordionStoryArgs>()

const meta = {
	title: 'UI/Accordion',
	component: Accordion,
	argTypes: {
		modelValue: {
			description: 'значение открытого айтема, если нужно управлять состоянием снаружи',
			control: 'object',
			table: { type: { summary: 'string | string[]' } },
		},
		items: {
			control: 'object',
			table: {
				type: {
					summary: 'AccordionPropsItem[]',
					detail: accordionTypesSource.trim(),
				},
			},
		},
		type: {
			control: 'select',
			options: getOptions('type', ['single', 'multiple']),
		},
	},
	args: {
		modelValue: ['delivery'],
		type: 'multiple',
		items: [
			{
				trigger: 'Доставка',
				content: 'Курьерская доставка доступна по городу и ближайшим районам.',
			},
			{
				trigger: 'Оплата',
				content: 'Можно оплатить заказ картой, наличными или по счету.',
			},
			{
				trigger: 'Возврат',
				content: 'Возврат оформляется через поддержку в течение 14 дней.',
			},
		],

	} satisfies AccordionStoryArgs,
	render: (args: AccordionStoryArgs) => ({
		components: { Accordion },
		setup() { return { args } },
		template: `
			<Accordion
				v-model="args.modelValue"
				:items="args.items"
				:type="args.type"
			/>
		`,
	}),
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<AccordionStoryArgs>

export const Multiple: Story = {
	args: {
		modelValue: ['delivery'],
	} satisfies Partial<AccordionStoryArgs>,
}

export const Single: Story = {
	args: {
		modelValue: 'delivery',
		type: 'single',
	} satisfies Partial<AccordionStoryArgs>,
}

export const Tests: Story = {
	args: {
		modelValue: [],
		type: 'multiple',
	} satisfies Partial<AccordionStoryArgs>,
	play: async ({ canvas, userEvent }) => {
		const delivery = canvas.getByRole('button', { name: 'Доставка' })
		const payment = canvas.getByRole('button', { name: 'Оплата' })

		await expect(delivery).toHaveAttribute('aria-expanded', 'false')
		await expect(payment).toHaveAttribute('aria-expanded', 'false')

		await userEvent.click(delivery)
		await waitFor(() => expect(delivery).toHaveAttribute('aria-expanded', 'true'))

		await userEvent.click(payment)
		await waitFor(() => expect(delivery).toHaveAttribute('aria-expanded', 'true'))
		await expect(payment).toHaveAttribute('aria-expanded', 'true')

		await userEvent.click(delivery)
		await waitFor(() => expect(delivery).toHaveAttribute('aria-expanded', 'false'))
		await expect(payment).toHaveAttribute('aria-expanded', 'true')
	},
}
