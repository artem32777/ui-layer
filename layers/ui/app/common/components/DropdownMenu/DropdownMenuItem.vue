<script setup lang="ts">
import { computed } from 'vue'
import type { DropdownMenuItem } from './DropdownMenu.types'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'
import Checkbox from '#layers/ui/app/common/components/Checkbox/Checkbox.vue'
import RadioGroup from '#layers/ui/app/common/components/RadioGroup/RadioGroup.vue'
import Switch from '#layers/ui/app/common/components/Switch/Switch.vue'

const props = defineProps<{
	item: DropdownMenuItem
}>()

const variant = computed(() => props.item.variant ?? (props.item.icon ? 'icon' : 'simple'))
</script>

<template>
	<div class="dropdown-menu-item">
		<div class="dropdown-menu-item__content">
			<div class="dropdown-menu-item__row">
				<Checkbox
					v-if="variant === 'checkbox'"
					:model-value="item.selected"
					:disabled="item.disabled"
					@click.prevent
				>
					{{ item.label }}
				</Checkbox>

				<RadioGroup
					v-else-if="variant === 'radio'"
					:model-value="item.selected ? item.value : undefined"
					:options="[{ value: item.value, label: item.label, disabled: item.disabled }]"
					:disabled="item.disabled"
					@click.prevent
				/>

				<Switch
					v-else-if="variant === 'switch'"
					:model-value="item.selected"
					:disabled="item.disabled"
					:text="item.label"
					@click.prevent
				/>

				<template v-else>
					<Icon
						v-if="variant === 'icon' && item.icon"
						:name="item.icon"
						:size="18"
						aria-hidden="true"
					/>

					<span class="dropdown-menu-item__label">{{ item.label }}</span>

					<Icon
						v-if="item.selected && !item.children"
						:name="iconNames.check"
						:size="18"
						class="dropdown-menu-item__check"
						aria-hidden="true"
					/>
				</template>
			</div>

			<span
				v-if="item.description"
				class="dropdown-menu-item__description"
				:class="`dropdown-menu-item__description--${variant}`"
			>
				{{ item.description }}
			</span>
		</div>

		<Icon
			v-if="item.children"
			:name="iconNames['chevron-right']"
			:size="18"
			class="dropdown-menu-item__chevron"
			aria-hidden="true"
		/>
	</div>
</template>

<style lang="scss" scoped>
.dropdown-menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  @include font-size(button);
  user-select: none;
  cursor: pointer;
  padding: 8px 10px;
  gap: 8px;
  border-radius: var(--radius-content);

  &[data-highlighted] {
    background-color: var(--bg-action-item-hover);
    outline: none;
  }

  &[data-disabled] {
    color: var(--text-on-surface-tertiary);
    pointer-events: none;
  }
}

.dropdown-menu-item__content {
  height: 100%;
}

//.dropdown-menu-item:has(.checkbox),
//.dropdown-menu-item:has(.switch),
//.dropdown-menu-item:has(.radio-group) {
//  padding: 0;
//}

.dropdown-menu-item__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.dropdown-menu-item__row {
  display: flex;
  align-items: center;
  gap: 10px;

  //:deep(.checkbox),
  //:deep(.switch) {
  //  display: flex;
  //  flex: 1;
  //  width: 100%;
  //  min-width: 0;
  //  padding: 8px 10px;
  //}

  :deep(.radio-group) {
    display: flex;
    flex: 1;
    width: 100%;
  }

  //:deep(.radio-group__item) {
  //  width: 100%;
  //  padding: 8px 10px;
  //}
}

.dropdown-menu-item__label {
  @include font-size(button);
  color: var(--text-on-surface-dark);
}

.dropdown-menu-item__description {
  @include font-size(p2);
  color: var(--text-on-surface-tertiary);
}

.dropdown-menu-item__check {
  color: var(--graphics-accent);
}

.dropdown-menu-item__chevron {
  color: var(--icon-on-bg-secondary-muted);
}
</style>
