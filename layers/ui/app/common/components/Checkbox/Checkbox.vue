<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'

const modelValue = defineModel<boolean>({ default: false })

export interface CheckboxProps {
	/** Размер чекбокса и иконки отметки внутри него в пикселях. */
	size?: number | string
	/** Состояние ошибки. */
	invalid?: boolean
	/** Отключает чекбокс и запрещает взаимодействие. */
	disabled?: boolean
}

withDefaults(defineProps<CheckboxProps>(), {
	size: 16,
})

defineSlots<{
	/** Текстовая подпись рядом с чекбоксом. */
	default?: any
}>()
</script>

<template>
	<label class="checkbox">
		<CheckboxRoot
			v-model="modelValue"
			class="checkbox__root"
			:style="{
				width: typeof size === 'number' ? `${size}px` : size,
				height: typeof size === 'number' ? `${size}px` : size,
			}"
			:aria-invalid="invalid"
			:disabled="disabled"
		>
			<CheckboxIndicator class="checkbox__indicator">
				<Icon
					:name="iconNames.check"
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
	gap: 10px;
	color: var(--text, #000000);
}

.checkbox__root {
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid var(--grey, #e2e2e2);
	border-radius: 4px;
	background-color: color-mix(in srgb, var(--grey, #e2e2e2) 50%, transparent);
	transition: border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
	cursor: pointer;

	&:focus-visible {
		outline: 2px solid var(--brand-dark, #292fba);
		outline-offset: 2px;
	}

  &[aria-invalid="true"]{
    box-shadow: 0 0 0 1px var(--red, #ff001f);
  }

	&[data-state="checked"]{
		border-color: var(--brand, #4149f2);
		background-color: var(--brand, #4149f2);
	}

	&[data-disabled] {
		opacity: 0.5;
		cursor: not-allowed;
	}
}

.checkbox__indicator {
	color: var(--white, #ffffff);
}
</style>
