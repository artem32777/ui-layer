<script setup lang="ts" generic="T extends boolean = false">
import { computed } from 'vue'
import type { SelectProps } from './Select.types'
import SelectMenu from './SelectMenu.vue'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'
import { SelectIcon, SelectValue, SelectTrigger } from 'reka-ui'

// https://reka-ui.com/docs/components/select

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SelectProps<T>>(), {
	variant: 'fill',
	size: 'medium',
})

const emit = defineEmits<{
	/** Меню закрылось (для валидации формы на «уходе» с поля). */
	close: []
}>()

const modelValue = defineModel<T extends true ? string[] : string>()

const selectedLabels = computed(() => (Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value])
	.flatMap(value => props.options.find(option => option.value === value)?.label ?? []))

const iconSize = computed(() => ({ medium: 18, big: 20 })[props.size])

function onOpenChange(isOpen: boolean) {
	if (!isOpen) {
		emit('close')
	}
}
</script>

<template>
	<SelectRoot
		:key="String(multiple)"
		v-model="modelValue"
		:multiple="multiple"
		:disabled="disabled"
		@update:open="onOpenChange"
	>
		<SelectTrigger
			v-bind="$attrs"
			class="select"
			:class="[
				`select--variant-${variant}`,
				`select--size-${size}`,
				{
					'select--with-icon': icon,
				},
			]"
			:aria-invalid="invalid"
			:aria-label="selectedLabels.length ? selectedLabels.join(', ') : placeholder"
		>
			<Icon
				v-if="icon"
				:name="icon"
				:size="iconSize"
				class="select__icon"
				aria-hidden="true"
			/>

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
				class="select__chevron"
				aria-hidden="true"
				as-child
			>
				<Icon
					:name="iconNames.plus"
					:size="iconSize"
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
	min-width: 150px;
	gap: 6px;
	border: 1px solid transparent;
	@include font-size(button);
	color: var(--text-on-bg-secondary);
	background-color: var(--bg-field-static);
	transition: border-color 0.3s ease, background-color 0.3s ease, opacity 0.3s ease;
	cursor: pointer;

	&:hover {
		background-color: var(--bg-field-hover);
	}

	&:focus {
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
		padding-left: 12px;
		padding-right: 16px;

		.select__icon {
			left: 12px;
		}

		&.select--with-icon {
			padding-left: 40px;
		}
	}

	&--size-big {
		height: var(--ui-height-L);
		border-radius: var(--UI-radius-L);
		padding-left: 18px;
		padding-right: 22px;

		.select__icon {
			left: 18px;
		}

		&.select--with-icon {
			padding-left: 50px;
		}
	}
}

.select__icon {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	pointer-events: none;
}

.select__value {
	flex: 1;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-align: left;
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

.select__chevron {
	flex-shrink: 0;
	transition: transform 0.3s ease;
}
</style>
