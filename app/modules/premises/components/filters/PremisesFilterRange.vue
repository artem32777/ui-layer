<script setup lang="ts">
import Slider from '#layers/ui/app/common/components/Slider/Slider.vue'
import FormFieldLabel from '#layers/ui/app/modules/form/components/FormFieldLabel.vue'

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
		<FormFieldLabel :label="label">
			<Slider
				v-model="model"
				:additional-text="additionalText"
				size="big"
				:min="range.min"
				:max="range.max"
				:step="range.step"
				:disabled="disabled"
			/>
		</FormFieldLabel>
	</div>
</template>

<style scoped lang="scss">
.premises-filter-range-field {
	min-width: 0;

	:deep(.slider) {
		width: 100%;
		min-width: 0;
	}
}
</style>
