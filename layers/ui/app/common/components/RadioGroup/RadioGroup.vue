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
		:clasas="[theme]"
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
					:size="8"
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
	gap: 8px;

	&[data-disabled] {
		pointer-events: none;
		opacity: 0.8;
	}
}

.radio-group__item {
	display: flex;
	align-items: center;
	gap: 8px;
  @include font-size(button);
  color: var(--text-on-surface-dark);

	&:hover, &:focus-within {
		.radio-group__icon {
			background-color: var(--bg-controls-unchecked-hover);
			border-color: var(--border-primary);

			&[data-state='checked'] {
				background-color: var(--bg-controls-checked-hover);
			}
		}
	}

	&:has(.radio-group__icon[data-disabled]) {
		pointer-events: none;
    color: var(--text-on-surface-tertiary);
	}
}

.radio-group__icon {
  border-radius: var(--UI-radius-L);
	height: var(--ui-height-XXS);
  background-color: var(--bg-controls-unchecked);
  border: 1px solid transparent;
  aspect-ratio: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease;
	cursor: pointer;

	&[data-state='checked'] {
		background-color: var(--bg-controls-checked);
	}
}

.radio-group__indicator {
	display: flex;
	align-items: center;
	justify-content: center;
  background-color: var(--bg-controls-unchecked);
  border-radius: 2px;

	&::after {
		content: '';
		width: 6px;
		height: 6px;
	}
}
</style>
