import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { useArgs } from 'storybook/preview-api'
import IconPickerControl from '@@/.storybook/components/IconPickerControl.vue'
import { buttonSizes, buttonVariants } from '../Button.types.ts'
import Button from '../Button.vue'
import ButtonStates from './ButtonStates.vue'
import { iconNameList } from '#layers/ui/app/modules/svg-icon'
import { Theme, ThemeNamesArray } from '#layers/ui/app/config/theme.ts'

type ButtonStoryArgs = ComponentProps<typeof Button>

const meta = {
	title: 'UI/Button',
	component: Button,
	argTypes: {
		variant: { control: 'select', options: buttonVariants },
		theme: { control: 'select', options: ThemeNamesArray },
		size: { control: 'select', options: buttonSizes },
		disabled: { control: 'boolean' },
		type: { control: 'select', options: ['button', 'submit', 'reset'] },
		iconLeft: { control: 'select', options: iconNameList },
		iconRight: { control: 'select', options: iconNameList },
	},
	args: {
		text: 'Кнопка',
		variant: 'primary',
		theme: Theme.light,
		disabled: false,
		size: 'medium',
		type: 'button',
	} satisfies ButtonStoryArgs,
	render: (args: ButtonStoryArgs) => ({
		components: { Button },
		setup() {
			return { args }
		},
		template: '<Button v-bind="args" />',
	}),
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
	render: (args: ButtonStoryArgs) => {
		const [, updateArgs] = useArgs<ButtonStoryArgs>()

		return {
			components: { Button, IconPickerControl },
			setup() {
				return { args, updateArgs }
			},
			template: `
				<div style="display: grid; gap: 24px;">
					<div style="display: flex; gap: 12px; flex-wrap: wrap;">
						<IconPickerControl
							text="Выбрать левую иконку"
							side="left"
							:model-value="args.iconLeft"
							@update:model-value="updateArgs({ iconLeft: $event })"
						/>

						<IconPickerControl
							text="Выбрать правую иконку"
							side="right"
							:model-value="args.iconRight"
							@update:model-value="updateArgs({ iconRight: $event })"
						/>
					</div>
					
					<div>
						<Button v-bind="args" :icon-right="args.text ? args.iconRight : undefined" />
					</div>
				</div>
			`,
		}
	},
}

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.button-story--hovered',
		},
	},
	render: (args: ButtonStoryArgs) => {
		const [, updateArgs] = useArgs<ButtonStoryArgs>()

		return {
			components: { ButtonStates },
			setup() {
				return { args, updateArgs }
			},
			template: `
				<ButtonStates
					v-bind="args"
					@update:icon-left="updateArgs({ iconLeft: $event })"
					@update:icon-right="updateArgs({ iconRight: $event })"
				/>
			`,
		}
	},
}
