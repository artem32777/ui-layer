import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { useArgs } from 'storybook/preview-api'
import IconPicker from '@@/.storybook/components/IconPicker.vue'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import Popover from '../../Popover/Popover.vue'
import { buttonSizes, buttonVariants } from '../Button.types.ts'
import Button from '../Button.vue'
import { iconNameList, iconNames } from '#layers/ui/app/modules/svg-icon'
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
// type StylesStory = StoryObj<ButtonStylesStoryArgs>

export const Base: Story = {
	render: (args: ButtonStoryArgs) => {
		const [, updateArgs] = useArgs<ButtonStoryArgs>()
		const icon = iconNames.circle

		return {
			components: { Button, IconPicker, Popover, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
			setup() {
				return { args, buttonVariants, updateArgs, icon }
			},
			template: `
				<div style="display: grid; gap: 24px;">
					<div style="display: flex; gap: 12px; flex-wrap: wrap;">
						<Popover>
							<Button text="Выбрать левую иконку" variant="secondary" :icon-left="args.iconLeft" />

							<template #content="{ close }">
								<IconPicker
									:model-value="args.iconLeft"
									@update:model-value="updateArgs({ iconLeft: $event }); close()"
								/>
							</template>
						</Popover>

						<Popover>
							<Button text="Выбрать правую иконку" variant="secondary" :icon-right="args.iconRight" />

							<template #content="{ close }">
								<IconPicker
									:model-value="args.iconRight"
									@update:model-value="updateArgs({ iconRight: $event }); close()"
								/>
							</template>
						</Popover>
					</div>
					
					<div>
						<Button v-bind="args" />
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
			focusVisible: '.button-story--focused',
		},
	},
	render: (args: ButtonStoryArgs) => {
		const [, updateArgs] = useArgs<ButtonStoryArgs>()
		const icon = iconNames.circle

		return {
			components: { Button, IconPicker, Popover, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
			setup() {
				return { args, buttonVariants, updateArgs, icon }
			},
			template: `
				<div style="display: grid; gap: 24px;">
					<div style="display: flex; gap: 12px; flex-wrap: wrap;">
						<Popover>
							<Button text="Выбрать левую иконку" variant="secondary" :icon-left="args.iconLeft" />

							<template #content="{ close }">
								<IconPicker
									:model-value="args.iconLeft"
									@update:model-value="updateArgs({ iconLeft: $event }); close()"
								/>
							</template>
						</Popover>

						<Popover>
							<Button text="Выбрать правую иконку" variant="secondary" :icon-right="args.iconRight" />

							<template #content="{ close }">
								<IconPicker
									:model-value="args.iconRight"
									@update:model-value="updateArgs({ iconRight: $event }); close()"
								/>
							</template>
						</Popover>
					</div>

					<StoryGrid>
						<StoryGridSection
							v-for="variant in buttonVariants"
							:key="variant"
							:title="variant"
						>
							<StoryGridRow>
								<StoryGridItem title="default">
									<Button v-bind="args" :variant="variant" />
									<Button v-bind="args" :variant="variant" :icon-left="icon" >
										{{ args.text }}
									</Button>
									<Button v-bind="args" :variant="variant" :icon-right="icon">
										{{ args.text }}
									</Button>
									<Button v-bind="args" :variant="variant" text="" :icon-left="icon" aria-label="Добавить" />
								</StoryGridItem>
								<StoryGridItem title="hover">
									<Button v-bind="args" :variant="variant" class="button-story--hovered" />
									<Button v-bind="args" :variant="variant" :icon-left="icon"  class="button-story--hovered">
										{{ args.text }}
									</Button>
									<Button v-bind="args" :variant="variant" :icon-right="icon" class="button-story--hovered">
										{{ args.text }}
									</Button>
									<Button v-bind="args" :variant="variant" text="" :icon-left="icon" class="button-story--hovered" aria-label="Добавить" />
								</StoryGridItem>
								<StoryGridItem title="disabled">
									<Button v-bind="args" :variant="variant" disabled  />
									<Button v-bind="args" :variant="variant" disabled :icon-left="icon" >
										{{ args.text }}
									</Button>
									<Button v-bind="args" :variant="variant" disabled :icon-right="icon">
										{{ args.text }}
									</Button>
									<Button v-bind="args" :variant="variant" text="" disabled :icon-left="icon" aria-label="Добавить" />
								</StoryGridItem>
							</StoryGridRow>
						</StoryGridSection>
					</StoryGrid>
				</div>
			`,
		}
	},
}
