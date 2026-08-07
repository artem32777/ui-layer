<script setup lang="ts">
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot } from 'reka-ui'

export interface NumberFieldProps {
	/** Визуальный вариант */
	variant?: 'base' | 'secondary'
	/** Размер */
	size?: 'sm' | 'md' | 'lg'
	/** Начальное значение. */
	defaultValue?: number
	/** Минимальное  значение. */
	min?: number
	/** Максимальное  значение. */
	max?: number
	/** Шаг изменения значения. */
	step?: number
	/** Отключает поле и запрещает взаимодействие. */
	disabled?: boolean
}

const props = withDefaults(defineProps<NumberFieldProps>(), {
	variant: 'base',
	size: 'md',
})

const modelValue = defineModel<number | null>()
</script>

<template>
	<NumberFieldRoot
		v-model="modelValue"
		v-bind="props"
		class="number-field"
		:class="[
			`number-field--${size}`,
			`number-field--${variant}`,
		]"
	>
		<NumberFieldDecrement class="number-field__button number-field__button--decrement">
			−
		</NumberFieldDecrement>

		<NumberFieldInput class="number-field__input" />

		<NumberFieldIncrement class="number-field__button number-field__button--increment">
			+
		</NumberFieldIncrement>
	</NumberFieldRoot>
</template>

<style scoped lang="scss">
.number-field {
	display: flex;
	width: 100%;
	height: 56px;
	border: 1px solid transparent;
	border-radius: 8px;
	color: var(--text, #000000);
	background-color: color-mix(in srgb, var(--grey, #e2e2e2) 40%, transparent);
	transition: border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;

	&:focus-within {
		border-color: var(--brand-dark, #292fba);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--brand, #4149f2) 25%, transparent);
	}

	&[aria-invalid='true'] {
		border-color: var(--red, #ff001f);

		&:focus-within {
			box-shadow: 0 0 0 2px color-mix(in srgb, var(--red, #ff001f) 20%, transparent);
		}
	}

	&[data-disabled] {
		border-color: var(--grey, #e2e2e2);
		color: color-mix(in srgb, var(--text, #000000) 50%, transparent);
		background-color: var(--background, #ffffff);
	}

// VARIANTS:
  &--secondary {
    border-color: var(--grey, #e2e2e2);
    background-color: var(--background, #ffffff);
  }

  // SIZES:

  &--sm {
    height: 48px;
    font-size: 14px;

    .number-field__button {
      flex-basis: 40px;
    }
  }

  &--lg {
    height: 64px;

    .number-field__button {
      flex-basis: 56px;
    }
  }
}

.number-field__button {
	display: flex;
	flex: 0 0 48px;
	align-items: center;
	justify-content: center;
	color: inherit;
	background-color: transparent;
	transition: background-color 0.2s ease, opacity 0.2s ease;

	&:hover {
		background-color: color-mix(in srgb, var(--grey, #e2e2e2) 55%, transparent);
	}

	&:active {
		background-color: color-mix(in srgb, var(--grey, #e2e2e2) 80%, transparent);
	}

	&[data-disabled] {
		opacity: 0.45;
		cursor: default;

		&:hover,
		&:active {
			background-color: transparent;
		}
	}
}

.number-field__button--decrement {
	border-right: 1px solid color-mix(in srgb, var(--grey, #e2e2e2) 70%, transparent);
}

.number-field__button--increment {
	border-left: 1px solid color-mix(in srgb, var(--grey, #e2e2e2) 70%, transparent);
}

.number-field__input {
	flex: 1 1 auto;
	padding: 0 12px;
	text-align: center;
}
</style>
