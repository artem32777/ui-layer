import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useThemeStore } from '#layers/ui/app/common/stores/themeStore'
import colorsScss from '#layers/ui/app/config/styles/colors/colors.scss?raw'

const meta = {
	title: 'Design System/Examples',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Colors: Story = {
	render: () => ({
		setup() {
			const { theme, isDark } = storeToRefs(useThemeStore())
			const tokenNames = Array.from(colorsScss.matchAll(/:root\s*{([^}]*)}/gs)).flatMap(block => Array.from(block[1]!.matchAll(/(--[\w-]+)\s*:/g), match => match[1]!))
			const colors = ref<{ name: string, value: string, initialValue: string }[]>([])
			const colorGroups = computed(() => colors.value.reduce<{ name: string, colors: typeof colors.value }[]>((groups, color) => {
				const groupName = color.name.match(/^--[a-z]+/)?.[0] ?? color.name
				const group = groups.find(group => group.name === groupName)

				if (group) group.colors.push(color)
				else groups.push({ name: groupName, colors: [color] })

				return groups
			}, []))

			const readColors = () => {
				const styles = getComputedStyle(document.documentElement)

				colors.value = tokenNames
					.map((name) => {
						const value = styles.getPropertyValue(name).trim()

						return { name, value, initialValue: value }
					})
					.filter(color => CSS.supports('color', color.value))
			}

			readColors()
			watch([theme, isDark], readColors)

			return {
				colorGroups,
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
			<div style="display: grid; gap: 12px;">
				<button
						style="justify-self: start; border: 1px solid black; padding: 5px;  border-radius: 4px"
						@click="resetColors"
				>
					Сбросить
				</button>
				<div style="display: grid; gap: 20px;">
					<div
						v-for="group in colorGroups"
						:key="group.name"
						style="display: grid; gap: 8px;"
					>
						<strong style="padding-bottom: 6px; border-bottom: 1px solid var(--neutral-600); font-size: 13px;">{{ group.name }}</strong>
						<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 6px 12px;">
							<div
								v-for="color in group.colors"
								:key="color.name"
								style="display: flex; align-items: center; gap: 8px; min-width: 0;"
							>
								<div
									:style="{ background: color.value }"
									style="position: relative; width: 28px; height: 28px; flex-shrink: 0; overflow: hidden; border: 1px solid var(--neutral-600); border-radius: 4px;"
								>
									<input
										type="color"
										:value="color.value"
										style="position: absolute; inset: 0; width: 100%; height: 100%; padding: 0; border: none; opacity: 0; cursor: pointer;"
										@input="setColor(color.name, $event)"
									>
								</div>
								<div style="display: grid; min-width: 0; line-height: 1.25;">
									<strong style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px;">{{ color.name }}</strong>
									<span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11px; color: var(--neutral-800);">{{ color.value }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`,
	}),
}
