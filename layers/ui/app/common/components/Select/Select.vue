<script setup lang="ts" generic="T extends boolean = false">
import { computed } from 'vue'
import type { SelectProps } from './Select.types'
import SelectMenu from './SelectMenu.vue'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'
import { SelectIcon, SelectValue, SelectTrigger } from 'reka-ui'

// https://reka-ui.com/docs/components/select

const props = withDefaults(defineProps<SelectProps<T>>(), {
	variant: 'primary',
	size: 'medium',
})

const modelValue = defineModel<T extends true ? string[] : string>()

const selectedLabels = computed(() => (Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value])
	.flatMap(value => props.options.find(option => option.value === value)?.label ?? []))
</script>

<template>
	<SelectRoot
		v-model="modelValue"
		:multiple="multiple"
		:disabled="disabled"
	>
		<SelectTrigger
			class="select"
			:class="[
				`select--variant-${variant}`,
				`select--size-${size}`,
			]"
			:aria-invalid="invalid"
			:aria-label="selectedLabels.length ? selectedLabels.join(', ') : placeholder"
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
				<Icon :name="iconNames.chevronDown" />
			</SelectIcon>
		</SelectTrigger>
		<ClientOnly>
			<SelectMenu :options="options" />
		</ClientOnly>
	</SelectRoot>
</template>

<style scoped lang="scss">
.select {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 150px;
  min-height: 56px;
  padding: 0 16px;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: 8px;
  color: var(--text, #000000);
  background-color: color-mix(in srgb, var(--grey, #e2e2e2) 40%, transparent);
  transition: border-color 0.3s ease, background-color 0.3s ease, opacity 0.3s ease;
  cursor: pointer;

  &.select--variant-secondary {
    border-color: var(--grey, #e2e2e2);
    background-color: var(--background, #ffffff);
  }

  &:focus {
    border-color: color-mix(in srgb, var(--brand, #4149f2) 50%, transparent);
  }

  &:hover {
    background-color: color-mix(in srgb, var(--brand, #4149f2) 3%, transparent);
  }

  &[data-state='open'] {
    .select__icon {
      transform: rotateX(180deg);
    }
  }

  &[data-disabled] {
    opacity: 0.5;
    pointer-events: none;
  }

  &[aria-invalid="true"] {
    border-color: var(--red, #ff001f);
  }

// SIZES:
  &.select--size-sm {
    min-height: 48px;
    padding: 0 14px;
    font-size: 14px;
  }

  &.select--size-lg {
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
