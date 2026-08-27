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
	<label
		class="switch"
		:class="{
			'switch--checked': modelValue,
			'switch--disabled': disabled,
		}"
	>
		<SwitchRoot
			v-model="modelValue"
			:disabled="disabled"
			aria-label="Переключатель"
			class="switch__icon"
		>
			<Icon
				v-if="disabled"
				size="9"
				:name="iconNames.disabled"
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

  &:hover {
    .switch__icon {
      border-color: var(--border-primary);
      background-color: var(--bg-controls-unchecked-hover);
    }

    .switch__thumb {
      background-color: var(--icon-on-bg-unchecked-hover);
    }
  }

  &--checked:not(.switch--disabled) {
    .switch__icon {
      border-color: var(--border-primary);
      background-color: var(--bg-controls-checked);
    }

    .switch__thumb {
      transform: translateX(12px);
      background-color: var(--icon-on-bg-checked);
    }

    &:hover {
      .switch__icon {
        border-color: var(--bg-controls-checked-hover);
        background-color: var(--bg-controls-checked-hover);
      }

      .switch__thumb {
        background-color: var(--icon-on-bg-checked);
      }
    }
  }

  &--disabled {
    pointer-events: none;
    color: var(--text-on-surface-tertiary);

    .switch__icon {
      justify-content: center;
    }
  }
}

.switch__icon {
  display: inline-flex;
  width: 34px;
  border: 1px solid transparent;
  border-radius: var(--UI-radius-L);
  height: var(--ui-height-XXS);
  padding: 4px;
  background-color: var(--bg-controls-unchecked);
  transition: background-color 0.3s ease, border 0.3s ease;
}

.switch__thumb {
  height: 12px;
  aspect-ratio: 1;
  border-radius: var(--UI-radius-XS);
  background-color: var(--icon-on-bg-unchecked);
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.switch__disabled-icon {
  color: var(--icon-on-bg-disabled);
}
</style>
