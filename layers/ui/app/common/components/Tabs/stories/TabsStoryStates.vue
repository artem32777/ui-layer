<script setup lang="ts">
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import Tabs from '../Tabs.vue'
import { tabsSizes, tabsVariants, type TabsTitle } from '../Tabs.types.ts'
import { iconNames, type IconName } from '#layers/ui/app/modules/svg-icon'

withDefaults(defineProps<{
	indent?: boolean
	iconLeft?: IconName
	iconRight?: IconName
	icon?: IconName
}>(), {
	indent: false,
})

const items = [
	{ value: 'one', label: 'Вкладка' },
	{ value: 'two', label: 'Вкладка' },
	{ value: 'three', label: 'Вкладка' },
] satisfies TabsTitle[]

const iconItems = [
	{ value: 'one', label: 'Вкладка', icon: iconNames.circle },
	{ value: 'two', label: 'Вкладка', icon: iconNames.circle },
	{ value: 'three', label: 'Вкладка', icon: iconNames.circle },
] satisfies TabsTitle[]

const tabStates = [
	{ title: 'default', hovered: false },
	{ title: 'hover', hovered: true },
]
</script>

<template>
	<StoryGrid>
		<StoryGridSection
			v-for="tabsVariant in tabsVariants"
			:key="tabsVariant"
			:title="tabsVariant"
		>
			<div class="tabs-story-states__grid">
				<span class="tabs-story-states__label" />
				<span
					v-for="state in tabStates"
					:key="state.title"
					class="tabs-story-states__label"
				>
					{{ state.title }}
				</span>

				<template
					v-for="size in (tabsVariant === 'button' ? tabsSizes.filter((s) => s !== 'small') : tabsSizes)"
					:key="size"
				>
					<span class="tabs-story-states__label">
						{{ size }}
					</span>
					<div
						v-for="state in tabStates"
						:key="`${size}-${state.title}`"
						class="tabs-story-states__cell"
						:class="{ 'tabs-story--hovered': state.hovered }"
					>
						<Tabs
							:items="items.map((item) => ({ ...item, iconLeft, iconRight, icon }))"
							:variant="tabsVariant"
							:size="size"
							:indent="indent"
							model-value="one"
						>
							<template #one>
								Контент первой вкладки
							</template>
							<template #two>
								Контент второй вкладки
							</template>
							<template #three>
								Контент третьей вкладки
							</template>
						</Tabs>
					</div>
				</template>

				<template v-if="tabsVariant === 'button'">
					<template
						v-for="size in tabsSizes.filter((s) => s !== 'small')"
						:key="`icon-${size}`"
					>
						<span class="tabs-story-states__label">
							icon {{ size }}
						</span>
						<div
							v-for="state in tabStates"
							:key="`icon-${size}-${state.title}`"
							class="tabs-story-states__cell"
							:class="{ 'tabs-story--hovered': state.hovered }"
						>
							<Tabs
								:items="iconItems.map((item) => ({ ...item, icon: icon ?? item.icon }))"
								variant="button"
								:size="size"
								:indent="indent"
								model-value="one"
							>
								<template #one>
									Контент первой вкладки
								</template>
								<template #two>
									Контент второй вкладки
								</template>
								<template #three>
									Контент третьей вкладки
								</template>
							</Tabs>
						</div>
					</template>
				</template>
			</div>
		</StoryGridSection>
	</StoryGrid>
</template>

<style scoped lang="scss">
.tabs-story-states__grid {
	display: grid;
	grid-template-columns: max-content minmax(0, 1fr) minmax(0, 1fr);
	column-gap: 32px;
	row-gap: 24px;
	align-items: start;
}

.tabs-story-states__label {
	font-size: 20px;
	color: var(--text-on-surface-dark);
}

.tabs-story-states__cell {
	min-width: 0;
}
</style>
