import type { Meta, StoryObj } from '@storybook/vue3-vite'
import spacingScss from '#layers/ui/app/config/styles/spacing.scss?raw'

const meta = {
	title: 'Design System/Examples',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Spacing: Story = {
	render: () => ({
		setup() {
			const spacingSizes = Array.from(spacingScss.match(/\$spacing-sizes:\s*\(([\s\S]*?)\n\);/)?.[1]?.matchAll(/^\s*"?([\w-]+)"?:\s*\(([^)]+)\),?$/gm) ?? [])
				.map((match) => {
					const [mobile, tablet, desktop] = match[2]!.split(',').map(value => value.trim())

					return { name: `--spacing-${match[1]}`, mobile, tablet, desktop }
				})

			return { spacingSizes }
		},
		template: `
			<div style="overflow-x: auto;">
				<table style="width: 100%; min-width: 680px; border-collapse: collapse; text-align: left;">
					<thead>
						<tr>
							<th style="padding: 12px; border-bottom: 1px solid var(--neutral-700);">Переменная</th>
							<th style="padding: 12px; border-bottom: 1px solid var(--neutral-700);">Mobile</th>
							<th style="padding: 12px; border-bottom: 1px solid var(--neutral-700);">Tablet</th>
							<th style="padding: 12px; border-bottom: 1px solid var(--neutral-700);">Desktop</th>
							<th style="width: 224px; padding: 12px; border-bottom: 1px solid var(--neutral-700);">Превью Desktop</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="spacing in spacingSizes"
							:key="spacing.name"
						>
							<td style="padding: 12px; border-bottom: 1px solid var(--neutral-600);"><code>{{ spacing.name }}</code></td>
							<td style="padding: 12px; border-bottom: 1px solid var(--neutral-600);">{{ spacing.mobile }}</td>
							<td style="padding: 12px; border-bottom: 1px solid var(--neutral-600);">{{ spacing.tablet }}</td>
							<td style="padding: 12px; border-bottom: 1px solid var(--neutral-600);">{{ spacing.desktop }}</td>
							<td style="padding: 12px; border-bottom: 1px solid var(--neutral-600);">
								<div :style="{ width: spacing.desktop, height: '12px', borderRadius: '4px', background: 'var(--primary)' }" />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		`,
	}),
}
