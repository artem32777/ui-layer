<script setup lang="ts">
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import { labelSizes, labelVariants } from '../Label.types.ts'
import Label from '../Label.vue'

withDefaults(defineProps<{
	text?: string
}>(), {
	text: 'Label',
})
</script>

<template>
	<StoryGrid>
		<StoryGridSection
			v-for="variant in labelVariants"
			:key="variant"
			:title="variant"
		>
			<StoryGridRow>
				<StoryGridItem
					v-for="size in labelSizes"
					:key="size"
					:title="size"
				>
					<Label
						:variant="variant"
						:size="size"
						:text="text"
					/>
				</StoryGridItem>
			</StoryGridRow>
		</StoryGridSection>
	</StoryGrid>
</template>
