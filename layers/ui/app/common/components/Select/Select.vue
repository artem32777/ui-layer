<script setup lang="ts" generic="T extends boolean = false">
import { computed } from 'vue'
import type { SelectOption, SelectProps } from './Select.types'
import type { DropdownMenuItem } from '../DropdownMenu/DropdownMenu.types'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'
import Badge from '#layers/ui/app/common/components/Badge/Badge.vue'
import DropdownMenu from '../DropdownMenu/DropdownMenu.vue'

const props = withDefaults(defineProps<SelectProps<T>>(), {
	variant: 'fill',
	size: 'medium',
})

const modelValue = defineModel<T extends true ? string[] : string>()
const isDropdownOpen = defineModel<boolean>('open', { default: false })

/** Ищет вариант по value, в том числе во вложенных children. */
function findOption(options: SelectOption[], value: string): SelectOption | undefined {
	for (const option of options) {
		if (option.value === value) {
			return option
		}

		if (option.children) {
			const nested = findOption(option.children, value)
			if (nested) {
				return nested
			}
		}
	}
}

const selectedValues = computed(() => (props.multiple
	? modelValue.value ?? []
	: modelValue.value ? [modelValue.value] : []) as string[])

/** В модели лежит value, в триггере показываем label. */
const selectedLabels = computed(() => selectedValues.value.map(value => findOption(props.options, value)?.label ?? value))

function withSelected(options: SelectOption[]): DropdownMenuItem[] {
	return options.map(option => ({
		...option,
		selected: selectedValues.value.includes(option.value),
		children: option.children ? withSelected(option.children) : undefined,
	}))
}

const menuItems = computed(() => withSelected(props.options))

/** Пишет выбранный пункт в v-model. При multiple переключает значение в массиве и оставляет меню открытым. */
function onItemClick(item: DropdownMenuItem, event: Event) {
	if (props.multiple) {
		event.preventDefault()
		const current = [...(modelValue.value ?? [])] as string[]
		const index = current.indexOf(item.value!)

		if (index === -1) {
			current.push(item.value!)
		} else {
			current.splice(index, 1)
		}

		modelValue.value = current as typeof modelValue.value
	} else {
		modelValue.value = item.value as typeof modelValue.value
	}
}
</script>

<template>
	<DropdownMenu
		v-model="isDropdownOpen"
		:items="menuItems"
		:offset="8"
		@on-item-click="onItemClick"
	>
		<button
			type="button"
			role="combobox"
			class="select"
			:class="[
				`select--variant-${variant}`,
				`select--size-${size}`,
			]"
			:aria-invalid="invalid"
			:disabled="disabled"
			:data-placeholder="selectedLabels.length ? undefined : true"
		>
			<Icon
				v-if="icon"
				:name="icon"
				:size="20"
				class="select__icon"
				aria-hidden="true"
			/>

			<span class="select__value">
				<template v-if="multiple && selectedLabels.length">
					{{ selectedLabels[0] }}
					<Badge
						v-if="selectedLabels.length > 1"
						:text="`+${selectedLabels.length - 1}`"
						class="select__counter"
					/>
				</template>
				<template v-else-if="selectedLabels.length">
					{{ selectedLabels[0] }}
				</template>
				<template v-else>
					{{ placeholder }}
				</template>
			</span>

			<Icon
				:name="iconNames['chevron-down']"
				:size="20"
				class="select__chevron"
				aria-hidden="true"
			/>
		</button>
	</DropdownMenu>
</template>

<style scoped lang="scss">
.select {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid transparent;
  @include font-size(button);
  color: var(--text-on-bg-secondary);
  background-color: var(--bg-field-static);
  transition: border-color 0.3s ease, background-color 0.3s ease, opacity 0.3s ease;

  &:hover, &:focus {
    background-color: var(--bg-field-hover);
    outline: none;
  }

  &[data-state='open'],
  &:focus:not([data-placeholder]) {
    background-color: var(--bg-field-expanded);
    border-color: var(--border-expanded);
  }

  &[aria-invalid='true'] {
    border-color: var(--border-error);
  }

  &[data-disabled],
  &:disabled {
    color: var(--text-on-bg-disabled);
    background-color: var(--bg-action-disabled);
    pointer-events: none;
  }

  &[data-state='open'] {
    .select__chevron {
      transform: rotateX(180deg);
    }
  }

  &--size-medium {
    height: var(--ui-height-M);
    border-radius: var(--UI-radius-M);
    padding: 0 12px;
    gap: 10px;
  }

  &--size-big {
    height: var(--ui-height-L);
    border-radius: var(--UI-radius-L);
    padding: 0 18px 0 20px;
    gap: 12px;
  }
}

.select__value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}

.select__counter {
  margin-left: 6px;
}

.select__chevron {
  transition: transform 0.3s ease;
}
</style>
