<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import radiusScss from '#layers/ui/app/config/styles/radius.scss?raw'

const props = withDefaults(defineProps<{
	activeClass?: string
}>(), {
	activeClass: 'radius-3',
})

const radiusClassNames = Array.from(radiusScss.matchAll(/^\.([\w-]+)\s*\{/gm), match => match[1]!)
const tokenNames = [...new Set(Array.from(radiusScss.matchAll(/(--[\w-]+)\s*:/g), match => match[1]!))]
const radii = ref<{ name: string, value: string }[]>([])
const currentClass = ref(props.activeClass)

const readRadii = () => {
	const styles = getComputedStyle(document.documentElement)

	radii.value = tokenNames.map(name => ({
		name,
		value: styles.getPropertyValue(name).trim(),
	}))
}

const applyRadiusClass = (className: string) => {
	radiusClassNames.forEach(name => document.documentElement.classList.toggle(name, name === className))
}

const selectRadius = (className: string) => {
	currentClass.value = className
	applyRadiusClass(className)
	readRadii()
}

watch(() => props.activeClass, async (className) => {
	currentClass.value = className
	applyRadiusClass(className)
	await nextTick()
	readRadii()
}, { immediate: true })
</script>

<template>
	<div class="radius">
		<div
			class="radius__switcher"
			role="group"
			aria-label="Вариант скругления"
		>
			<button
				v-for="className in radiusClassNames"
				:key="className"
				class="radius__switcher-button"
				:class="{ 'radius__switcher-button--active': currentClass === className }"
				type="button"
				:aria-pressed="currentClass === className"
				@click="selectRadius(className)"
			>
				{{ className }}
			</button>
		</div>
		<div class="radius__list">
			<div
				v-for="item in radii"
				:key="item.name"
				class="radius__item"
			>
				<div
					class="radius__swatch"
					:style="{ borderRadius: `var(${item.name})` }"
				/>
				<div class="radius__meta">
					<strong class="radius__name">{{ item.name.slice(2) }}</strong>
					<span class="radius__value">{{ item.value }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.radius {
	display: grid;
	gap: 16px;
}

.radius__switcher {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}

.radius__switcher-button {
	padding: 8px 14px;
	border: 1px solid var(--border-neutral);
	border-radius: 6px;
	color: var(--text-on-surface-dark);
	background: var(--white-100);
	cursor: pointer;

	&:hover {
		background: var(--bg-action-item-hover);
	}

	&:focus-visible {
		outline: 2px solid var(--border-primary);
		outline-offset: 2px;
	}
}

.radius__switcher-button--active {
	color: var(--text-on-bg-primary);
	border-color: var(--bg-action-primary);
	background: var(--bg-action-primary);

	&:hover {
		border-color: var(--bg-action-primary-hover);
		background: var(--bg-action-primary-hover);
	}
}

.radius__list {
	display: grid;
	gap: 12px;
}

.radius__item {
	display: flex;
	align-items: center;
	gap: 16px;
}

.radius__swatch {
	width: 140px;
	height: 80px;
	flex-shrink: 0;
	border: 1px solid ;
	background: var(--primary);
}

.radius__meta {
	display: grid;
}

.radius__name {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.radius__value {
	color: var(--neutral-800);
}
</style>
