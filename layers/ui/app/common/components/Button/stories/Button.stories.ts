import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { useArgs } from 'storybook/preview-api'
import { useClipboard } from '@vueuse/core'
import { computed } from 'vue'
import IconPicker from '@@/.storybook/components/IconPicker.vue'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import Popover from '../../Popover/Popover.vue'
import { buttonSizes, buttonVariants } from '../Button.types.ts'
import Button from '../Button.vue'
import { iconNameList, iconNames } from '#layers/ui/app/modules/svg-icon'

type ButtonStoryArgs = ComponentProps<typeof Button>
type ButtonStylesStoryArgs = ButtonStoryArgs & {
	backgroundColor: string
	borderRadius: string
}

const meta = {
	title: 'UI/Button',
	component: Button,
	argTypes: {
		variant: { control: 'select', options: buttonVariants },
		size: { control: 'select', options: buttonSizes },
		disabled: { control: 'boolean' },
		type: { control: 'select', options: ['button', 'submit', 'reset'] },
		iconLeft: { control: 'select', options: iconNameList },
		iconRight: { control: 'select', options: iconNameList },
	},
	args: {
		text: 'Кнопка',
		variant: 'primary',
		disabled: false,
		size: 'medium',
		type: 'button',
	} satisfies ButtonStoryArgs,
	render: (args: ButtonStoryArgs) => ({
		components: { Button },
		setup() {
			return { args }
		},
		template: '<Button v-bind="args">{{ args.label }}</Button>',
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
						<Button v-bind="args" text="Кнопка" />
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
								<StoryGridItem title="focus">
									<Button v-bind="args" :variant="variant" class="button-story--focused" />
									<Button v-bind="args" :variant="variant" :icon-left="icon"  class="button-story--focused">
										{{ args.text }}
									</Button>
									<Button v-bind="args" :variant="variant" :icon-right="icon" class="button-story--focused">
										{{ args.text }}
									</Button>
									<Button v-bind="args" :variant="variant" text="" :icon-left="icon"  class="button-story--focused" aria-label="Добавить" />
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

// export const Styles: StylesStory = {
// 	args: {
// 		backgroundColor: '#7c3aed',
// 		borderRadius: '16px',
// 	},
// 	argTypes: {
// 		backgroundColor: { control: 'color' },
// 		borderRadius: { control: 'text' },
// 	},
// 	render: (args: ButtonStylesStoryArgs) => ({
// 		components: { Button },
// 		setup() {
// 			const json = computed(() => JSON.stringify({
// 				backgroundColor: args.backgroundColor,
// 				borderRadius: args.borderRadius,
// 			}, null, 2))
// 			const { copy, copied } = useClipboard({ source: json })
//
// 			return { args, json, copy, copied }
// 		},
// 		template: `
// 			<div style="display: grid; justify-items: start; gap: 16px;">
// 				<Button
// 					:text="args.text"
// 					:variant="args.variant"
// 					:size="args.size"
// 					:type="args.type"
// 					:icon-left="args.iconLeft"
// 					:icon-right="args.iconRight"
// 					:disabled="args.disabled"
// 					:style="{ backgroundColor: args.backgroundColor, borderRadius: args.borderRadius }"
// 				/>
// 				<label style="display: grid; gap: 8px; width: min(100%, 420px);">
// 					<span style="font-weight: 600;">JSON для админки</span>
// 					<textarea
// 						:value="json"
// 						readonly
// 						aria-label="JSON для админки"
// 						rows="4"
// 						style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; resize: vertical"
// 					/>
// 				</label>
// 				<button
// 					type="button"
// 					style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px; background: #ffffff"
// 					@click="copy()"
// 				>
// 					{{ copied ? 'Скопировано' : 'Скопировать JSON' }}
// 				</button>
// 			</div>
// 		`,
// 	}),
// }
