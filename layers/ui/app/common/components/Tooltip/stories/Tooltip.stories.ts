import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, waitFor, within } from 'storybook/test'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import Button from '../../Button/Button.vue'
import { tooltipAligns, tooltipSides } from '../Tooltip.types.ts'
import Tooltip from '../Tooltip.vue'

type TooltipStoryArgs = ComponentProps<typeof Tooltip>

const meta = {
	title: 'UI/Tooltip',
	component: Tooltip,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		modelValue: {
			description: 'Открыт ли тултип',
			control: 'boolean',
			table: { type: { summary: 'boolean' } },
		},
		text: { control: 'text' },
		align: { control: 'select', options: tooltipAligns },
		side: { control: 'select', options: tooltipSides },
		offset: { control: 'number' },
	},
	args: {
		text: 'Текст подсказки',
		side: 'bottom',
		align: 'center',
		offset: 10,
		modelValue: false,
	} satisfies TooltipStoryArgs,
	render: (args: TooltipStoryArgs) => ({
		components: { Tooltip, Button },
		setup() { return { args } },
		template: `
			<Tooltip v-bind="args">
				<Button>Наведите курсор</Button>
			</Tooltip>
		`,
	}),
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.tooltip-story--hovered',
			focusVisible: '.tooltip-story--focused',
		},
	},
	render: (args: TooltipStoryArgs) => ({
		components: { Tooltip, Button, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			return { args, tooltipSides }
		},
		template: `
			<StoryGrid>
				<StoryGridSection title="bottom">
					<StoryGridRow>
						<StoryGridItem title="default" style="padding: 48px;">
							<Tooltip v-bind="args">
								<Button>Наведите курсор</Button>
							</Tooltip>
						</StoryGridItem>
						<StoryGridItem title="hover" style="padding: 48px;">
							<Tooltip
								v-bind="args"
								:model-value="true"
							>
								<Button class="tooltip-story--hovered">Наведите курсор</Button>
							</Tooltip>
						</StoryGridItem>
						<StoryGridItem title="focus" style="padding: 48px;">
							<Tooltip
								v-bind="args"
								:model-value="true"
							>
								<Button class="tooltip-story--focused">Наведите курсор</Button>
							</Tooltip>
						</StoryGridItem>
					</StoryGridRow>
				</StoryGridSection>
			</StoryGrid>
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
