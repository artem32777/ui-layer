import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import SvgIcon from '../../../../modules/svg-icon/components/SvgIcon.vue'
import { iconNameList, iconNames } from '#layers/ui/app/modules/svg-icon/runtime/iconNames'

type SvgIconStoryArgs = ComponentProps<typeof SvgIcon>

const meta = {
	title: 'UI/SvgIcon',
	component: SvgIcon,
	argTypes: {
		name: {
			control: 'select',
			options: iconNameList,
		},
		size: { control: 'text' },
		color: { control: 'color' },
	},
	args: {
		name: iconNames.plus,
		size: 24,
		color: '#4149f2',
	} satisfies SvgIconStoryArgs,
} satisfies Meta<typeof SvgIcon>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
	render: args => ({
		components: { SvgIcon },
		setup() { return { args, iconNames } },
		template: '<SvgIcon v-bind="args" :name="args.name ?? iconNames.plus" />',
	}),
}

export const InheritedColor: Story = {
	args: {
		name: iconNames.check,
		color: undefined,
	},
	render: args => ({
		components: { SvgIcon },
		setup() { return { args } },
		template: `
			<div style="color: var(--brand);">
				<SvgIcon v-bind="args" />
			</div>
		`,
	}),
}

export const CustomSize: Story = {
	args: {
		name: iconNames.download,
		size: 40,
	},
}

export const Gallery: Story = {
	render: () => ({
		components: { SvgIcon },
		setup() { return { iconNameList } },
		template: `
			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px;">
				<div
					v-for="name in iconNameList"
					:key="name"
					style="display: grid; justify-items: center; gap: 8px; padding: 16px; border: 1px solid var(--grey); border-radius: 8px;"
				>
					<SvgIcon :name="name" :size="28" />
					<code>{{ name }}</code>
				</div>
			</div>
		`,
	}),
}
