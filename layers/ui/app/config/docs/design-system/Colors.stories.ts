import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import colorsScss from '#layers/ui/app/config/styles/colors.scss?raw'

const meta = {
	title: 'Design System/Examples',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Colors: Story = {
	render: () => ({
		setup() {
			const styles = getComputedStyle(document.documentElement)
			const colors = ref(Array.from(colorsScss.match(/:root\s*{([^}]*)}/s)?.[1]?.matchAll(/(--[\w-]+)\s*:/g) ?? [])
				.map((match) => {
					const value = styles.getPropertyValue(match[1]!).trim()

					return { name: match[1]!, value, initialValue: value }
				})
				.filter(color => CSS.supports('color', color.value)))

			return {
				colors,
				setColor(name: string, event: Event) {
					const value = (event.target as HTMLInputElement).value

					document.documentElement.style.setProperty(name, value)
					const color = colors.value.find(color => color.name === name)

					if (color) color.value = value
				},
				resetColors() {
					colors.value.forEach((color) => {
						document.documentElement.style.setProperty(color.name, color.initialValue)
						color.value = color.initialValue
					})
				},
			}
		},
		template: `
			<div style="display: grid; gap: 16px;">
				<button
						style="justify-self: start; border: 1px solid black; padding: 5px;  border-radius: 4px"
						@click="resetColors"
				>
					Сбросить
				</button>
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
							style="width: 100%; height: 88px; cursor: pointer;"
							@input="setColor(color.name, $event)"
						>
						<div style="display: grid; gap: 6px; padding: 6px;">
							<strong>{{ color.name }}</strong>
							<span>{{ color.value }}</span>
						</div>
					</div>
				</div>
			</div>
		`,
	}),
}
