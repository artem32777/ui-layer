import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, waitFor, within } from 'storybook/test'
import { ref } from 'vue'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import Button from '../../Button/Button.vue'
import DropdownMenu from '../DropdownMenu.vue'
import dropdownMenuTypesSource from '../DropdownMenu.types.ts?raw'
import type { DropdownMenuItem } from '../DropdownMenu.types.ts'

type DropdownMenuStoryArgs = ComponentProps<typeof DropdownMenu>

const items: DropdownMenuItem[] = [
	{ label: 'Edit' },
	{ label: 'Duplicate' },
	{
		label: 'More',
		children: [
			{ label: 'Save page' },
			{ label: 'Create shortcut' },
		],
	},
	{ label: 'Delete', disabled: true },
]

const meta = {
	title: 'UI/DropdownMenu',
	component: DropdownMenu,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		modelValue: { description: 'Открыто ли меню.' },
		items: {
			table: {
				type: {
					summary: 'DropdownMenuItem[]',
					detail: dropdownMenuTypesSource.trim(),
				},
			},
		},
		offset: { control: 'number' },
	},
	args: {
		items,
		offset: 6,
		modelValue: false,
	} satisfies DropdownMenuStoryArgs,
	render: (args: DropdownMenuStoryArgs) => ({
		components: { Button, DropdownMenu },
		setup: () => ({ args }),
		template: `
			<DropdownMenu v-bind="args">
				<Button text="Open menu" />
			</DropdownMenu>
		`,
	}),
} satisfies Meta<typeof DropdownMenu>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const States: Story = {
	render: (args: DropdownMenuStoryArgs) => ({
		components: { Button, DropdownMenu, StoryGrid, StoryGridItem, StoryGridRow },
		setup() {
			const opened = ref(true)

			return { args, opened }
		},
		template: `
			<StoryGrid>
				<StoryGridRow>
					<StoryGridItem title="default">
						<DropdownMenu v-bind="args">
							<Button text="Open menu" />
						</DropdownMenu>
					</StoryGridItem>
					<StoryGridItem title="opened">
						<DropdownMenu
							v-bind="args"
							v-model="opened"
						>
							<Button text="Menu"/>
						</DropdownMenu>
					</StoryGridItem>
				</StoryGridRow>
			</StoryGrid>
		`,
	}),
}

export const Tests: Story = {
	play: async ({ canvas, canvasElement, userEvent }) => {
		const trigger = canvas.getByRole('button', { name: 'Open menu' })
		const body = within(canvasElement.ownerDocument.body)

		await userEvent.click(trigger)
		await waitFor(() => expect(body.getByRole('menu')).toBeVisible())
		await expect(body.getByRole('menuitem', { name: 'Delete' })).toHaveAttribute('aria-disabled', 'true')

		await userEvent.hover(body.getByRole('menuitem', { name: 'More' }))
		await waitFor(() => expect(body.getByRole('menuitem', { name: 'Save page' })).toBeVisible())

		await userEvent.keyboard('{Escape}')
		await waitFor(() => expect(body.queryByRole('menu')).not.toBeInTheDocument())
		await expect(trigger).toHaveFocus()
	},
}
