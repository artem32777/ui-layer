<script setup lang="ts">
import { sliderSizes, sliderVariants, type SliderProps } from '../Slider.types.ts'
import Slider from '../Slider.vue'
import SliderStoryForm from './SliderStoryForm.vue'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import type { FormFieldProps } from '#layers/ui/app/modules/form'

const props = defineProps<SliderProps & Omit<FormFieldProps, 'name'> & { modelValue: number[] }>()
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
						:model-value="variant === 'one-point' ? [modelValue[1] ?? modelValue[0] ?? 80] : modelValue"
						:variant="variant"
						:size="size"
						:percent="variant === 'one-point'"
					/>
				</StoryGridItem>
				<StoryGridItem
					title="hover"
					class="slider-story--hovered"
				>
					<Slider
						v-bind="props"
						:model-value="variant === 'one-point' ? [modelValue[1] ?? modelValue[0] ?? 80] : modelValue"
						:variant="variant"
						:size="size"
						:percent="variant === 'one-point'"
					/>
				</StoryGridItem>
				<StoryGridItem
					title="focus"
					class="slider-story--focused"
				>
					<Slider
						v-bind="props"
						:model-value="variant === 'one-point' ? [modelValue[1] ?? modelValue[0] ?? 80] : modelValue"
						:variant="variant"
						:size="size"
						:percent="variant === 'one-point'"
					/>
				</StoryGridItem>
				<StoryGridItem title="disabled">
					<Slider
						v-bind="props"
						:model-value="variant === 'one-point' ? [modelValue[1] ?? modelValue[0] ?? 80] : modelValue"
						:variant="variant"
						:size="size"
						:percent="variant === 'one-point'"
						disabled
					/>
				</StoryGridItem>
			</StoryGridRow>
		</StoryGridSection>

		<StoryGridSection title="FormSlider">
			<StoryGridRow>
				<StoryGridItem title="default">
					<SliderStoryForm
						v-bind="props"
						:label="label || 'Площадь'"
						:hint="hint"
					/>
				</StoryGridItem>
				<StoryGridItem title="invalid">
					<SliderStoryForm
						v-bind="props"
						:label="label || 'Площадь'"
						:hint="hint"
						show-error
					/>
				</StoryGridItem>
			</StoryGridRow>
		</StoryGridSection>
	</StoryGrid>
</template>
