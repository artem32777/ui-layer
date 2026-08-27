<script setup lang="ts">
import { computed } from 'vue'
import { SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import type { MultiSliderProps } from './Slider.types.ts'

// https://reka-ui.com/docs/components/slider

const props = withDefaults(defineProps<MultiSliderProps>(), {
	min: 0,
	max: 100,
	step: 1,
	disabled: false,
})

const modelValue = defineModel<number[]>({ required: true })

const ranges = computed(() => Array.from(
	{ length: Math.floor(modelValue.value.length / 2) },
	(_, index) => {
		const start = modelValue.value[index * 2]!
		const end = modelValue.value[index * 2 + 1]!

		return {
			left: ((start - props.min) / (props.max - props.min)) * 100,
			width: ((end - start) / (props.max - props.min)) * 100,
		}
	},
))
</script>

<template>
	<SliderRoot
		v-model="modelValue"
		class="multi-slider"
		:min="min"
		:max="max"
		:step="step"
		:disabled="disabled"
		:min-steps-between-thumbs="1"
	>
		<SliderTrack class="multi-slider__track">
			<span
				v-for="(range, index) in ranges"
				:key="index"
				class="multi-slider__range"
				:style="{ left: `${range.left}%`, width: `${range.width}%` }"
			/>
		</SliderTrack>
		<SliderThumb
			v-for="(_, index) in modelValue"
			:key="index"
			class="multi-slider__thumb"
			:aria-label="`Ползунок ${index + 1}`"
		/>
	</SliderRoot>
</template>

<style scoped lang="scss">
.multi-slider {
	position: relative;
	display: flex;
	align-items: center;
	width: 200px;
	height: 20px;
	touch-action: none;
	user-select: none;

	&[data-disabled] {
		opacity: 0.5;
	}
}

.multi-slider__track {
	position: relative;
	flex-grow: 1;
	overflow: hidden;
	height: 8px;
	border-radius: 9999px;
	background-color: var(--neutral-500);
}

.multi-slider__range {
	position: absolute;
	height: 100%;
	border-radius: 9999px;
	background-color: var(--brand, #4149f2);
}

.multi-slider__thumb {
	display: block;
	box-sizing: border-box;
	width: 20px;
	height: 20px;
	border: 2px solid var(--brand, #4149f2);
	border-radius: 50%;
	background-color: var(--surface-block);
	transition: box-shadow 0.3s ease;
	cursor: pointer;

	&:focus {
		outline: none;
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand, #4149f2) 35%, transparent);
	}
}
</style>
