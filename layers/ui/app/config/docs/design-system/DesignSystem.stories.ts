import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
	title: 'Design System/Examples',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const GridBreakpoints: Story = {
	render: () => ({
		setup() {
			return {
				breakpoints: [
					{ name: '$xxxs', value: '320px' },
					{ name: '$xxs', value: '360px' },
					{ name: '$xs', value: '480px' },
					{ name: '$sm', value: '768px' },
					{ name: '$md', value: '960px' },
					{ name: '$lg', value: '1280px' },
					{ name: '$xl', value: '1440px' },
					{ name: '$xxl', value: '1920px' },
					{ name: '$xxxl', value: '2560px' },
				],
			}
		},
		template: `
			<div style="display: grid; gap: 20px;">
				<div style="display: grid; grid-template-columns: repeat(36, 1fr); gap: 2px; padding: 12px; border: 1px solid var(--grey); border-radius: 8px; background: var(--background);">
					<div
						v-for="index in 36"
						:key="index"
						style="height: 48px; border-radius: 4px; background: color-mix(in srgb, var(--brand) 18%, transparent);"
					/>
				</div>
				<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px;">
					<div
						v-for="breakpoint in breakpoints"
						:key="breakpoint.name"
						style="padding: 12px; border: 1px solid var(--grey); border-radius: 8px; background: var(--background);"
					>
						<strong style="display: block; color: var(--text);">{{ breakpoint.name }}</strong>
						<span style="color: var(--additional-2); font-size: 13px;">{{ breakpoint.value }}</span>
					</div>
				</div>
			</div>
		`,
	}),
}
