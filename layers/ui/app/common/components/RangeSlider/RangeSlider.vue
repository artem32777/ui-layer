<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import RangeSliderValues from './RangeSliderValues.vue'

interface Props {
	label?: string
	additionalText?: string
	variant?: 'line' | 'block'
	state?: 'default' | 'touched'
	type?: 'double' | 'one-range'
	min?: number
	max?: number
	step?: number
	disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	label: 'Label',
	additionalText: '%',
	variant: 'line',
	state: 'default',
	type: 'double',
	min: 0,
	max: 100,
	step: 1,
	disabled: false,
})

const modelValue = defineModel<number[]>({ required: true })
</script>

<template>
	<div
		class="ui-range-slider"
		:class="{
			'ui-range-slider--block': variant === 'block',
			'ui-range-slider--one-range': type === 'one-range',
		}"
	>
		<span class="ui-range-slider__label">
			{{ label }}
		</span>
		<RangeSliderValues
			:values="modelValue"
			:additional-text="props.additionalText"
			:variant="props.variant"
			:state="props.state"
			:type="props.type"
		/>
		<SliderRoot
			v-model="modelValue"
			class="ui-range-slider__control"
			:min="props.min"
			:max="props.max"
			:step="props.step"
			:disabled="props.disabled"
		>
			<SliderTrack class="ui-range-slider__track">
				<SliderRange class="ui-range-slider__range" />
			</SliderTrack>
			<SliderThumb
				v-for="(_, index) in modelValue"
				:key="index"
				class="ui-range-slider__thumb"
				:aria-label="type === 'double' ? `${label}: ${index === 0 ? 'от' : 'до'}` : label"
			/>
		</SliderRoot>
	</div>
</template>

<style scoped lang="scss">
.ui-range-slider {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 320px;
	color: var(--text, #000000);
}

.ui-range-slider__label {
	margin-bottom: 4px;
	font-size: 14px;
	line-height: 1.5;
	opacity: 0.7;
}

.ui-range-slider__control {
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
	height: 16px;
	touch-action: none;
	user-select: none;

	&[data-disabled] {
		opacity: 0.5;
	}
}

.ui-range-slider__track {
	position: relative;
	flex-grow: 1;
	height: 1px;
	background-color: color-mix(in srgb, var(--grey, #e2e2e2) 50%, transparent);
}

.ui-range-slider__range {
	position: absolute;
	height: 2px;
	background-color: var(--brand, #4149f2);
	transform: translateY(-0.5px);
}

.ui-range-slider__thumb {
	display: block;
	box-sizing: border-box;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background-color: var(--brand, #4149f2);
	transition: box-shadow 0.3s ease;
	cursor: pointer;

	&:focus {
		outline: none;
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand, #4149f2) 30%, transparent);
	}
}

.ui-range-slider--one-range {
	.ui-range-slider__track {
		background-color: var(--brand, #4149f2);
	}

	.ui-range-slider__range {
		background-color: color-mix(in srgb, var(--grey, #e2e2e2) 50%, transparent);
	}
}

.ui-range-slider--block {
	gap: 8px;

	.ui-range-slider__label {
		margin-bottom: 0;
		opacity: 0.7;
	}

	.ui-range-slider__control {
		width: calc(100% - 36px);
		margin: -16px 18px 0;
	}
}
</style>
