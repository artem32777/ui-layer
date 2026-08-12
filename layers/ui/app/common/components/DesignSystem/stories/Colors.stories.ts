import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, fireEvent } from 'storybook/test'
import { ref } from 'vue'
import colorsScss from '~~/app/config/styles/colors.scss?raw'

const meta = {
	title: 'Design System/Examples',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const ColorPalette: Story = {
	render: () => ({
		setup() {
			const styles = getComputedStyle(document.documentElement)
			const roles: Record<string, string> = {
				'--brand': 'Главный акцент, primary-действия, выбранные элементы.',
				'--brand-dark': 'Hover, pressed, усиленный акцент.',
				'--brand-light': 'Фокус, подсветки, мягкие акцентные состояния.',
				'--headers': 'Заголовки и крупные смысловые акценты.',
				'--text': 'Основной текст интерфейса.',
				'--background': 'Фон поверхностей и страниц.',
				'--grey': 'Границы, разделители, вторичные фоны.',
				'--red': 'Ошибки, invalid-состояния, опасные действия.',
				'--additional-1': 'Дополнительный тёмный текст или фон.',
				'--additional-2': 'Вторичный текст и подписи.',
				'--white': 'Текст на тёмных/акцентных поверхностях.',
				'--black': 'Тени, color-mix и контрастные состояния.',
			}
			const colors = ref(Array.from(colorsScss.match(/:root\s*{([^}]*)}/s)?.[1]?.matchAll(/(--[\w-]+)\s*:/g) ?? [])
				.map(match => ({
					name: match[1]!,
					role: roles[match[1]!] ?? '',
					value: styles.getPropertyValue(match[1]!).trim(),
				}))
				.filter(color => CSS.supports('color', color.value)))

			return {
				colors,
				setColor(name: string, event: Event) {
					const value = (event.target as HTMLInputElement).value

					document.documentElement.style.setProperty(name, value)
					const color = colors.value.find(color => color.name === name)

					if (color) color.value = value
				},
			}
		},
		template: `
			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
				<div
					v-for="color in colors"
					:key="color.name"
					style="overflow: hidden; border: 1px solid var(--grey); border-radius: 8px; background: var(--background);"
				>
					<input
						type="color"
						:value="color.value"
						:aria-label="'Изменить ' + color.name"
						style="display: block; width: 100%; height: 88px; padding: 0; border: 0; cursor: pointer;"
						@input="setColor(color.name, $event)"
					>
					<div style="display: grid; gap: 6px; padding: 12px;">
						<strong style="color: var(--text); font-size: 14px;">{{ color.name }}</strong>
						<span style="color: var(--additional-2); font-size: 13px;">{{ color.value }}</span>
						<span style="color: var(--text); font-size: 13px; line-height: 1.45;">{{ color.role }}</span>
					</div>
				</div>
			</div>
		`,
	}),
	play: async ({ canvas }) => {
		const styles = getComputedStyle(document.documentElement)
		const colorNames = Array.from(colorsScss.match(/:root\s*{([^}]*)}/s)?.[1]?.matchAll(/(--[\w-]+)\s*:/g) ?? [])
			.map(match => match[1]!)
			.filter(name => CSS.supports('color', styles.getPropertyValue(name).trim()))

		await expect(canvas.getAllByText(/^--/).map(element => element.textContent)).toEqual(colorNames)
		await expect(canvas.getByText('--brand').nextElementSibling).toHaveTextContent(
			styles.getPropertyValue('--brand').trim(),
		)

		const brandInput = canvas.getByLabelText('Изменить --brand')
		const originalBrand = styles.getPropertyValue('--brand').trim()
		const originalInlineBrand = document.documentElement.style.getPropertyValue('--brand')

		await fireEvent.input(brandInput, { target: { value: '#123456' } })
		await expect(canvas.getByText('#123456')).toBeInTheDocument()
		await expect(getComputedStyle(document.documentElement).getPropertyValue('--brand').trim()).toBe('#123456')
		await fireEvent.input(brandInput, { target: { value: originalBrand } })

		if (originalInlineBrand) {
			document.documentElement.style.setProperty('--brand', originalInlineBrand)
		} else {
			document.documentElement.style.removeProperty('--brand')
		}
	},
}
