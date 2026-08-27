<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import type { SwitchProps } from './Switch.types.ts'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'

// https://reka-ui.com/docs/components/switch

defineProps<SwitchProps>()

defineSlots<{
	/** Контент справа от свитча, если не используется проп `text` */
	default?: any
}>()

const modelValue = defineModel<boolean>()
</script>

<template>
	<label class="switch">
		<SwitchRoot
			v-model="modelValue"
			:disabled="disabled"
			aria-label="Переключатель"
			class="switch__icon"
		>
			<Icon
				v-if="disabled"
				:name="iconNames.plus"
				class="switch__disabled-icon"
			/>
			<SwitchThumb
				v-else
				class="switch__thumb"
			/>
		</SwitchRoot>
		<slot>
			{{ text }}
		</slot>
	</label>
</template>

<style scoped lang="scss">
.switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  @include font-size(button);
  color: var(--text-on-surface-dark);

  &:has(.switch__icon[data-disabled]) {
    pointer-events: none;
    cursor: pointer;
    color: var(--neutral-700);

    .switch__icon {
      justify-content: center;
    }
  }
}

.switch__icon {
  display: inline-flex;
	width: 34px;
	height: var(--ui-height-XXS);
  border-radius: var(--UI-radius-L);
	padding: 4px;
	background-color: var(--bg-controls-unchecked);
	transition: background-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;

	&:hover {
		background-color: var(--neutral-600);
	}

	&[data-state="checked"]:not([data-disabled]) {
		background-color: var(--primary-500);

		&:hover {
			background-color: var(--primary-light);
		}
	}

	&:focus-visible {
		outline: 2px solid var(--brand-dark, #292fba);
		outline-offset: 1px;
	}

	&[aria-invalid='true'] {
		box-shadow: 0 0 0 1px var(--accent, #ff001f);
	}
}

.switch__thumb {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background-color: var(--neutral-650);
	transition: transform 0.3s ease;

	&[data-state="checked"] {
		transform: translateX(16px);
	}
}

.switch__disabled-icon{
  color: var(--neutral-650);
}
</style>
