<script setup lang="ts">
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import Tabs from '../Tabs.vue'
import { tabsVariants, type TabsProps } from '../Tabs.types.ts'

defineProps<TabsProps>()

const items = [
	{ value: 'one', label: 'Вкладка' },
	{ value: 'two', label: 'Вкладка' },
	{ value: 'three', label: 'Вкладка' },
] as const
</script>

<template>
	<StoryGrid>
		<StoryGridSection
			v-for="tabsVariant in tabsVariants"
			:key="tabsVariant"
			:title="tabsVariant"
		>
			<StoryGridRow>
				<StoryGridItem title="default">
					<Tabs
						:items="items"
						:variant="tabsVariant"
						:size="size"
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
				</StoryGridItem>
				<StoryGridItem
					title="hover"
					class="tabs-story--hovered"
				>
					<Tabs
						:items="items"
						:variant="tabsVariant"
						:size="size"
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
				</StoryGridItem>
			</StoryGridRow>
		</StoryGridSection>
	</StoryGrid>
</template>
