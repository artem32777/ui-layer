<script setup lang="ts">
import { ref } from 'vue'
import type { TypographyItem, TypographyProperty } from './typography.types'
import TypographyFontLoader from './TypographyFontLoader.vue'
import TypographyPreset from './TypographyPreset.vue'
import typographyScss from '#layers/ui/app/config/styles/shared/typography.scss?raw'

// Читаем названия брейкпоинтов прямо из SCSS, чтобы редактор не дублировал конфигурацию вручную.
const breakpointTokens = typographyScss.match(/\$breakpoints:\s*\(([^)]+)\)/)?.[1]?.split(',').map(token => token.trim()) ?? []

// Преобразуем карту $font-sizes в данные для формы: сначала идут размеры, затем weight, line-height и letter-spacing.
const initialTypographyItems = Array.from(typographyScss.match(/\$font-sizes:\s*\(([\s\S]*?)\n\);/)?.[1]?.matchAll(/^\s*([\w-]+):\s*\(([^)]+)\),?$/gm) ?? []).map((match) => {
	const values = match[2]!.split(',').map(value => Number(value.trim()))

	return {
		token: match[1]!,
		sizes: values.slice(0, breakpointTokens.length),
		weight: values[breakpointTokens.length]!,
		lineHeight: values[breakpointTokens.length + 1]!,
		letterSpacing: values[breakpointTokens.length + 2]!,
	}
})
// Рабочая копия изменяется формой, а initialTypographyItems остаётся источником исходных значений для сброса.
const typographyItems = ref(initialTypographyItems.map(item => ({ ...item, sizes: [...item.sizes] })))
const selectedToken = ref<string | null>(null)

// Индекс размера совпадает с порядком брейкпоинтов в $breakpoints.
function setSize(item: TypographyItem, index: number, event: Event) {
	item.sizes[index] = Number((event.target as HTMLInputElement).value)
	document.documentElement.style.setProperty(`--font-${item.token}-size-${index + 1}`, `${item.sizes[index]}px`)
}

// Остальные параметры пресета записываются в CSS-переменные, которые использует mixin font-size.
function setValue(item: TypographyItem, property: TypographyProperty, event: Event) {
	item[property] = Number((event.target as HTMLInputElement).value)
	document.documentElement.style.setProperty(`--font-${item.token}-${property === 'lineHeight' ? 'line-height' : property === 'letterSpacing' ? 'letter-spacing' : property}`, `${item[property]}${property === 'letterSpacing' ? 'px' : ''}`)
}

// Удаляем все runtime-переопределения и возвращаем значения формы к данным из typography.scss.
function resetAll() {
	typographyItems.value.forEach((item, itemIndex) => {
		item.sizes.forEach((_size, index) => document.documentElement.style.removeProperty(`--font-${item.token}-size-${index + 1}`))
		document.documentElement.style.removeProperty(`--font-${item.token}-weight`)
		document.documentElement.style.removeProperty(`--font-${item.token}-line-height`)
		document.documentElement.style.removeProperty(`--font-${item.token}-letter-spacing`)
		document.documentElement.style.removeProperty(`--font-${item.token}-family`)

		item.sizes = [...initialTypographyItems[itemIndex]!.sizes]
		item.weight = initialTypographyItems[itemIndex]!.weight
		item.lineHeight = initialTypographyItems[itemIndex]!.lineHeight
		item.letterSpacing = initialTypographyItems[itemIndex]!.letterSpacing
	})
	document.documentElement.style.removeProperty('--font-family')
	selectedToken.value = null
}
</script>

<template>
	<div class="typography-editor">
		<TypographyFontLoader
			:selected-token="selectedToken"
			:tokens="typographyItems.map(item => item.token)"
		/>

		<button
			type="button"
			class="typography-editor__reset"
			@click="resetAll"
		>
			Сбросить всё
		</button>

		<TypographyPreset
			v-for="item in typographyItems"
			:key="item.token"
			:item="item"
			:breakpoint-tokens="breakpointTokens"
			:opened="selectedToken === item.token"
			@toggle="selectedToken = selectedToken === item.token ? null : item.token"
			@set-size="setSize(item, $event.index, $event.event)"
			@set-value="setValue(item, $event.property, $event.event)"
		/>
	</div>
</template>

<style scoped lang="scss">
.typography-editor {
	display: grid;
	gap: 12px;
}

.typography-editor__reset {
	justify-self: end;
	padding: 8px 14px;
	border: 1px solid var(--grey);
	border-radius: 6px;
	color: var(--text);
	background: var(--background);
	cursor: pointer;

	&:hover {
		border-color: var(--brand);
	}
}
</style>
