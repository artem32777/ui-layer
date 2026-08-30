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
	percent: false,
	disabled: false,
	invalid: false,
})

const modelValue = defineModel<number[]>({ required: true })
</script>

<template>
	<div
		class="slider"
		:class="[
			`slider--variant-${variant}`,
			`slider--size-${size}`,
			{
				'slider--disabled': disabled,
				'slider--invalid': invalid,
			},
		]"
		:aria-invalid="invalid || undefined"
	>
		<div class="slider__body">
			<SliderValues
				:values="modelValue"
				:additional-text="additionalText"
				:variant="variant"
				:percent="percent"
				:min="min"
				:max="max"
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
					:aria-label="variant === 'two-points' ? `Значение: ${index === 0 ? 'от' : 'до'}` : 'Значение'"
				/>
			</SliderRoot>
		</div>
	</div>
</template>

<style scoped lang="scss">
.slider {
	position: relative;
	width: 100%;
}

.slider__body {
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
	background-color: var(--bg-field-static);
	border: 1px solid transparent;
	transition: background-color 0.3s ease, border-color 0.3s ease;

	&:hover {
		background-color: var(--bg-field-hover);
	}
}

.slider__control {
	position: absolute;
	right: 0;
	left: 0;
	display: flex;
	align-items: center;
	touch-action: none;
	user-select: none;
}

.slider__track {
	position: relative;
	flex-grow: 1;
	height: 2px;
	background-color: transparent;
}

.slider__range {
	position: absolute;
	height: 2px;
	background-color: var(--bg-action-primary);
}

.slider__thumb {
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: visible;
	background-color: transparent;
	border: none;
	cursor: pointer;

	&::before {
		content: '';
		border-radius: 50%;
		background-color: var(--bg-action-primary);
		transition: background-color 0.3s ease, box-shadow 0.3s ease;
	}

	&:hover::before,
	&[data-state='active']::before {
		background-color: var(--icon-on-bg-primary);
	}

	&:focus {
		outline: none;
	}
}

.slider--size-medium {
	padding-bottom: 10px;

	.slider__body {
		height: var(--ui-height-M);
		padding: 0 16px;
		border-radius: var(--UI-radius-M);
	}

	.slider__control {
		bottom: -10px;
		height: 20px;
		padding: 0 14px;
	}

	.slider__thumb {
		width: 20px;
		height: 20px;

		&::before {
			width: 12px;
			height: 12px;
		}

		&:hover::before,
		&[data-state='active']::before {
			box-shadow: inset 0 0 0 3px var(--bg-action-primary);
		}
	}
}

.slider--size-big {
	padding-bottom: 13px;

	.slider__body {
		height: var(--ui-height-L);
		padding: 0 22px;
		border-radius: var(--UI-radius-L);
	}

	.slider__control {
		bottom: -13px;
		height: 26px;
		padding: 0 20px;
	}

	.slider__thumb {
		width: 26px;
		height: 26px;

		&::before {
			width: 18px;
			height: 18px;
		}

		&:hover::before,
		&[data-state='active']::before {
			box-shadow: inset 0 0 0 5px var(--bg-action-primary);
		}
	}
}

.slider:focus-within {
	.slider__body {
		background-color: var(--bg-field-expanded);
		border-color: var(--border-expanded);
	}
}

.slider--invalid {
	.slider__body {
		border-color: var(--border-error);
	}
}

.slider--disabled {
	pointer-events: none;

	.slider__body {
		background-color: var(--bg-action-disabled);

		&:hover {
			background-color: var(--bg-action-disabled);
		}
	}

	:deep(.slider-values__value),
	:deep(.slider-values__unit),
	:deep(.slider-values__percent),
	:deep(.slider-values__bullet) {
		color: var(--text-on-bg-disabled);
	}

	.slider__thumb::before {
		background-color: var(--icon-on-bg-primary);
		box-shadow: inset 0 0 0 2px var(--bg-action-primary);
	}
}
</style>
