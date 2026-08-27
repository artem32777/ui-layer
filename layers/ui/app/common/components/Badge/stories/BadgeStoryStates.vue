<script setup lang="ts">
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import { badgeSizes, badgeTypes, badgeVariants } from '../Badge.types.ts'
import Badge from '../Badge.vue'

withDefaults(defineProps<{
	text?: string
}>(), {
	text: 'Label',
})
</script>

<template>
	<StoryGrid>
		<StoryGridSection
			v-for="variant in badgeVariants"
			:key="variant"
			:title="variant"
		>
			<StoryGridRow
				v-for="size in badgeSizes"
				:key="size"
			>
				<StoryGridItem
					v-for="type in badgeTypes"
					:key="type"
					:title="`${size} / ${type}`"
				>
					<Badge
						:variant="variant"
						:size="size"
						:type="type"
						:text="type === 'circle' ? '3' : text"
					/>
				</StoryGridItem>
			</StoryGridRow>
		</StoryGridSection>
	</StoryGrid>
</template>
