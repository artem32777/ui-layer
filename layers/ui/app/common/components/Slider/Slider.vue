<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import type { SliderProps } from './Slider.types.ts'
import SliderValues from './SliderValues.vue'

// https://reka-ui.com/docs/components/slider

withDefaults(defineProps<SliderProps>(), {
	additionalText: 'm²',
	variant: 'two-points',
	size: 'medium',
	min: 0,
	max: 100,
	step: 1,
	disabled: false,
})

const modelValue = defineModel<number[]>({ required: true })
</script>

<template>
	<div
		class="slider"
		:class="[
			`slider--variant-${variant}`,
			`slider--size-${size}`,
			{ 'slider--disabled': disabled },
		]"
	>
		<span
			v-if="label"
			class="slider__label"
		>
			{{ label }}
		</span>

		<div class="slider__body">
			<SliderValues
				:values="modelValue"
				:additional-text="additionalText"
				:variant="variant"
			/>
			<SliderRoot
				v-model="modelValue"
				class="slider__control"
				:min="min"
				:max="max"
				:step="step"
				:disabled="disabled"
			>
				<SliderTrack class="slider__track">
					<SliderRange class="slider__range" />
				</SliderTrack>
				<SliderThumb
					v-for="(_, index) in modelValue"
					:key="index"
					class="slider__thumb"
					:aria-label="variant === 'two-points' ? `${label ?? 'Значение'}: ${index === 0 ? 'от' : 'до'}` : (label ?? 'Значение')"
				/>
			</SliderRoot>
		</div>
	</div>
</template>

<style scoped lang="scss">
.slider {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 320px;
	color: var(--text-on-surface-dark);
}

.slider__label {
	margin-bottom: 4px;
	@include font-size(label);
	color: var(--text-on-surface-tertiary);
}

.slider__body {
	position: relative;
	display: flex;
	flex-direction: column;
	border: 1px solid transparent;
	transition: background-color 0.3s ease, border-color 0.3s ease;
}

.slider__control {
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
	touch-action: none;
	user-select: none;
}

.slider__track {
	position: relative;
	flex-grow: 1;
	height: 1px;
	background-color: var(--border-neutral);
}

.slider__range {
	position: absolute;
	height: 1px;
	background-color: var(--graphics-dark);
}

.slider__thumb {
	display: block;
	box-sizing: border-box;
	width: 12px;
	height: 12px;
	border: 1px solid transparent;
	border-radius: 50%;
	background-color: var(--graphics-dark);
	transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
	cursor: pointer;

	&:focus {
		outline: none;
	}

	&:focus-visible {
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--graphics-dark) 20%, transparent);
	}
}

.slider--size-medium {
	.slider__body {
		gap: 8px;
		padding: 4px;
		border-radius: var(--UI-radius-M);

		&:hover {
			background-color: var(--bg-field-hover);
		}

		&:focus-within {
			border-color: var(--border-primary);
		}
	}

	.slider__control {
		height: 12px;
	}
}

.slider--size-big {
	.slider__body {
		gap: 4px;
		padding: 12px 16px 0;
		border-radius: var(--UI-radius-L);
		background-color: var(--bg-field-static);

		&:hover {
			background-color: var(--bg-field-hover);
		}

		&:focus-within {
			border-color: var(--border-primary);
			background-color: var(--bg-field-expanded);
		}
	}

	.slider__control {
		height: 16px;
		margin: 0 -4px;
	}

	.slider__track,
	.slider__range {
		height: 2px;
	}

	.slider__thumb {
		width: 14px;
		height: 14px;
	}
}

.slider--disabled {
	pointer-events: none;
	color: var(--text-on-bg-disabled);

	.slider__label {
		color: var(--text-on-bg-disabled);
	}

	.slider__body {
		opacity: 0.5;
	}

	.slider__thumb {
		background-color: var(--surface-block, var(--white-100));
		border-color: var(--border-disabled);
	}

	.slider__range {
		background-color: var(--border-disabled);
	}
}
</style>
