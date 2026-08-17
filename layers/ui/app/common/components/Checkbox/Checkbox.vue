<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import { computed } from 'vue'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'

const modelValue = defineModel<boolean>({ default: false })

export interface CheckboxProps {
	/** Размер чекбокса */
	size?: number | string
	/** Cостояние. */
	state?: 'default' | 'disabled' | 'focused' | 'hovered' | 'pressed'
	/** Состояние ошибки. */
	invalid?: boolean
	/** Отключает чекбокс и запрещает взаимодействие. */
	disabled?: boolean
}

const props = withDefaults(defineProps<CheckboxProps>(), {
	size: 20,
	state: 'default',
})

defineSlots<{
	/** Текстовая подпись рядом с чекбоксом. */
	default?: any
}>()

const isDisabled = computed(() => props.disabled || props.state === 'disabled')
</script>

<template>
	<label
		class="checkbox"
		:class="[
			`checkbox--state-${state}`,
			{ 'checkbox--state-disabled': isDisabled },
		]"
	>
		<CheckboxRoot
			v-model="modelValue"
			class="checkbox__root"
			:style="{
				width: typeof size === 'number' ? `${size}px` : size,
				height: typeof size === 'number' ? `${size}px` : size,
			}"
			:aria-invalid="invalid"
			:disabled="isDisabled"
		>
			<Icon
				v-if="isDisabled"
				:name="iconNames['checkbox-disabled']"
				:size="16"
				class="checkbox__check"
				aria-hidden="true"
			/>

			<CheckboxIndicator
				v-else
				class="checkbox__indicator"
			>
				<Icon
					:name="iconNames['checkbox-indicator']"
					:size="size"
					class="checkbox__check"
					aria-hidden="true"
				/>
			</CheckboxIndicator>
		</CheckboxRoot>

		<span
			v-if="$slots.default"
			class="checkbox__label"
		>
			<slot />
		</span>
	</label>
</template>

<style scoped lang="scss">
.checkbox {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	color: var(--neutral-950);
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;

	&:not(.checkbox--state-disabled) {
		&:hover,
		&:focus-within,
		&:active,
		&.checkbox--state-hovered,
		&.checkbox--state-focused,
		&.checkbox--state-pressed {
			.checkbox__root {
				background-color: var(--white);
				border-color: var(--primary-light);

				&[data-state="checked"] {
					background-color: var(--primary-light);
				}
			}
		}
	}

	&.checkbox--state-disabled {
    pointer-events: none;

		.checkbox__root {
			color: var(--neutral-700);
			background-color: var(--neutral-500);
			border-color: var(--neutral-500);

			.checkbox__indicator {
				color: var(--neutral-700);
			}
		}

		.checkbox__label {
			color: var(--neutral-700);
		}
	}
}

.checkbox__root {
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid transparent;
	border-radius: 4px;
	background-color: var(--neutral-500);
	transition: border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
	cursor: pointer;

  &[aria-invalid="true"]{
    box-shadow: 0 0 0 1px var(--accent);
  }

	&[data-state="checked"]{
		border-color: var(--primary);
		background-color: var(--primary);
	}
}

.checkbox__indicator {
	color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
