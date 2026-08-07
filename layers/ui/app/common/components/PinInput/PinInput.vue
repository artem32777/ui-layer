<script setup lang="ts" generic="Type extends 'text' | 'number' = 'text'">
import { PinInputInput, PinInputRoot } from 'reka-ui'

type PinInputValue<Type extends 'text' | 'number'> = Type extends 'number' ? number[] : string[]

export interface PinInputProps<Type extends 'text' | 'number' = 'text'> {
	/** Количество полей для ввода. */
	length?: number
	/** Символ-заполнитель для пустых полей. */
	placeholder?: string
	/** Скрывает введённые символы. */
	mask?: boolean
	/** Включает автозаполнение одноразового кода на мобильных устройствах. */
	otp?: boolean
	/** Ограничивает ввод текстом или цифрами. */
	type?: Type
	/** Отображает состояние ошибки. */
	invalid?: boolean
	/** Отключает поля и запрещает ввод. */
	disabled?: boolean
}

const modelValue = defineModel<PinInputValue<Type>>({ default: () => [] })

withDefaults(defineProps<PinInputProps<Type>>(), {
	length: 6,
	type: 'text' as Type,
})

const emit = defineEmits<{
	/** Вызывается после заполнения всех полей. */
	complete: [value: PinInputValue<Type>]
}>()
</script>

<template>
	<PinInputRoot
		v-model="modelValue"
		class="pin-input"
		:class="{ 'pin-input--invalid': invalid }"
		:type="type"
		:placeholder="placeholder"
		:mask="mask"
		:otp="otp"
		:disabled="disabled"
		:aria-invalid="invalid"
		@complete="emit('complete', $event)"
	>
		<PinInputInput
			v-for="index in length"
			:key="index"
			class="pin-input__input"
			:index="index - 1"
		/>
	</PinInputRoot>
</template>

<style scoped lang="scss">
.pin-input {
	display: inline-flex;
	align-items: center;
	gap: 8px;
}

.pin-input__input {
	box-sizing: border-box;
	width: 48px;
	height: 56px;
	padding: 0;
	border: 1px solid transparent;
	border-radius: 8px;
	color: var(--text, #000000);
	background-color: color-mix(in srgb, var(--grey, #e2e2e2) 40%, transparent);
	font-size: 18px;
	font-weight: 600;
	line-height: 1;
	text-align: center;
	transition: border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;

	&:hover {
		border-color: var(--grey, #e2e2e2);
	}

	&:focus-visible {
		border-color: var(--brand, #4149f2);
		outline: none;
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand, #4149f2) 20%, transparent);
	}

	&[data-disabled] {
		border-color: var(--grey, #e2e2e2);
		color: color-mix(in srgb, var(--text, #000000) 50%, transparent);
		background-color: var(--background, #ffffff);
		opacity: 0.5;
		cursor: default;
	}
}

.pin-input--invalid .pin-input__input {
	border-color: var(--red, #ff001f);
}
</style>
