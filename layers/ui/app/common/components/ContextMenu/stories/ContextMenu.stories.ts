import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, fireEvent, waitFor, within } from 'storybook/test'
import ContextMenu from '../ContextMenu.vue'
import contextMenuTypesSource from '../ContextMenu.types.ts?raw'
import type { ContextMenuItem } from '../ContextMenu.types'

type ContextMenuStoryArgs = ComponentProps<typeof ContextMenu>

const items: ContextMenuItem[] = [
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
	title: 'UI/ContextMenu',
	component: ContextMenu,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		items: {
			table: {
				type: {
					summary: 'ContextMenuItem[]',
					detail: contextMenuTypesSource.trim(),
				},
			},
		},
	},
	args: {
		items,
	} satisfies ContextMenuStoryArgs,
	render: (args: ContextMenuStoryArgs) => ({
		components: { ContextMenu },
		setup: () => ({ args }),
		template: `
			<ContextMenu v-bind="args">
				<div style="display: grid; place-items: center; width: 420px; min-height: 180px; padding: 24px; border: 1px dashed currentColor; border-radius: 8px; user-select: none;" tabindex="0">
					Right-click here
				</div>
			</ContextMenu>
		`,
	}),
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {}

export const Tests: Story = {
	play: async ({ canvas, canvasElement, userEvent }) => {
		const trigger = canvas.getByText('Right-click here')
		const body = within(canvasElement.ownerDocument.body)

		await fireEvent.contextMenu(trigger)
		await waitFor(() => expect(body.getByRole('menu')).toBeVisible())
		await expect(body.getByRole('menuitem', { name: 'Delete' })).toHaveAttribute('aria-disabled', 'true')

		await userEvent.hover(body.getByRole('menuitem', { name: 'More' }))
		await waitFor(() => expect(body.getByRole('menuitem', { name: 'Save page' })).toBeVisible())

		await userEvent.click(body.getByRole('menuitem', { name: 'Save page' }))
		await waitFor(() => expect(body.queryAllByRole('menu')).toHaveLength(0))
	},
}
