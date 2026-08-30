<script setup lang="ts">
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import type { RadioGroupProps } from '../RadioGroup.types.ts'
import RadioGroup from '../RadioGroup.vue'
import RadioGroupStoryForm from './RadioGroupStoryForm.vue'
import type { FormFieldProps } from '#layers/ui/app/modules/form'

const props = defineProps<RadioGroupProps & Omit<FormFieldProps, 'name'> & {
	modelValue?: string
}>()

const radioGroupChecked = ['', 'false']
</script>

<template>
	<StoryGrid>
		<StoryGridSection
			v-for="checked in radioGroupChecked"
			:key="checked || 'default'"
			:title="checked ? 'checked' : 'default'"
		>
			<StoryGridRow>
				<StoryGridItem title="default">
					<RadioGroup
						v-bind="props"
						:model-value="checked"
					/>
				</StoryGridItem>
				<StoryGridItem title="hover">
					<RadioGroup
						v-bind="props"
						:model-value="checked"
						class="radio-group-story--hovered"
					/>
				</StoryGridItem>
				<StoryGridItem title="disabled">
					<RadioGroup
						v-bind="props"
						:model-value="checked"
						disabled
					/>
				</StoryGridItem>
			</StoryGridRow>
		</StoryGridSection>

		<StoryGridSection title="FormRadioGroup">
			<StoryGridRow>
				<StoryGridItem title="default">
					<RadioGroupStoryForm
						v-bind="props"
						:label="label || 'Способ получения'"
						:hint="hint"
					/>
				</StoryGridItem>
				<StoryGridItem title="invalid">
					<RadioGroupStoryForm
						v-bind="props"
						:label="label || 'Способ получения'"
						:hint="hint"
						show-error
					/>
				</StoryGridItem>
			</StoryGridRow>
		</StoryGridSection>
	</StoryGrid>
</template>
