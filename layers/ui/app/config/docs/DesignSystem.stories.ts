import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Checkbox from '../../common/components/Checkbox/Checkbox.vue'
import Input from '../../common/components/Input/Input.vue'

const meta = {
	title: 'Design System/Examples',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const TypographyScale: Story = {
	render: () => ({
		setup() {
			return {
				items: [
					{ token: 'h1', size: '32 / 32 / 56', weight: '400', line: '1.1', text: 'H1 заголовок страницы' },
					{ token: 'h2', size: '28 / 28 / 48', weight: '400', line: '1.1', text: 'H2 раздел страницы' },
					{ token: 'h3', size: '24 / 24 / 40', weight: '400', line: '1.2', text: 'H3 крупный блок' },
					{ token: 'h4', size: '22 / 22 / 32', weight: '400', line: '1.2', text: 'H4 карточка или секция' },
					{ token: 'lead', size: '18 / 18 / 22', weight: '400', line: '1.5', text: 'Lead текст для вводного описания' },
					{ token: 'p1-regular', size: '16 / 16 / 18', weight: '400', line: '1.5', text: 'Основной текст интерфейса' },
					{ token: 'p2-regular', size: '14 / 14 / 16', weight: '400', line: '1.5', text: 'Подписи, вспомогательный текст' },
					{ token: 'p3-regular', size: '12 / 12 / 14', weight: '400', line: '1.5', text: 'Микротекст, системные подписи' },
				],
			}
		},
		template: `
			<div style="display: grid; gap: 12px;">
				<div
					v-for="item in items"
					:key="item.token"
					style="display: grid; grid-template-columns: minmax(140px, 220px) 1fr; gap: 20px; align-items: center; padding: 16px; border: 1px solid var(--grey); border-radius: 8px; background: var(--background);"
				>
					<div style="display: grid; gap: 4px; color: var(--additional-2); font-size: 13px;">
						<strong style="color: var(--text);">{{ item.token }}</strong>
						<span>{{ item.size }}px</span>
						<span>weight {{ item.weight }} / line {{ item.line }}</span>
					</div>
					<div :style="{ color: 'var(--text)', fontSize: item.size.split(' / ')[2] + 'px', fontWeight: item.weight, lineHeight: item.line }">
						{{ item.text }}
					</div>
				</div>
			</div>
		`,
	}),
}

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
