<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'
import type { CheckboxProps } from './Checkbox.types.ts'

defineProps<CheckboxProps>()

defineSlots<{
	/** Текстовая подпись рядом с чекбоксом. */
	default?: any
}>()

const modelValue = defineModel<boolean>()
</script>

<template>
	<label class="checkbox">
		<CheckboxRoot
			v-model="modelValue"
			class="checkbox__root"
			:aria-invalid="invalid"
			:disabled="disabled"
		>
			<Icon
				v-if="disabled"
				:name="iconNames.disabled"
				:size="10"
				class="checkbox__disabled"
				aria-hidden="true"
			/>

			<CheckboxIndicator
				v-else
				class="checkbox__indicator"
			>
				<Icon
					:name="iconNames.check"
					:size="14"
					class="checkbox__check"
					aria-hidden="true"
				/>
			</CheckboxIndicator>
		</CheckboxRoot>

		<span
			v-if="$slots.default"
			class="checkbox__label"
		>
			<slot />
		</span>
	</label>
</template>

<style scoped lang="scss">
.checkbox {
	display: inline-flex;
	align-items: center;
	gap: 8px;
  @include font-size(button);
	color: var(--text);

  &:hover, &:focus-within {
    .checkbox__root {
      background-color: var(--control-hover);
      border-color: var(--focus);

      &[data-state="checked"] {
        background-color: var(--primary-hover);
        border-color: var(--primary-hover);
      }
    }
  }

	&:has(.checkbox__root:disabled) {
    pointer-events: none;

		.checkbox__root {
			color: var(--text-disabled);
			background-color: var(--surface-muted);
			border-color: var(--surface-muted);
		}

		.checkbox__label {
			color: var(--text-subtle);
		}
	}
}

.checkbox__root {
	display: flex;
	align-items: center;
	justify-content: center;
  height: var(--ui-height-XXS) !important;
  aspect-ratio: 1;
	border: 1px solid transparent;
	border-radius: var(--UI-radius-XSS);
	background-color: var(--control);
	transition: border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;

  &[aria-invalid="true"]{
    box-shadow: 0 0 0 1px var(--error);
  }

	&[data-state="checked"]{
		border-color: var(--primary);
    background-color: var(--primary);
	}
}

.checkbox__indicator {
  color: var(--on-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox__disabled {
  color: var(--text-disabled);
}
</style>
