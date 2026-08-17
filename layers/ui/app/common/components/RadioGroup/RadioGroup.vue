<script setup lang="ts">
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from 'reka-ui'
import type { RadioGroupProps } from './RadioGroup.types'

const modelValue = defineModel<string>()

withDefaults(defineProps<RadioGroupProps>(), {
	state: 'default',
})
</script>

<template>
	<RadioGroupRoot
		v-model="modelValue"
		class="radio-group"
		:class="[
			`radio-group--state-${state}`,
			{ 'radio-group--invalid': invalid || state === 'invalid' },
		]"
		:aria-invalid="invalid || state === 'invalid' ? true : undefined"
		:disabled="disabled || state === 'disabled'"
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
				<RadioGroupIndicator class="radio-group__indicator" />
			</RadioGroupItem>

			<span class="radio-group__label">
				{{ option.label }}
			</span>
		</label>
	</RadioGroupRoot>
</template>

<style scoped lang="scss">
.radio-group {
	display: inline-flex;
	flex-direction: column;
	gap: 10px;

	&.radio-group--invalid,
	&.radio-group--state-invalid {
		.radio-group__icon {
			box-shadow:
				inset 0 2px 4px color-mix(in srgb, var(--black, #000000) 6%, transparent),
				0 0 0 1px var(--red, #ff001f);
		}
	}

	&.radio-group--state-hovered {
		.radio-group__icon {
			background-color: color-mix(in srgb, var(--grey, #e2e2e2) 70%, transparent);
		}

		.radio-group__icon[data-state="checked"] {
			background-color: var(--brand-dark, #292fba);
		}
	}

	&.radio-group--state-focused {
		.radio-group__icon {
			outline: 2px solid var(--brand-dark, #292fba);
			outline-offset: 2px;
		}
	}
}

.radio-group__item {
	display: flex;
	align-items: center;
	gap: 10px;
	color: var(--text, #000000);
}

.radio-group__icon {
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background-color: color-mix(in srgb, var(--grey, #e2e2e2) 50%, transparent);
	transition: background-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
	cursor: pointer;

	&:hover {
		background-color: color-mix(in srgb, var(--grey, #e2e2e2) 70%, transparent);
	}

	&:focus-visible {
		outline: 2px solid var(--brand-dark, #292fba);
		outline-offset: 2px;
	}

	&[data-state="checked"] {
		background-color: var(--brand, #4149f2);

		&:hover {
			background-color: var(--brand-dark, #292fba);
		}
	}

	&[data-disabled] {
		opacity: 0.5;
		cursor: default;

    ~.radio-group__label {
      cursor: default;
    }
	}
}

.radio-group__indicator {
	display: flex;
	align-items: center;
	justify-content: center;

	&::after {
		content: "";
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background-color: var(--white, #ffffff);
	}
}
</style>
