<script setup lang="ts">
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import { inputVariants, type InputProps } from '../Input.types.ts'
import Input from '../Input.vue'
import InputStoryForm from './InputStoryForm.vue'
import { iconNames } from '#layers/ui/app/modules/svg-icon'
import type { FormFieldProps } from '#layers/ui/app/modules/form'

const props = defineProps<InputProps & Omit<FormFieldProps, 'name'> & {
	modelValue?: string
}>()
</script>

<template>
	<StoryGrid>
		<StoryGridSection
			v-for="variant in inputVariants"
			:key="variant"
			:title="variant"
		>
			<StoryGridRow>
				<StoryGridItem title="default">
					<Input
						v-bind="props"
						:variant="variant"
						aria-label="Поле ввода"
					/>
				</StoryGridItem>
				<StoryGridItem title="with icon">
					<Input
						v-bind="props"
						:variant="variant"
						:icon="iconNames['search-md']"
						aria-label="Поле ввода"
					/>
				</StoryGridItem>
				<StoryGridItem
					title="hover"
					class="input-story--hovered"
				>
					<Input
						v-bind="props"
						:variant="variant"
						aria-label="Поле ввода"
					/>
				</StoryGridItem>
				<StoryGridItem
					title="typed & focus"
					class="input-story--focused"
				>
					<Input
						v-bind="props"
						model-value="23232"
						:variant="variant"
						aria-label="Поле ввода"
					/>
				</StoryGridItem>
				<StoryGridItem title="disabled">
					<Input
						v-bind="props"
						:variant="variant"
						disabled
						aria-label="Поле ввода"
					/>
				</StoryGridItem>
			</StoryGridRow>
		</StoryGridSection>

		<StoryGridSection title="FormInput">
			<StoryGridRow>
				<StoryGridItem title="default">
					<InputStoryForm
						v-bind="props"
						:label="label || 'Email'"
						:hint="hint"
					/>
				</StoryGridItem>
				<StoryGridItem title="invalid">
					<InputStoryForm
						v-bind="props"
						:label="label || 'Email'"
						:hint="hint"
						show-error
					/>
				</StoryGridItem>
			</StoryGridRow>
		</StoryGridSection>
	</StoryGrid>
</template>
