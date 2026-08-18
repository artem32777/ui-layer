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
		class="ui-slider-values"
		:class="{ 'ui-slider-values--block': variant === 'block' }"
	>
		<div class="ui-slider-values__field">
			<span class="ui-slider-values__prefix">от</span>
			<strong
				class="ui-slider-values__value"
				:class="{ 'ui-slider-values__value--placeholder': state === 'default' }"
			>
				{{ state === 'default' ? 'Number' : values[0] }}
			</strong>
			<span
				v-if="state === 'touched' && variant === 'line'"
				class="ui-slider-values__delete"
			>
				×
			</span>
		</div>

		<div class="ui-slider-values__field ui-slider-values__field--to">
			<span class="ui-slider-values__prefix">до</span>
			<strong
				class="ui-slider-values__value"
				:class="{ 'ui-slider-values__value--placeholder': state === 'default' }"
			>
				{{ state === 'default' ? 'Number' : values[1] }}
			</strong>
			<span
				v-if="state === 'touched' && variant === 'line'"
				class="ui-slider-values__delete"
			>
				×
			</span>
		</div>
	</div>

	<div
		v-else
		class="ui-slider-values__single"
	>
		<strong
			class="ui-slider-values__single-number"
			:class="{ 'ui-slider-values__single-number--placeholder': state === 'default' }"
		>
			{{ state === 'default' ? 'Number' : values[0] }}
		</strong>
		<span class="ui-slider-values__additional-text">
			{{ additionalText }}
		</span>
	</div>
</template>

<style scoped lang="scss">
.ui-slider-values {
	display: flex;
	align-items: center;
	height: 48px;
	border-radius: 8px;
	overflow: hidden;
}

.ui-slider-values--block {
	height: 56px;
	padding: 0 18px;
	background-color: var(--background, #ffffff);
}

.ui-slider-values__field {
	display: flex;
	align-items: center;
	gap: 8px;
	width: 50%;
	height: 100%;
	font-size: 16px;
	line-height: 1.5;
}

.ui-slider-values__field--to {
	justify-content: flex-end;
}

.ui-slider-values__prefix {
	opacity: 0.7;
}

.ui-slider-values__value {
	font-weight: 600;
}

.ui-slider-values__value--placeholder {
	opacity: 0.6;
}

.ui-slider-values__delete {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 16px;
	height: 16px;
	font-size: 14px;
	font-weight: 400;
}

.ui-slider-values__single {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 56px;
}

.ui-slider-values__single-number {
	font-size: 22px;
	font-weight: 700;
	line-height: 1.5;
}

.ui-slider-values__single-number--placeholder {
	opacity: 0.6;
}

.ui-slider-values__additional-text {
	font-size: 16px;
	line-height: 1.5;
	opacity: 0.7;
}
</style>
