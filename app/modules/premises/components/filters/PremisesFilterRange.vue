<script setup lang="ts">
import Slider from '#layers/ui/app/common/components/Slider/Slider.vue'

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
		<Slider
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

	:deep(.ui-slider) {
		width: 100%;
		min-width: 0;
	}

	:deep(.ui-slider-values--block) {
		border: 1px solid var(--grey);
		background-color: color-mix(in srgb, var(--grey) 20%, var(--background));
	}
}
</style>
