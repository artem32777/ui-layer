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

const { name, size, color } = defineProps<SvgIconProps>()

const iconSize = computed(() => {
	if (typeof size === 'number') {
		return `${size}px`
	}

	return size
})

const icon = computed(() => svgIconData[name])

const iconAttrs = computed(() => ({
	...icon.value.attrs,
	width: iconSize.value || icon.value.attrs.width,
	height: iconSize.value || icon.value.attrs.height,
}))
</script>

<template>
	<svg
		v-bind="iconAttrs"
		class="svg-icon"
		:style="{ color }"
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
