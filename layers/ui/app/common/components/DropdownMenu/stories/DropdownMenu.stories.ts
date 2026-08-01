import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, waitFor, within } from 'storybook/test'
import Button from '../../Button/Button.vue'
import DropdownMenu from '../DropdownMenu.vue'
import dropdownMenuTypesSource from '../DropdownMenu.types.ts?raw'

type DropdownMenuStoryArgs = ComponentProps<typeof DropdownMenu>

const items = [
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
	parameters: {
		a11y: { test: 'error' },
	},
	argTypes: {
		items: {
			control: 'object',
			description: 'Пункты меню для стандартного отображения через DropdownMenuItems.',
			table: {
				type: {
					summary: 'DropdownMenuItem[]',
					detail: dropdownMenuTypesSource.trim(),
				},
			},
		},
		offset: {
			control: { type: 'number', min: 0 },
			description: 'Расстояние между триггером и выпадающим меню в пикселях.',
			table: { type: { summary: 'number' } },
		},
	},
	args: {
		items,
		offset: 6,
	} satisfies DropdownMenuStoryArgs,
	render: (args: DropdownMenuStoryArgs) => ({
		components: { Button, DropdownMenu },
		setup: () => ({ args }),
		template: `
			<DropdownMenu v-bind="args">
				<template #trigger><Button text="Open menu" /></template>
			</DropdownMenu>
		`,
	}),
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {}

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
