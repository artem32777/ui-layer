import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { useArgs } from 'storybook/preview-api'
import { expect } from 'storybook/test'
import IconPickerControl from '@@/.storybook/components/IconPickerControl.vue'
import { buttonLinkSizes, buttonLinkVariants } from '../ButtonLink.types.ts'
import ButtonLink from '../ButtonLink.vue'
import ButtonLinkStates from './ButtonLinkStates.vue'
import { iconNameList } from '#layers/ui/app/modules/svg-icon'
import { Theme, ThemeNamesArray } from '#layers/ui/app/config/theme.ts'

type ButtonLinkStoryArgs = ComponentProps<typeof ButtonLink>

const meta = {
	title: 'UI/ButtonLink',
	component: ButtonLink,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		variant: { control: 'select', options: buttonLinkVariants },
		theme: { control: 'select', options: ThemeNamesArray },
		size: { control: 'select', options: buttonLinkSizes },
		href: { control: 'text' },
		iconLeft: { control: 'select', options: iconNameList },
		iconRight: { control: 'select', options: iconNameList },
	},
	args: {
		text: 'Ссылка',
		href: '#',
		variant: 'dark',
		theme: Theme.light,
		size: 'medium',
	} satisfies ButtonLinkStoryArgs,
	render: (args: ButtonLinkStoryArgs) => ({
		components: { ButtonLink },
		setup() {
			return { args }
		},
		template: '<ButtonLink v-bind="args" />',
	}),
} satisfies Meta<typeof ButtonLink>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
	render: (args: ButtonLinkStoryArgs) => {
		const [, updateArgs] = useArgs<ButtonLinkStoryArgs>()

		return {
			components: { ButtonLink, IconPickerControl },
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

					<div :style="args.variant === 'on-media' ? { padding: '16px', borderRadius: '8px', backgroundColor: 'var(--primary-500)' } : undefined">
						<ButtonLink v-bind="args" :icon-right="args.text ? args.iconRight : undefined" />
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
			hover: '.button-link-story--hovered',
		},
	},
	render: (args: ButtonLinkStoryArgs) => {
		const [, updateArgs] = useArgs<ButtonLinkStoryArgs>()

		return {
			components: { ButtonLinkStates },
			setup() {
				return { args, updateArgs }
			},
			template: `
				<ButtonLinkStates
					v-bind="args"
					@update:icon-left="updateArgs({ iconLeft: $event })"
					@update:icon-right="updateArgs({ iconRight: $event })"
				/>
			`,
		}
	},
}
