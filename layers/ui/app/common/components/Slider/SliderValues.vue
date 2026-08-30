<script setup lang="ts">
import { computed } from 'vue'
import type { SliderVariant } from './Slider.types.ts'

const props = defineProps<{
	values: number[]
	additionalText: string
	variant: SliderVariant
	percent: boolean
	min: number
	max: number
}>()

const percentLabel = computed(() => {
	const span = props.max - props.min
	const value = props.values[0] ?? props.min

	return `${Math.round(span === 0 ? 0 : ((value - props.min) / span) * 100)}%`
})
</script>

<template>
	<div class="slider-values">
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
			<div class="slider-values__meta">
				<span
					v-if="additionalText"
					class="slider-values__unit"
				>
					{{ additionalText }}
				</span>
				<template v-if="percent">
					<span class="slider-values__bullet">
						•
					</span>
					<span class="slider-values__percent">
						{{ percentLabel }}
					</span>
				</template>
			</div>
		</template>
	</div>
</template>

<style scoped lang="scss">
.slider-values {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
	width: 100%;
	@include font-size(button);
}

.slider-values__field {
	display: inline-flex;
	align-items: center;
	gap: 4px;
}

.slider-values__field--end {
	justify-content: flex-end;
}

.slider-values__meta {
	display: inline-flex;
	align-items: center;
	gap: 4px;
}

.slider-values__value,
.slider-values__percent {
	color: var(--text-on-bg-secondary);
	font-weight: 600;
}

.slider-values__unit {
	color: var(--text-on-bg-disabled);
	font-weight: 400;
}

.slider-values__bullet {
	@include font-size(label);
	color: var(--text-on-bg-disabled);
}
</style>
