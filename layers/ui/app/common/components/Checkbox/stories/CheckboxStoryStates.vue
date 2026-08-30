<script setup lang="ts">
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import type { CheckboxProps } from '../Checkbox.types.ts'
import Checkbox from '../Checkbox.vue'
import CheckboxStoryForm from './CheckboxStoryForm.vue'
import type { FormFieldProps } from '#layers/ui/app/modules/form'

const props = defineProps<CheckboxProps & Omit<FormFieldProps, 'name'> & {
	modelValue?: boolean
}>()

const checkboxChecked = [false, true]
</script>

<template>
	<StoryGrid>
		<StoryGridSection
			v-for="checked in checkboxChecked"
			:key="String(checked)"
			:title="checked ? 'checked' : 'default'"
		>
			<StoryGridRow>
				<StoryGridItem title="default">
					<Checkbox
						v-bind="props"
						:model-value="checked"
					>
						Checkbox
					</Checkbox>
				</StoryGridItem>
				<StoryGridItem title="hover">
					<Checkbox
						v-bind="props"
						:model-value="checked"
						class="checkbox-story--hovered"
					>
						Checkbox
					</Checkbox>
				</StoryGridItem>
				<StoryGridItem title="disabled">
					<Checkbox
						v-bind="props"
						:model-value="checked"
						disabled
					>
						Checkbox
					</Checkbox>
				</StoryGridItem>
			</StoryGridRow>
		</StoryGridSection>

		<StoryGridSection title="FormCheckbox">
			<StoryGridRow>
				<StoryGridItem title="default">
					<CheckboxStoryForm
						v-bind="props"
						:label="label || 'Согласие'"
						:hint="hint"
					/>
				</StoryGridItem>
				<StoryGridItem title="invalid">
					<CheckboxStoryForm
						v-bind="props"
						:label="label || 'Согласие'"
						:hint="hint"
						show-error
					/>
				</StoryGridItem>
			</StoryGridRow>
		</StoryGridSection>
	</StoryGrid>
</template>
