import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { useClipboard } from '@vueuse/core'
import { computed } from 'vue'
import { getStringsArrFromKey } from '~/common/utils/getStringsArrFromKey'
import { iconNameList, iconNames } from '#layers/ui/app/modules/svg-icon/runtime/iconNames'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import Button from '../Button.vue'

type ButtonStoryArgs = ComponentProps<typeof Button>
type ButtonStylesStoryArgs = ButtonStoryArgs & {
	backgroundColor: string
	borderRadius: string
}
const getOptions = getStringsArrFromKey<ButtonStoryArgs>()

type ButtonState = NonNullable<ButtonStoryArgs['state']>
type ButtonVariant = NonNullable<ButtonStoryArgs['variant']>
const buttonStates = ['default', 'hovered', 'focused', 'pressed', 'disabled'] satisfies ButtonState[]
const buttonVariants = ['primary', 'secondary', 'accent', 'white'] satisfies ButtonVariant[]

const meta = {
	title: 'UI/Button',
	component: Button,
	argTypes: {
		variant: {
			control: 'select',
			options: getOptions('variant', ['primary', 'secondary', 'accent', 'white']),
		},
		size: {
			control: 'select',
			options: getOptions('size', ['small', 'medium', 'big']),
		},
		state: {
			control: 'select',
			options: getOptions('state', ['default', 'disabled', 'focused', 'hovered', 'pressed']),
		},
		type: {
			control: 'select',
			options: getOptions('type', ['button', 'submit', 'reset']),
		},
		iconLeft: {
			control: 'select',
			options: iconNameList,
		},
		iconRight: {
			control: 'select',
			options: iconNameList,
		},
		disabled: { control: 'boolean' },
	},
	args: {
		text: 'Кнопка',
		variant: 'primary',
		state: 'default',
		size: 'medium',
		type: 'button',
		disabled: false,
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
type StylesStory = StoryObj<ButtonStylesStoryArgs>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const States: Story = {
	render: (args: ButtonStoryArgs) => ({
		components: { Button, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			return { args, buttonStates, buttonVariants, iconNames }
		},
		template: `
			<StoryGrid>
				<StoryGridSection
					v-for="variant in buttonVariants"
					:key="variant"
					:title="variant"
				>
					<StoryGridRow>
						<StoryGridItem
							v-for="state in buttonStates"
							:key="state"
							:title="state"
						>
							<Button v-bind="args" :variant="variant" :state="state"/>
							<Button v-bind="args" :variant="variant" :state="state" :icon-left="iconNames.plus">
								{{ args.text }}
							</Button>
							<Button v-bind="args" :variant="variant" :state="state" :icon-right="iconNames.chevronRight">
								{{ args.text }}
							</Button>
							<Button v-bind="args" :variant="variant" :state="state" text="" :icon-left="iconNames.plus" aria-label="Добавить" />
						</StoryGridItem>
					</StoryGridRow>
				</StoryGridSection>
			</StoryGrid>
		`,
	}),
}

export const Styles: StylesStory = {
	args: {
		backgroundColor: '#7c3aed',
		borderRadius: '16px',
	},
	argTypes: {
		backgroundColor: { control: 'color' },
		borderRadius: { control: 'text' },
	},
	render: (args: ButtonStylesStoryArgs) => ({
		components: { Button },
		setup() {
			const json = computed(() => JSON.stringify({
				backgroundColor: args.backgroundColor,
				borderRadius: args.borderRadius,
			}, null, 2))
			const { copy, copied } = useClipboard({ source: json })

			return { args, json, copy, copied }
		},
		template: `
			<div style="display: grid; justify-items: start; gap: 16px;">
				<Button
					:text="args.text"
					:variant="args.variant"
					:state="args.state"
					:size="args.size"
					:type="args.type"
					:icon-left="args.iconLeft"
					:icon-right="args.iconRight"
					:disabled="args.disabled"
					:style="{ backgroundColor: args.backgroundColor, borderRadius: args.borderRadius }"
				/>
				<label style="display: grid; gap: 8px; width: min(100%, 420px);">
					<span style="font-weight: 600;">JSON для админки</span>
					<textarea
						:value="json"
						readonly
						aria-label="JSON для админки"
						rows="4"
						style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; resize: vertical"
					/>
				</label>
				<button
					type="button"
					style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px; background: #ffffff"
					@click="copy()"
				>
					{{ copied ? 'Скопировано' : 'Скопировать JSON' }}
				</button>
			</div>
		`,
	}),
}
