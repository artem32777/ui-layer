<script setup lang="ts" generic="T">
import { useResizeObserver } from '@vueuse/core'
import { computed, nextTick, ref } from 'vue'

export interface OverflowNavigationProps<T> {
	/** Пункты навигации в порядке отображения. */
	items: T[]
	/** HTML-тег корневого элемента. */
	tag?: 'div' | 'nav'
	/** Ширина элемента, открывающего скрытые пункты, в пикселях. */
	overflowWidth?: number
	/** Селектор вложенного списка, непосредственные дети которого измеряются. */
	listSelector?: string
}

const props = withDefaults(defineProps<OverflowNavigationProps<T>>(), {
	tag: 'nav',
	overflowWidth: 0,
})

defineSlots<{
	/** Содержимое навигации с рассчитанными видимыми и скрытыми пунктами. */
	default: (props: {
		visibleItems: T[]
		overflowItems: T[]
	}) => any
}>()

const rootRef = ref<HTMLElement | null>(null)
const measureListRef = ref<HTMLElement | null>(null)

const visibleCount = ref(props.items.length)
let resizeFrame = 0

const visibleItems = computed(() => props.items.slice(0, visibleCount.value))
const overflowItems = computed(() => props.items.slice(visibleCount.value))

function getItemWidths() {
	if (!rootRef.value || !measureListRef.value) {
		return []
	}

	const sourceList = props.listSelector
		? rootRef.value.querySelector<HTMLElement>(props.listSelector)
		: Array.from(rootRef.value.children)
			.find(child => child !== measureListRef.value) as HTMLElement | undefined

	if (!sourceList) {
		return []
	}

	const measureItems = Array.from(sourceList.children, (item) => {
		const measureItem = item.cloneNode(true) as HTMLElement

		measureItem.classList.add('ui-overflow-navigation__measure-item')
		return measureItem
	})

	measureListRef.value.replaceChildren(...measureItems)
	return measureItems.map(item => item.offsetWidth)
}

async function updateVisibleCount() {
	await nextTick()

	if (!rootRef.value || !measureListRef.value) {
		return
	}

	visibleCount.value = props.items.length
	await nextTick()

	const itemWidths = getItemWidths()
	const gap = Number.parseFloat(getComputedStyle(measureListRef.value).columnGap) || 0
	let totalWidth = 0
	let nextVisibleCount = itemWidths.length

	for (const [index, itemWidth] of itemWidths.entries()) {
		const nextWidth = totalWidth + itemWidth + (index ? gap : 0)
		const hasHiddenItems = index < itemWidths.length - 1
		const widthWithOverflow = nextWidth + (hasHiddenItems ? gap + props.overflowWidth : 0)

		if (widthWithOverflow > rootRef.value.clientWidth) {
			nextVisibleCount = Math.max(index, 1)
			break
		}

		totalWidth = nextWidth
	}

	visibleCount.value = nextVisibleCount
}

function scheduleUpdateVisibleCount() {
	cancelAnimationFrame(resizeFrame)
	resizeFrame = requestAnimationFrame(() => {
		void updateVisibleCount()
	})
}

useResizeObserver(rootRef, scheduleUpdateVisibleCount)
</script>

<template>
	<component
		:is="tag"
		ref="rootRef"
		class="ui-overflow-navigation"
	>
		<slot
			:visible-items="visibleItems"
			:overflow-items="overflowItems"
		/>

		<ul
			ref="measureListRef"
			class="ui-overflow-navigation__measure-list"
			aria-hidden="true"
		/>
	</component>
</template>

<style scoped lang="scss">
.ui-overflow-navigation {
	position: relative;
}

.ui-overflow-navigation__measure-list {
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	overflow: hidden;
	gap: inherit;
	width: 100%;
	margin: 0;
	padding: 0;
	list-style: none;
	visibility: hidden;
	pointer-events: none;
}

.ui-overflow-navigation__measure-list :deep(.ui-overflow-navigation__measure-item) {
	display: flex;
	flex: 0 0 auto;
	align-items: center;
}
</style>
