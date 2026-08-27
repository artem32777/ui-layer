<script setup lang="ts">
import type { SliderVariant } from './Slider.types.ts'

interface Props {
	values: number[]
	additionalText: string
	variant: SliderVariant
}

defineProps<Props>()
</script>

<template>
	<div
		class="slider-values"
		:class="{ 'slider-values--one-point': variant === 'one-point' }"
	>
		<template v-if="variant === 'two-points'">
			<div class="slider-values__field">
				<strong class="slider-values__value">
					{{ values[0] }}
				</strong>
				<span
					v-if="additionalText"
					class="slider-values__unit"
				>
					{{ additionalText }}
				</span>
			</div>

			<div class="slider-values__field slider-values__field--end">
				<strong class="slider-values__value">
					{{ values[1] }}
				</strong>
				<span
					v-if="additionalText"
					class="slider-values__unit"
				>
					{{ additionalText }}
				</span>
			</div>
		</template>

		<template v-else>
			<strong class="slider-values__value">
				{{ values[0] }}
			</strong>
			<span
				v-if="additionalText"
				class="slider-values__unit"
			>
				{{ additionalText }}
			</span>
		</template>
	</div>
</template>

<style scoped lang="scss">
.slider-values {
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	gap: 8px;
	@include font-size(button);
}

.slider-values--one-point {
	.slider-values__unit {
		margin-left: auto;
	}
}

.slider-values__field {
	display: inline-flex;
	align-items: baseline;
	gap: 4px;
}

.slider-values__field--end {
	justify-content: flex-end;
}

.slider-values__value {
	font-weight: 600;
}

.slider-values__unit {
	color: var(--text-on-surface-tertiary);
	font-weight: 400;
}
</style>
