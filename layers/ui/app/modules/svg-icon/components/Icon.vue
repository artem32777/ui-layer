<script setup lang="ts">
import { computed } from 'vue'
import { svgIconData, type IconName } from '../runtime/iconNames'

export interface SvgIconProps {
	/** Имя иконки из типизированного реестра `IconName`. */
	name: IconName
	/** Ширина и высота иконки. Число преобразуется в пиксели, строка используется как CSS-значение. */
	size?: number | string
	/** Цвет иконки. По умолчанию наследуется через `currentColor`. */
	color?: string
}

const {
	name,
	size = '14',
} = defineProps<SvgIconProps>()

const icon = computed(() => svgIconData[name])
const iconSize = computed(() => `${size}px`)

const iconAttrs = computed(() => ({
	...icon.value.attrs,
	width: iconSize.value,
	height: iconSize.value,
}))
</script>

<template>
	<svg
		v-bind="iconAttrs"
		:style="{ color }"
		class="svg-icon"
		v-html="icon.body"
	/>
</template>

<style scoped lang="scss">
.svg-icon {
	display: inline-block;
	flex: 0 0 auto;
	color: currentColor;
	line-height: 1;
	vertical-align: middle;

	:deep([fill]:not([fill="none"])) {
		fill: currentColor;
	}

	:deep([stroke]:not([stroke="none"])) {
		stroke: currentColor;
	}
}
</style>
