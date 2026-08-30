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
	color: var(--text-on-surface-dark);

  &:hover, &:focus-within {
    .checkbox__root {
      background-color: var(--bg-controls-unchecked-hover);
      border-color: var(--border-primary);

      &[data-state="checked"] {
        background-color: var(--bg-controls-checked-hover);
        border-color: var(--bg-controls-checked-hover);
      }
    }
  }

	&:has(.checkbox__root:disabled) {
    pointer-events: none;

		.checkbox__root {
			color: var(--icon-on-bg-disabled);
			background-color: var(--bg-action-disabled);
			border-color: var(--bg-action-disabled);
		}

		.checkbox__label {
			color: var(--text-on-surface-tertiary);
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
	background-color: var(--bg-controls-unchecked);
	transition: border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;

  &[aria-invalid="true"]{
    box-shadow: 0 0 0 1px var(--accent);
  }

	&[data-state="checked"]{
		border-color: var(--bg-controls-checked);
    background-color: var(--bg-controls-checked);
	}
}

.checkbox__indicator {
  color: var(--icon-on-bg-checked);
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox__disabled {
  color: var(--icon-on-bg-disabled);
}
</style>
