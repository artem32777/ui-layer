<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '#layers/ui/app/modules/svg-icon'
import type { InputProps } from './Input.types.ts'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputProps>(), {
	variant: 'fill',
	size: 'medium',
	type: 'text',
})

const modelValue = defineModel<string>()

const iconSize = computed(() => ({ medium: 18, big: 20 })[props.size])
</script>

<template>
	<div
		class="input"
		:class="[
			`input--variant-${variant}`,
			`input--size-${size}`,
			{
				'input--with-icon': icon,
				'input--disabled': disabled,
			},
		]"
	>
		<Icon
			v-if="icon"
			:name="icon"
			:size="iconSize"
			class="input__icon"
			aria-hidden="true"
		/>

		<input
			v-bind="$attrs"
			v-model="modelValue"
			class="input__field"
			:type="type"
			:placeholder="placeholder"
			:disabled="disabled"
			:aria-invalid="invalid"
		>
	</div>
</template>

<style scoped lang="scss">
.input {
	position: relative;
	width: 100%;
	color: var(--text-on-bg-secondary);

	&--disabled {
		color: var(--text-on-bg-disabled);
	}

	&--size-medium {
		.input__field {
			height: var(--ui-height-M);
			border-radius: var(--UI-radius-M);
			padding-left: 12px;
			padding-right: 16px;
		}

		.input__icon {
			left: 12px;
		}

		&.input--with-icon {
			.input__field {
				padding-left: 40px;
			}
		}
	}

	&--size-big {
		.input__field {
			height: var(--ui-height-L);
			border-radius: var(--UI-radius-L);
			padding-left: 18px;
			padding-right: 22px;
		}

		.input__icon {
			left: 18px;
		}

		&.input--with-icon {
			.input__field {
				padding-left: 50px;
			}
		}
	}
}

.input__icon {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	pointer-events: none;
}

.input__field {
	width: 100%;
	background-color: var(--bg-field-static);
	border: 1px solid transparent;
	@include font-size(button);
	transition: border-color 0.3s ease, background-color 0.3s ease, opacity 0.3s ease;

	&:hover {
		background-color: var(--bg-field-hover);
	}

	&:focus {
		outline: none;
	}

	&:focus:not(:placeholder-shown) {
		background-color: var(--bg-field-expanded);
		border-color: var(--border-expanded);
	}

	&[aria-invalid='true'] {
		border-color: var(--border-error);
	}

	&:disabled {
		background-color: var(--bg-action-disabled);
	}
}
</style>
