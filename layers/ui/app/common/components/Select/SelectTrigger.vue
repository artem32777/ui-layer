<script setup lang="ts">
import { SelectIcon, SelectTrigger as RekaSelectTrigger, SelectValue } from 'reka-ui'
import { iconNames } from '#layers/ui/app/modules/svg-icon/runtime/iconNames'
import SvgIcon from '#layers/ui/app/modules/svg-icon/components/SvgIcon.vue'

export interface SelectTriggerProps {
	/** Текст, отображаемый до выбора значения. */
	placeholder: string
	/** Подписи выбранных вариантов. */
	selectedLabels: string[]
	/** Режим выбора - один или множество */
	multiple?: boolean
	/** Включает визуальное состояние ошибки. */
	invalid?: boolean
	/** Визуальный вариант поля выбора. */
	variant?: 'base' | 'secondary'
	/** Размер поля выбора. */
	size?: 'sm' | 'md' | 'lg'
}

defineProps<SelectTriggerProps>()
</script>

<template>
	<RekaSelectTrigger
		class="select"
		:class="[
			`select--${variant}`,
			`select--${size}`,
			{ 'select--invalid': invalid },
		]"
		:aria-invalid="invalid"
	>
		<SelectValue
			class="select__value"
			:placeholder="placeholder"
		>
			<span v-if="multiple && selectedLabels.length">
				{{ selectedLabels[0] }}
				<span
					v-if="selectedLabels.length > 1"
					class="select__count"
				>
					+{{ selectedLabels.length - 1 }}
				</span>
			</span>
			<span v-else>
				{{ selectedLabels[0] ?? placeholder }}
			</span>
		</SelectValue>

		<SelectIcon
			class="select__icon"
			aria-hidden="true"
			as-child
		>
			<SvgIcon :name="iconNames.chevronDown" />
		</SelectIcon>
	</RekaSelectTrigger>
</template>

<style scoped lang="scss">
.select {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 56px;
  padding: 0 16px;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: 8px;
  color: var(--text, #000000);
  background-color: color-mix(in srgb, var(--grey, #e2e2e2) 40%, transparent);
  font-weight: 600;
  transition: border-color 0.3s ease, background-color 0.3s ease, opacity 0.3s ease;
  cursor: pointer;

  &.select--secondary {
    border-color: var(--grey, #e2e2e2);
    background-color: var(--background, #ffffff);
  }

  &:focus {
    border-color: color-mix(in srgb, var(--brand, #4149f2) 50%, transparent);
  }

  @media (any-hover: hover) {
    &:hover {
      background-color: color-mix(in srgb, var(--brand, #4149f2) 3%, transparent);
    }
  }

  &[data-state='open'] .select__icon {
    transform: rotateX(180deg);
  }

  &[data-disabled] {
    opacity: 0.5;
    pointer-events: none;
  }

  &.select--invalid {
    border-color: var(--red, #ff001f);
  }

  &.select--sm {
    min-height: 48px;
    padding: 0 14px;
    font-size: 14px;
  }

  &.select--lg {
    min-height: 64px;
    padding: 0 18px;
  }
}

.select__value {
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background-color: color-mix(in srgb, var(--brand, #4149f2) 7%, transparent);
}

.select__icon {
  transition: transform 0.3s ease;
}
</style>
