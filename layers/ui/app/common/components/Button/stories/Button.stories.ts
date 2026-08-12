import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { useClipboard } from '@vueuse/core'
import { expect, waitFor } from 'storybook/test'
import { computed } from 'vue'
import { getStringsArrFromKey } from '~/common/utils/getStringsArrFromKey'
import { iconNameList, iconNames } from '#layers/ui/app/modules/svg-icon/runtime/iconNames'
import Button from '../Button.vue'

type ButtonStoryArgs = ComponentProps<typeof Button>
type ButtonStylesStoryArgs = ButtonStoryArgs & {
	backgroundColor: string
	borderRadius: string
}
type ButtonState = NonNullable<ButtonStoryArgs['state']>
type ButtonVariant = NonNullable<ButtonStoryArgs['variant']>

const getOptions = getStringsArrFromKey<ButtonStoryArgs>()
const buttonStates = ['default', 'disabled', 'progress', 'focused', 'hovered', 'pressed'] satisfies ButtonState[]

const renderAllStates = (variant: ButtonVariant) => (args: ButtonStoryArgs) => ({
	components: { Button },
	setup() {
		return {
			args,
			buttonStates,
			variant,
		}
	},
	template: `
		<div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 24px;">
			<div
				v-for="state in buttonStates"
				:key="state"
				style="display: flex; flex-direction: column; align-items: flex-start; gap: 8px;"
			>
				<span style="color: #666; font-size: 12px; line-height: 1;">{{ state }}</span>
				<Button v-bind="args" :variant="variant" :state="state" />
			</div>
		</div>
	`,
})

const meta = {
	title: 'UI/Button',
	component: Button,
	argTypes: {
		variant: {
			control: 'select',
			options: getOptions('variant', ['base', 'outline', 'ghost', 'outline']),
		},
		size: {
			control: 'select',
			options: getOptions('size', ['m', 'l', 'xl']),
		},
		state: {
			control: 'select',
			options: getOptions('state', ['default', 'disabled', 'progress', 'focused', 'hovered', 'pressed']),
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
		asChild: { control: 'boolean' },
	},
	args: {
		text: 'Кнопка',
		variant: 'base',
		state: 'default',
		size: 'm',
		type: 'button',
		iconLeft: undefined,
		iconRight: undefined,
	} satisfies ButtonStoryArgs,
	render: (args: ButtonStoryArgs) => ({
		components: { Button },
		setup() { return { args } },
		template: '<Button v-bind="args">{{ args.label }}</Button>',
	}),
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>
type StylesStory = StoryObj<ButtonStylesStoryArgs>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const Base: Story = {
	render: renderAllStates('base'),
}

export const Outline: Story = {
	args: {
		variant: 'outline',
	} satisfies Partial<ButtonStoryArgs>,
	render: renderAllStates('outline'),
}

export const Ghost: Story = {
	args: {
		variant: 'ghost',
	} satisfies Partial<ButtonStoryArgs>,
	render: renderAllStates('ghost'),
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
					:as-child="args.asChild"
					:style="{ backgroundColor: args.backgroundColor, borderRadius: args.borderRadius }"
				/>
				<label style="display: grid; gap: 8px; width: min(100%, 420px);">
					<span style="font-size: 14px; font-weight: 600;">JSON для админки</span>
					<textarea
						:value="json"
						readonly
						aria-label="JSON для админки"
						rows="4"
						style="box-sizing: border-box; width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; resize: vertical; font-family: monospace;"
					/>
				</label>
				<button
					type="button"
					style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px; background: #ffffff; cursor: pointer;"
					@click="copy()"
				>
					{{ copied ? 'Скопировано' : 'Скопировать JSON' }}
				</button>
			</div>
		`,
	}),
	play: async ({ canvas, userEvent }) => {
		const button = canvas.getByRole('button', { name: 'Кнопка' })
		const json = canvas.getByRole('textbox', { name: 'JSON для админки' })
		const copyButton = canvas.getByRole('button', { name: 'Скопировать JSON' })

		await expect(button).toHaveStyle({
			backgroundColor: '#7c3aed',
			borderRadius: '16px',
		})
		await expect(json).toHaveValue(`{
  "backgroundColor": "#7c3aed",
  "borderRadius": "16px"
}`)
		await userEvent.click(copyButton)
		await waitFor(() => expect(copyButton).toHaveTextContent('Скопировано'))
	},
}

export const IconOnly: Story = {
	args: {
		iconLeft: iconNames.plus,
		text: '',
	} satisfies Partial<ButtonStoryArgs>,
	render: (args: ButtonStoryArgs) => ({
		components: { Button },
		setup() { return { args, buttonStates } },
		template: `
			<div style="display: flex; flex-direction: column; gap: 32px;">
				<div
					v-for="variant in ['base', 'ghost', 'outline']"
					:key="variant"
					style="display: flex; flex-direction: column; gap: 12px;"
				>
					<span style="color: #666; font-size: 14px; font-weight: 600; line-height: 1;">{{ variant }}</span>
					<div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 24px;">
						<div
							v-for="state in buttonStates"
							:key="state"
							style="display: flex; flex-direction: column; align-items: flex-start; gap: 8px;"
						>
							<span style="color: #666; font-size: 12px; line-height: 1;">{{ state }}</span>
							<Button v-bind="args" :variant="variant" :state="state" aria-label="Add" />
						</div>
					</div>
				</div>
			</div>
		`,
	}),
}
