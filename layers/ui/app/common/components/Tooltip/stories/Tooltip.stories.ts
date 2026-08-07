import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, waitFor, within } from 'storybook/test'
import Tooltip from '../Tooltip.vue'

type TooltipStoryArgs = ComponentProps<typeof Tooltip>

const meta = {
	title: 'UI/Tooltip',
	component: Tooltip,
	argTypes: {
		text: { control: 'text' },
	},
	args: {
		text: 'Текст подсказки',
	} satisfies TooltipStoryArgs,
	render: (args: TooltipStoryArgs) => ({
		components: { Tooltip },
		setup() { return { args } },
		template: `
			<Tooltip v-bind="args">
				<button type="button">Наведите курсор</button>
			</Tooltip>
		`,
	}),
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {}

export const ContentSlot: Story = {
	render: (args: TooltipStoryArgs) => ({
		components: { Tooltip },
		setup() { return { args } },
		template: `
			<Tooltip v-bind="args">
				<button type="button">Наведите курсор</button>
				<template #content>
					<strong>Содержимое из слота</strong>
				</template>
			</Tooltip>
		`,
	}),
}

export const Opened: Story = {
	render: (args: TooltipStoryArgs) => ({
		components: { Tooltip },
		setup() { return { args } },
		template: `
			<Tooltip :open="true" v-bind="args">
				<button type="button">Триггер</button>
				<template #content>
					<strong>Содержимое тултипа</strong>
				</template>
			</Tooltip>
		`,
	}),
}

export const Tests: Story = {
	play: async ({ canvas, canvasElement, userEvent }) => {
		const trigger = canvas.getByRole('button', { name: 'Наведите курсор' })
		const body = within(canvasElement.ownerDocument.body)

		await userEvent.hover(trigger)
		await expect(await body.findByRole('tooltip', { hidden: true })).toHaveTextContent('Текст подсказки')

		await userEvent.keyboard('{Escape}')
		await waitFor(() => expect(body.queryByRole('tooltip', { hidden: true })).not.toBeInTheDocument())
	},
}
