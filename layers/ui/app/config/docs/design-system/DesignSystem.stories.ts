import type { Meta, StoryObj } from '@storybook/vue3-vite'
import breakpointsScss from '#layers/ui/app/config/styles/shared/breakpoints.scss?raw'

const meta = {
	title: 'Design System/Examples',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const GridBreakpoints: Story = {
	render: () => ({
		setup() {
			const breakpoints = Array.from(breakpointsScss.matchAll(/^\s*(\$[\w-]+)\s*:\s*([^;]+);/gm), match => ({
				name: match[1]!,
				value: match[2]!.trim(),
			}))

			return { breakpoints }
		},
		template: `
			<div>
				<div style="display: grid; gap: 6px;">
					<div
						v-for="breakpoint in breakpoints"
						:key="breakpoint.name"
						style="display: flex; align-items: center; gap: 20px; border: 1px solid var(--grey); border-radius: 8px; background: var(--background);"
					>
						<strong style="font-size: 25px;">{{ breakpoint.name }}</strong>
						<span style="font-size: 25px !important">{{ breakpoint.value }}</span>
					</div>
				</div>
			</div>
		`,
	}),
}
