import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, waitFor, within } from 'storybook/test'
import { reactive } from 'vue'
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
			<DropdownMenu v-bind="args" v-model="args.modelValue">
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
	parameters: {
		pseudo: {
			hover: '.dropdown-menu-story--hovered',
			focusVisible: '.dropdown-menu-story--focused',
		},
	},
	render: (args: DropdownMenuStoryArgs) => ({
		components: { Button, DropdownMenu, StoryGrid, StoryGridItem, StoryGridRow },
		setup() {
			const models = reactive({
				default: false,
				hover: true,
				focus: true,
			})

			return { args, models }
		},
		template: `
			<StoryGrid>
				<StoryGridRow>
					<StoryGridItem title="default" style="min-height: 220px; padding: 24px;">
						<DropdownMenu
							v-bind="args"
							v-model="models.default"
						>
							<Button text="Open menu" />
						</DropdownMenu>
					</StoryGridItem>
					<StoryGridItem title="hover" style="min-height: 220px; padding: 24px;">
						<DropdownMenu
							v-bind="args"
							v-model="models.hover"
						>
							<Button text="Open menu" class="dropdown-menu-story--hovered" />
						</DropdownMenu>
					</StoryGridItem>
					<StoryGridItem title="focus" style="min-height: 220px; padding: 24px;">
						<DropdownMenu
							v-bind="args"
							v-model="models.focus"
						>
							<Button text="Open menu" class="dropdown-menu-story--focused" />
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
