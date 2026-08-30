<script setup lang="ts" generic="T extends boolean = false">
import { computed } from 'vue'
import type { SelectOption, SelectProps } from './Select.types'
import SelectMenu from './SelectMenu.vue'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'
import { SelectIcon, SelectRoot, SelectValue, SelectTrigger } from 'reka-ui'
import Badge from '#layers/ui/app/common/components/Badge/Badge.vue'

// https://reka-ui.com/docs/components/select

const props = withDefaults(defineProps<SelectProps<T>>(), {
	variant: 'fill',
	size: 'medium',
})

const modelValue = defineModel<T extends true ? string[] : string>()

const emit = defineEmits<{
	'update:open': [open: boolean]
}>()

function findSelectOption(options: SelectOption[], value: string | undefined): SelectOption | undefined {
	if (value == null) return undefined

	for (const option of options) {
		if (option.value === value) return option

		const nested = option.children && findSelectOption(option.children, value)
		if (nested) return nested
	}
}

const selectedLabels = computed(() => (Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value])
	.flatMap(value => findSelectOption(props.options, value)?.label ?? []))
</script>

<template>
	<SelectRoot
		:key="String(multiple)"
		v-model="modelValue"
		:multiple="multiple"
		:disabled="disabled"
		@update:open="emit('update:open', $event)"
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
			<Icon
				v-if="icon"
				:name="icon"
				:size="20"
				class="select__icon"
				aria-hidden="true"
			/>

			<SelectValue
				class="select__value"
				:placeholder="placeholder"
			>
				<span v-if="multiple && selectedLabels.length">
					{{ selectedLabels[0] }}
					<Badge
						v-if="selectedLabels.length > 1"
						:text="`+${selectedLabels.length - 1}`"
						class="select__counter"
					/>
				</span>
				<span v-else>
					{{ selectedLabels[0] ?? placeholder }}
				</span>
			</SelectValue>

			<SelectIcon
				class="select__chevron"
				aria-hidden="true"
				as-child
			>
				<Icon
					:name="iconNames['chevron-down']"
					:size="20"
				/>
			</SelectIcon>
		</SelectTrigger>

		<ClientOnly>
			<SelectMenu :options="options" />
		</ClientOnly>
	</SelectRoot>
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

	&[data-disabled] {
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
