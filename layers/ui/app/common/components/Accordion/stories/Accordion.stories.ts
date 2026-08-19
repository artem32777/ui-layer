import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, waitFor } from 'storybook/test'
import { reactive } from 'vue'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import Accordion from '../Accordion.vue'
import { accordionTypes } from '../Accordion.types.ts'
import accordionTypesSource from '../Accordion.types.ts?raw'
import type { AccordionPropsItem } from '../Accordion.types.ts'

type AccordionStoryArgs = ComponentProps<typeof Accordion>

const defaultItems = [
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
] satisfies AccordionPropsItem[]

const meta = {
	title: 'UI/Accordion',
	component: Accordion,
	parameters: { a11y: { test: 'error' } },
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
		type: { control: 'select', options: accordionTypes },
		disabled: { control: 'boolean' },
	},
	args: {
		modelValue: ['Доставка'],
		type: 'multiple',
		disabled: false,
		items: defaultItems,
	} satisfies AccordionStoryArgs,
	render: (args: AccordionStoryArgs) => ({
		components: { Accordion },
		setup() { return { args } },
		template: '<Accordion v-bind="args" v-model="args.modelValue" />',
	}),
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.accordion-story--hovered .accordion__trigger',
			focusVisible: '.accordion-story--focused .accordion__trigger',
		},
	},
	render: (args: AccordionStoryArgs) => ({
		components: { Accordion, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			return { args, accordionTypes }
		},
		template: `
			<StoryGrid>
				<StoryGridSection
					v-for="type in accordionTypes"
					:key="type"
					:title="type"
				>
					<StoryGridRow>
						<StoryGridItem title="default" style="width: 280px;">
							<Accordion
								v-bind="args"
								:type="type"
							/>
						</StoryGridItem>
						<StoryGridItem title="hover" class="accordion-story--hovered" style="width: 280px;">
							<Accordion
								v-bind="args"
								:type="type"
							/>
						</StoryGridItem>
						<StoryGridItem title="focus" class="accordion-story--focused" style="width: 280px;">
							<Accordion
								v-bind="args"
								:type="type"
							/>
						</StoryGridItem>
						<StoryGridItem title="disabled" style="width: 280px;">
							<Accordion
								v-bind="args"
								:type="type"
								disabled
							/>
						</StoryGridItem>
					</StoryGridRow>
				</StoryGridSection>
			</StoryGrid>
		`,
	}),
}

export const Tests: Story = {
	args: {
		modelValue: [],
		type: 'multiple',
	},
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
