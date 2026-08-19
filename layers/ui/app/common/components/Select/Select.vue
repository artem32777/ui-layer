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
				<Icon :name="iconNames.selectChevron" />
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
  height: 40px;
  padding: 0 12px;
  gap: 6px;
  border: 1px solid transparent;
  border-radius: 16px;
  @include font-size(button);
  color: var(--neutral-950);
  background-color: var(--neutral-500);
  transition: border-color 0.3s ease, background-color 0.3s ease, opacity 0.3s ease;
  cursor: pointer;

  &.select--variant-secondary {
    border-color: var(--neutral-500, #e2e2e2);
    background-color: var(--background, #ffffff);
  }

  &:focus {
    border-color: color-mix(in srgb, var(--brand, #4149f2) 50%, transparent);
    background-color: var(--neutral-600);
  }

  &:hover {
    background-color: var(--neutral-600);
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
    border-color: var(--accent, #ff001f);
  }

// SIZES:
  &.select--size-lg {
    height: 54px;
    padding: 0 20px;
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
  height: 20px;
  padding: 0 7px;
  border-radius: 16px;
  @include font-size(label);
  color: var(--white);
  background-color: var(--primary-light);
}

.select__icon {
  transition: transform 0.3s ease;
}
</style>
