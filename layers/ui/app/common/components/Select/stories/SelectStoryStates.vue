<script setup lang="ts">
import { reactive } from 'vue'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import { selectVariants, type SelectProps } from '../Select.types.ts'
import Select from '../Select.vue'
import SelectStoryForm from './SelectStoryForm.vue'
import { iconNames } from '#layers/ui/app/modules/svg-icon'
import type { FormFieldProps } from '#layers/ui/app/modules/form'

const props = defineProps<SelectProps & Omit<FormFieldProps, 'name'> & {
	modelValue?: string | string[]
}>()

const models = reactive({
	selected: 'moscow',
	multipleSelected: ['moscow', 'kazan'],
})
</script>

<template>
	<StoryGrid>
		<StoryGridSection
			v-for="variant in selectVariants"
			:key="variant"
			:title="variant"
		>
			<StoryGridRow>
				<StoryGridItem title="default">
					<Select
						v-bind="props"
						:variant="variant"
					/>
				</StoryGridItem>
				<StoryGridItem title="with icon">
					<Select
						v-bind="props"
						:variant="variant"
						:icon="iconNames['building-01']"
					/>
				</StoryGridItem>
				<StoryGridItem
					title="hover"
					class="select-story--hovered"
				>
					<Select
						v-bind="props"
						:variant="variant"
					/>
				</StoryGridItem>
				<StoryGridItem
					title="focus"
					class="select-story--focused"
				>
					<Select
						v-bind="props"
						:variant="variant"
					/>
				</StoryGridItem>
				<StoryGridItem title="selected">
					<Select
						v-bind="props"
						v-model="models.selected"
						:variant="variant"
					/>
				</StoryGridItem>
				<StoryGridItem title="multiple selected">
					<Select
						v-bind="props"
						v-model="models.multipleSelected"
						:variant="variant"
						:multiple="true"
					/>
				</StoryGridItem>
				<StoryGridItem title="disabled">
					<Select
						v-bind="props"
						:variant="variant"
						disabled
					/>
				</StoryGridItem>
				<StoryGridItem title="invalid">
					<Select
						v-bind="props"
						:variant="variant"
						invalid
					/>
				</StoryGridItem>
			</StoryGridRow>
		</StoryGridSection>

		<StoryGridSection title="FormSelect">
			<StoryGridRow>
				<StoryGridItem title="default">
					<SelectStoryForm
						:label="label || 'Город'"
						:options="options"
						:placeholder="placeholder"
						:variant="variant"
						:size="size"
						:icon="icon"
						:hint="hint"
						:disabled="disabled"
						:multiple="false"
					/>
				</StoryGridItem>
				<StoryGridItem title="invalid">
					<SelectStoryForm
						:label="label || 'Город'"
						:options="options"
						:placeholder="placeholder"
						:variant="variant"
						:size="size"
						:icon="icon"
						:hint="hint"
						:disabled="disabled"
						:multiple="false"
						show-error
					/>
				</StoryGridItem>
			</StoryGridRow>
		</StoryGridSection>
	</StoryGrid>
</template>
