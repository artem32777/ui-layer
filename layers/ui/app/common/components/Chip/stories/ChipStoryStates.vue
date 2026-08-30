<script setup lang="ts">
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import { chipSizes, chipTypes } from '../Chip.types.ts'
import Chip from '../Chip.vue'

withDefaults(defineProps<{
	text?: string
}>(), {
	text: 'Chip',
})

const chipStates = [
	{ title: 'default', modelValue: false, hovered: false, disabled: false },
	{ title: 'hover', modelValue: false, hovered: true, disabled: false },
	{ title: 'selected', modelValue: true, hovered: false, disabled: false },
	{ title: 'selected hover', modelValue: true, hovered: true, disabled: false },
	{ title: 'disabled', modelValue: false, hovered: false, disabled: true },
]
</script>

<template>
	<StoryGrid>
		<StoryGridSection
			v-for="type in chipTypes"
			:key="type"
			:title="type"
		>
			<div class="chip-story-states__grid">
				<span class="chip-story-states__label" />
				<span
					v-for="state in chipStates"
					:key="state.title"
					class="chip-story-states__label"
				>
					{{ state.title }}
				</span>

				<template
					v-for="size in chipSizes"
					:key="size"
				>
					<span class="chip-story-states__label">
						{{ size }}
					</span>
					<div
						v-for="state in chipStates"
						:key="`${size}-${state.title}`"
						class="chip-story-states__cell"
					>
						<Chip
							:type="type"
							:size="size"
							:text="text"
							:model-value="state.modelValue"
							:disabled="state.disabled"
							:class="{ 'chip-story--hovered': state.hovered }"
						/>
					</div>
				</template>
			</div>
		</StoryGridSection>
	</StoryGrid>
</template>

<style scoped lang="scss">
.chip-story-states__grid {
	display: grid;
	grid-template-columns: max-content repeat(5, max-content);
	column-gap: 32px;
	row-gap: 24px;
	align-items: start;
}

.chip-story-states__label {
	font-size: 20px;
	color: var(--text-on-surface-dark);
}
</style>
