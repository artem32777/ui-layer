<script setup lang="ts">
interface Props {
	values: number[]
	additionalText: string
	variant: 'line' | 'block'
	state: 'default' | 'touched'
	type: 'double' | 'one-range'
}

defineProps<Props>()
</script>

<template>
	<div
		v-if="type === 'double'"
		class="ui-range-slider-values"
		:class="{ 'ui-range-slider-values--block': variant === 'block' }"
	>
		<div class="ui-range-slider-values__field">
			<span class="ui-range-slider-values__prefix">от</span>
			<strong
				class="ui-range-slider-values__value"
				:class="{ 'ui-range-slider-values__value--placeholder': state === 'default' }"
			>
				{{ state === 'default' ? 'Number' : values[0] }}
			</strong>
			<span
				v-if="state === 'touched' && variant === 'line'"
				class="ui-range-slider-values__delete"
			>
				×
			</span>
		</div>

		<div class="ui-range-slider-values__field ui-range-slider-values__field--to">
			<span class="ui-range-slider-values__prefix">до</span>
			<strong
				class="ui-range-slider-values__value"
				:class="{ 'ui-range-slider-values__value--placeholder': state === 'default' }"
			>
				{{ state === 'default' ? 'Number' : values[1] }}
			</strong>
			<span
				v-if="state === 'touched' && variant === 'line'"
				class="ui-range-slider-values__delete"
			>
				×
			</span>
		</div>
	</div>

	<div
		v-else
		class="ui-range-slider-values__single"
	>
		<strong
			class="ui-range-slider-values__single-number"
			:class="{ 'ui-range-slider-values__single-number--placeholder': state === 'default' }"
		>
			{{ state === 'default' ? 'Number' : values[0] }}
		</strong>
		<span class="ui-range-slider-values__additional-text">
			{{ additionalText }}
		</span>
	</div>
</template>

<style scoped lang="scss">
.ui-range-slider-values {
	display: flex;
	align-items: center;
	height: 48px;
	border-radius: 8px;
	overflow: hidden;
}

.ui-range-slider-values--block {
	height: 56px;
	padding: 0 18px;
	background-color: var(--background, #ffffff);
}

.ui-range-slider-values__field {
	display: flex;
	align-items: center;
	gap: 8px;
	width: 50%;
	height: 100%;
	font-size: 16px;
	line-height: 1.5;
}

.ui-range-slider-values__field--to {
	justify-content: flex-end;
}

.ui-range-slider-values__prefix {
	opacity: 0.7;
}

.ui-range-slider-values__value {
	font-weight: 600;
}

.ui-range-slider-values__value--placeholder {
	opacity: 0.4;
}

.ui-range-slider-values__delete {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 16px;
	height: 16px;
	font-size: 14px;
	font-weight: 400;
}

.ui-range-slider-values__single {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 56px;
}

.ui-range-slider-values__single-number {
	font-size: 22px;
	font-weight: 700;
	line-height: 1.5;
}

.ui-range-slider-values__single-number--placeholder {
	opacity: 0.4;
}

.ui-range-slider-values__additional-text {
	font-size: 16px;
	line-height: 1.5;
	opacity: 0.7;
}
</style>
