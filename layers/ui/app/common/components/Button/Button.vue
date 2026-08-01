<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed, useSlots } from 'vue'
import type { IconName } from '#layers/ui/app/modules/svg-icon/runtime/iconNames'
import SvgIcon from '#layers/ui/app/modules/svg-icon/components/SvgIcon.vue'

export interface ButtonProps {
	/** Визуальный вариация. */
	variant?: 'base' | 'ghost' | 'outline'
	/** Cостояние. */
	state?: 'default' | 'disabled' | 'progress' | 'focused' | 'hovered' | 'pressed'
	/** Размер. */
	size?: 'm' | 'l' | 'xl'
	/** Текст кнопки. Если не передан, используется default-слот. */
	text?: string
	/** Поведение кнопки. */
	type?: 'button' | 'submit' | 'reset'
	/** Иконка слева от текста. */
	iconLeft?: IconName
	/** Иконка справа от текста. */
	iconRight?: IconName
	/** Отключает кнопку и запрещает взаимодействие. */
	disabled?: boolean
	/** Передаёт рендер корневого элемента дочернему компоненту Reka UI. */
	asChild?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
	variant: 'base',
	state: 'default',
	size: 'm',
	type: 'button',
})

defineSlots<{
	/** Основное содержимое кнопки, если не используется prop `text`. */
	default?: any
}>()

const slots = useSlots()
const isDisabled = computed(() => props.disabled || props.state === 'disabled' || props.state === 'progress')
const isIconOnly = computed(() => !slots.default && Boolean(props.iconLeft || props.iconRight))
</script>

<template>
	<Primitive
		:as="asChild ? 'span' : 'button'"
		:as-child="asChild"
		:type="type"
		:disabled="isDisabled"
		:aria-busy="state === 'progress'"
		class="button"
		:class="[
			`button--${variant}`,
			`button--${size}`,
			`button--state-${state}`,
			{
				'button--icon-only': isIconOnly,
			},
		]"
	>
		<SvgIcon
			v-if="iconLeft"
			:name="iconLeft"
			:size="20"
			class="button-icon"
		/>

		<template v-if="text">
			{{ text }}
		</template>

		<slot v-else />

		<SvgIcon
			v-if="iconRight"
			:name="iconRight"
			:size="20"
			class="button-icon"
		/>
	</Primitive>
</template>

<style scoped lang="scss">
.button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	padding: 0 24px;
	border: 1px solid transparent;
	border-radius: 100px;
	font-weight: 600;
	white-space: nowrap;
	transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

// SIZES:
	&.button--m {
		height: 32px;
	}

	&.button--l {
		height: 40px;
	}

	&.button--xl {
		height: 56px;
		font-size: 18px;
	}

	&.button--icon-only {
		padding: 0;
		aspect-ratio: 1;
	}

// BASE:
	&.button--base {
		color: var(--white, #ffffff);
		background-color: var(--brand, #4149f2);

		&:hover,
		&.button--state-hovered {
			background-color: var(--brand-dark, #292fba);
		}

		&:focus-visible,
		&.button--state-focused {
			border-width: 2px;
			border-color: var(--brand-dark, #292fba);
			outline: none;
		}

		&:active,
		&.button--state-pressed {
			background-color: var(--brand-dark, #292fba);
			box-shadow: inset 0 2px 4px color-mix(in srgb, var(--black, #000000) 10%, transparent);
		}
	}

// BASE-STROKED:
	&.button--outline {
		color: var(--brand-dark, #292fba);
		background-color: transparent;
		border-color: color-mix(in srgb, var(--brand, #4149f2) 30%, transparent);

		&:hover,
		&.button--state-hovered {
			background-color: color-mix(in srgb, var(--brand, #4149f2) 10%, transparent);
			border-color: color-mix(in srgb, var(--brand, #4149f2) 50%, transparent);
		}

		&:focus-visible,
		&.button--state-focused {
			border-width: 2px;
			border-color: var(--brand, #4149f2);
			outline: none;
		}

		&:active,
		&.button--state-pressed {
			background-color: color-mix(in srgb, var(--brand, #4149f2) 10%, transparent);
			border-color: color-mix(in srgb, var(--brand, #4149f2) 50%, transparent);
			box-shadow: inset 0 2px 4px color-mix(in srgb, var(--black, #000000) 10%, transparent);
		}
	}

// GHOST:
	&.button--ghost {
		color: var(--brand-dark, #292fba);
		background-color: transparent;
		border: none;

		&:focus-visible,
		&.button--state-focused {
			outline: none;
		}

		&:active,
		&.button--state-pressed {
			box-shadow: inset 0 2px 4px color-mix(in srgb, var(--black, #000000) 10%, transparent);
		}

		&:disabled,
		&[data-disabled] {
			background-color: transparent;
			border: none;
		}
	}

	&:disabled,
	&[data-disabled] {
		color: var(--white, #ffffff);
		background-color: var(--grey, #e2e2e2);
		pointer-events: none;
		cursor: default;
	}
}

.button-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 24px;
	height: 24px;
	flex: 0 0 24px;
}
</style>
