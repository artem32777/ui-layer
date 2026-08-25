<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useThemeStore } from '#layers/ui/app/common/stores/themeStore'
import colorsScss from '#layers/ui/app/config/styles/colors.scss?raw'

const { theme } = storeToRefs(useThemeStore())
const tokenNames = Array.from(colorsScss.matchAll(/:root\s*{([^}]*)}/gs)).flatMap(block => Array.from(block[1]!.matchAll(/(--[\w-]+)\s*:/g), match => match[1]!))

const colors = ref<{ name: string, value: string }[]>([])
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

			return { name, value }
		})
		.filter(color => CSS.supports('color', color.value))
}

readColors()
watch([theme], readColors)

function setColor(name: string, event: Event) {
	const value = (event.target as HTMLInputElement).value

	document.documentElement.style.setProperty(name, value)
	const color = colors.value.find(color => color.name === name)

	if (color) color.value = value
}

function resetColors() {
	colors.value.forEach((color) => {
		document.documentElement.style.removeProperty(color.name)
	})
	readColors()
}
</script>

<template>
	<div class="colors">
		<button
			class="colors__reset"
			@click="resetColors"
		>
			Сбросить
		</button>
		<div class="colors__groups">
			<div
				v-for="group in colorGroups"
				:key="group.name"
				class="colors__group"
			>
				<strong class="colors__group-title">{{ group.name.slice(2) }}</strong>
				<div class="colors__list">
					<div
						v-for="color in group.colors"
						:key="color.name"
						class="colors__item"
					>
						<div
							class="colors__swatch"
							:style="{ background: color.value }"
						>
							<input
								type="color"
								class="colors__picker"
								:value="color.value"
								@input="setColor(color.name, $event)"
							>
						</div>
						<div class="colors__meta">
							<strong class="colors__name">{{ color.name.slice(2) }}</strong>
							<span class="colors__value">{{ color.value }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.colors {
	display: grid;
	gap: 12px;
}

.colors__reset {
	justify-self: start;
	border: 1px solid black;
	padding: 5px;
	border-radius: 4px;
}

.colors__groups {
	display: grid;
	gap: 20px;
}

.colors__group {
	display: grid;
	gap: 12px;
}

.colors__group-title {
  font-size: 20px;
	padding-bottom: 6px;
	border-bottom: 1px solid var(--neutral-600);
}

.colors__list {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 12px;
}

.colors__item {
	display: flex;
	align-items: center;
	gap: 8px;
}

.colors__swatch {
	position: relative;
	width: 75px;
	height: 75px;
	flex-shrink: 0;
	overflow: hidden;
	border: 1px solid var(--neutral-600);
	border-radius: 4px;
}

.colors__picker {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	padding: 0;
	border: none;
	opacity: 0;
	cursor: pointer;
}

.colors__meta {
	display: grid;
}

.colors__name {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.colors__value {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 6px;
	color: var(--neutral-800);
}
</style>
