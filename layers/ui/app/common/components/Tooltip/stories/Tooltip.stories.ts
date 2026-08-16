import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, waitFor, within } from 'storybook/test'
import Tooltip from '../Tooltip.vue'
import Button from '../../Button/Button.vue'
import { getStringsArrFromKey } from '~/common/utils/getStringsArrFromKey.ts'

type TooltipStoryArgs = ComponentProps<typeof Tooltip>
const getOptions = getStringsArrFromKey<TooltipStoryArgs>()

const meta = {
	title: 'UI/Tooltip',
	component: Tooltip,
	argTypes: {
		modelValue: {
			description: 'Задаётся если нужно управление состоянием из родителя',
			control: 'boolean',
			table: { type: { summary: 'boolean' } },
		},
		text: { control: 'text' },
		align: {
			control: 'select',
			options: getOptions('align', ['start', 'center', 'end']),
		},
		side: {
			control: 'select',
			options: getOptions('side', ['top', 'bottom', 'left', 'right']),
		},
		offset: { control: 'number' },
	},
	args: {
		text: 'Текст подсказки',
	} satisfies TooltipStoryArgs,
	render: (args: TooltipStoryArgs) => ({
		components: { Tooltip, Button },
		setup() { return { args } },
		template: `
			<Tooltip v-bind="args" >
				<Button>Наведите курсор</Button>
			</Tooltip>
		`,
	}),
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {

}

export const Opened: Story = {
	render: (args: TooltipStoryArgs) => ({
		components: { Tooltip, Button },
		setup() {
			return {
				modelValue: true,
				args,
			}
		},
		template: `
			<Tooltip v-model="modelValue" v-bind="args">
				<Button type="button">Триггер</Button>
			</Tooltip>
		`,
	}),
}

export const Tests: Story = {
	play: async ({ canvas, canvasElement, userEvent }) => {
		const trigger = canvas.getByRole('button', { name: 'Наведите курсор' })
		const body = within(canvasElement.ownerDocument.body)

		await userEvent.hover(trigger)
		await expect(await body.findByRole('tooltip', { hidden: true })).toHaveTextContent('Текст')

		await userEvent.keyboard('{Escape}')
		await waitFor(() => expect(body.queryByRole('tooltip', { hidden: true })).not.toBeInTheDocument())
	},
}
