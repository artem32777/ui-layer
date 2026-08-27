<script setup lang="ts">
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import { chipTypes } from '../Chip.types.ts'
import Chip from '../Chip.vue'

withDefaults(defineProps<{
	text?: string
}>(), {
	text: 'Chip',
})
</script>

<template>
	<StoryGrid>
		<StoryGridSection
			v-for="type in chipTypes"
			:key="type"
			:title="type"
		>
			<StoryGridRow>
				<StoryGridItem title="static">
					<Chip
						:type="type"
						:text="text"
						:model-value="false"
					/>
				</StoryGridItem>
				<StoryGridItem title="hover">
					<Chip
						:type="type"
						:text="text"
						:model-value="false"
						class="chip-story--hovered"
					/>
				</StoryGridItem>
				<StoryGridItem title="selected">
					<Chip
						:type="type"
						:text="text"
						:model-value="true"
					/>
				</StoryGridItem>
				<StoryGridItem title="selected hover">
					<Chip
						:type="type"
						:text="text"
						:model-value="true"
						class="chip-story--hovered"
					/>
				</StoryGridItem>
				<StoryGridItem title="disabled">
					<Chip
						:type="type"
						:text="text"
						disabled
					/>
				</StoryGridItem>
			</StoryGridRow>
		</StoryGridSection>
	</StoryGrid>
</template>
