<script setup lang="ts">
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from 'reka-ui'
import type { RadioGroupProps } from './RadioGroup.types'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'

defineProps<RadioGroupProps>()

const modelValue = defineModel<string>()
</script>

<template>
	<RadioGroupRoot
		v-model="modelValue"
		class="radio-group"
		:aria-invalid="invalid"
		:disabled="disabled"
	>
		<label
			v-for="option in options"
			:key="option.value"
			class="radio-group__item"
		>
			<RadioGroupItem
				class="radio-group__icon"
				:value="option.value"
				:disabled="option.disabled"
			>
				<Icon
					v-if="option.disabled"
					:name="iconNames.disabled"
					:size="14"
					class="radio-group__disabled-icon"
				/>
				<RadioGroupIndicator
					v-else
					class="radio-group__indicator"
				/>
			</RadioGroupItem>

			{{ option.label }}
		</label>
	</RadioGroupRoot>
</template>

<style scoped lang="scss">
.radio-group {
	display: inline-flex;
	flex-direction: column;
	gap: 10px;

	&[aria-invalid='true'] {
		.radio-group__icon {
			border-color: var(--accent);
		}
	}

	&[data-disabled] {
		pointer-events: none;
		opacity: 0.5;
	}
}

.radio-group__item {
	display: flex;
	align-items: center;
	gap: 8px;
  color: var(--neutral-950);
  @include font-size(button);

	&:hover,
	&:focus-within {
		.radio-group__icon {
			background-color: transparent;
			border-color: var(--primary-light);

			&[data-state='checked'] {
				background-color: var(--primary-light);
			}
		}
	}

	&:has(.radio-group__icon[data-disabled]) {
		pointer-events: none;
    color: var(--neutral-700);
	}
}

.radio-group__icon {
	width: 20px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	background-color: var(--neutral-500);
	border: 1px solid transparent;
	transition: background-color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease;
	cursor: pointer;

	&[data-state='checked'] {
		background-color: var(--primary);
	}
}

.radio-group__indicator {
	display: flex;
	align-items: center;
	justify-content: center;

	&::after {
		content: '';
		width: 6px;
		height: 6px;
		border-radius: 2px;
		background-color: var(--white);
	}
}
</style>
