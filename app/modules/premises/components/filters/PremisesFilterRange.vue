<script setup lang="ts">
import RangeSlider from '#layers/ui/app/common/components/RangeSlider/RangeSlider.vue'

export interface PremisesFilterRangeProps {
	label: string
	additionalText: string
	range: {
		min: number
		max: number
		step?: number
	}
	disabled?: boolean
}

defineProps<PremisesFilterRangeProps>()

const model = defineModel<number[]>({ required: true })
</script>

<template>
	<div class="premises-filter-range-field">
		<RangeSlider
			v-model="model"
			:label="label"
			:additional-text="additionalText"
			variant="block"
			state="touched"
			:min="range.min"
			:max="range.max"
			:step="range.step"
			:disabled="disabled"
		/>
	</div>
</template>

<style scoped lang="scss">
.premises-filter-range-field {
	min-width: 0;

	:deep(.ui-range-slider) {
		width: 100%;
		min-width: 0;
	}

	:deep(.ui-range-slider-values--block) {
		border: 1px solid var(--grey);
		background-color: color-mix(in srgb, var(--grey) 20%, var(--background));
	}
}
</style>
