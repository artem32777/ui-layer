import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { getStringsArrFromKey } from '~/common/utils/getStringsArrFromKey'
import { iconNameList, iconNames } from '#layers/ui/app/modules/svg-icon/runtime/iconNames'
import Button from '../Button.vue'

type ButtonStoryArgs = ComponentProps<typeof Button>
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
