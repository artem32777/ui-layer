<script setup lang="ts">
import { computed } from 'vue'
import { SelectContent, SelectGroup, SelectItem, SelectItemIndicator, SelectItemText, SelectLabel, SelectPortal, SelectSeparator, SelectViewport } from 'reka-ui'
import type { SelectOption } from './Select.types.ts'

const { options } = defineProps<{
	options: SelectOption[]
}>()

const groupedOptions = computed(() => {
	const groups = new Map<string, SelectOption[]>()

	options.forEach((option) => {
		const group = option.group ?? ''
		groups.set(group, [...(groups.get(group) ?? []), option])
	})

	return Array.from(groups, ([label, items]) => ({ label, items }))
})
</script>

<template>
	<SelectPortal>
		<SelectContent
			class="select-menu"
			position="popper"
			:side-offset="5"
		>
			<SelectViewport>
				<SelectGroup
					v-for="group in groupedOptions"
					:key="group.label || 'default'"
				>
					<SelectLabel
						v-if="group.label"
						class="select-menu__group-label"
					>
						{{ group.label }}
					</SelectLabel>

					<SelectItem
						v-for="option in group.items"
						:key="option.value"
						class="select-menu__option"
						:value="option.value"
						:disabled="option.disabled"
					>
						<SelectItemIndicator class="select-menu__indicator">
							✓
						</SelectItemIndicator>
						<SelectItemText>
							{{ option.label }}
						</SelectItemText>
					</SelectItem>

					<SelectSeparator
						v-if="group.label"
						class="select-menu__separator"
					/>
				</SelectGroup>
			</SelectViewport>
		</SelectContent>
	</SelectPortal>
</template>

<style scoped lang="scss">
:deep(.select-menu) {
  min-width: var(--reka-select-trigger-width);
  padding: 4px;
  border-radius: 8px;
  color: var(--text, #000000);
  border: 1px solid color-mix(in srgb, var(--brand, #4149f2) 50%, transparent);
  background-color: var(--background, #ffffff);
  animation: select-menu-fade-in 0.3s ease;
  z-index: $z-select;
}

.select-menu__option {
  display: flex;
  align-items: center;
  min-height: 40px;
  gap: 10px;
  padding: 0 12px;
  user-select: none;
  transition: all 0.3s ease 0s;
  cursor: pointer;

  @media (any-hover: hover) {
    &:hover {
      background-color: color-mix(in srgb, var(--brand, #4149f2) 5%, transparent);
    }
  }

  &[data-highlighted] {
    outline: none;
  }

  &[data-disabled] {
    color: var(--additional-2, #6b5b72);
    pointer-events: none;
  }
}

.select-menu__indicator {
  //display: none;
}

.select-menu__group-label {
  padding: 6px 28px;
  color: var(--additional-2, #6b5b72);
  font-size: 12px;
}

.select-menu__separator {
  //height: 1px;
  //margin: 4px;
  //background-color: var(--grey, #e2e2e2);
}

@keyframes select-menu-fade-in {
  from {opacity: 0;transform: scale(0.98)}

  to {opacity: 1;transform: scale(1)}
}
</style>
