<script setup lang="ts">
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import { textareaVariants, type TextareaProps } from '../Textarea.types.ts'
import Textarea from '../Textarea.vue'
import TextareaStoryForm from './TextareaStoryForm.vue'

const props = defineProps<TextareaProps & {
	modelValue?: string
	label?: string
}>()
</script>

<template>
	<StoryGrid>
		<StoryGridSection
			v-for="variant in textareaVariants"
			:key="variant"
			:title="variant"
		>
			<StoryGridRow>
				<StoryGridItem title="default">
					<Textarea
						v-bind="props"
						:variant="variant"
						aria-label="Текстовое поле"
					/>
				</StoryGridItem>
				<StoryGridItem
					title="hover"
					class="textarea-story--hovered"
				>
					<Textarea
						v-bind="props"
						:variant="variant"
						aria-label="Текстовое поле"
					/>
				</StoryGridItem>
				<StoryGridItem title="filled">
					<Textarea
						v-bind="props"
						:variant="variant"
						model-value="Текст"
						aria-label="Текстовое поле"
					/>
				</StoryGridItem>
				<StoryGridItem
					title="filled + focus"
					class="textarea-story--focused"
				>
					<Textarea
						v-bind="props"
						:variant="variant"
						model-value="Текст"
						aria-label="Текстовое поле"
					/>
				</StoryGridItem>
				<StoryGridItem title="disabled">
					<Textarea
						v-bind="props"
						:variant="variant"
						disabled
						aria-label="Текстовое поле"
					/>
				</StoryGridItem>
				<StoryGridItem title="invalid">
					<Textarea
						v-bind="props"
						:variant="variant"
						invalid
						aria-label="Текстовое поле"
					/>
				</StoryGridItem>
			</StoryGridRow>
		</StoryGridSection>

		<StoryGridSection title="FormTextarea">
			<StoryGridRow>
				<StoryGridItem title="default">
					<TextareaStoryForm
						v-bind="props"
						:label="label || 'Сообщение'"
					/>
				</StoryGridItem>
				<StoryGridItem title="invalid">
					<TextareaStoryForm
						v-bind="props"
						:label="label || 'Сообщение'"
						show-error
					/>
				</StoryGridItem>
			</StoryGridRow>
		</StoryGridSection>
	</StoryGrid>
</template>
