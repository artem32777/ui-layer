<script setup lang="ts">
import { sliderSizes, sliderVariants, type SliderProps } from '../Slider.types.ts'
import Slider from '../Slider.vue'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'

const props = defineProps<SliderProps & { modelValue: number[] }>()
</script>

<template>
	<StoryGrid>
		<StoryGridSection
			v-for="variant in sliderVariants"
			:key="variant"
			:title="variant"
		>
			<StoryGridRow
				v-for="size in sliderSizes"
				:key="size"
			>
				<StoryGridItem :title="size">
					<Slider
						v-bind="props"
						:model-value="variant === 'one-point' ? [modelValue[0] ?? 40] : modelValue"
						:variant="variant"
						:size="size"
					/>
				</StoryGridItem>
				<StoryGridItem
					title="focus"
					class="slider-story--focused"
				>
					<Slider
						v-bind="props"
						:model-value="variant === 'one-point' ? [modelValue[0] ?? 40] : modelValue"
						:variant="variant"
						:size="size"
					/>
				</StoryGridItem>
				<StoryGridItem title="disabled">
					<Slider
						v-bind="props"
						:model-value="variant === 'one-point' ? [modelValue[0] ?? 40] : modelValue"
						:variant="variant"
						:size="size"
						disabled
					/>
				</StoryGridItem>
			</StoryGridRow>
		</StoryGridSection>
	</StoryGrid>
</template>
