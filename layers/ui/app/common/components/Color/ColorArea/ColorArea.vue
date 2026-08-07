<script setup lang="ts">
import { ColorAreaArea, ColorAreaRoot, ColorAreaThumb, type ColorChannel, type ColorSpace } from 'reka-ui'

interface Props {
	colorSpace?: ColorSpace
	xChannel?: ColorChannel
	yChannel?: ColorChannel
	disabled?: boolean
	xName?: string
	yName?: string
}

withDefaults(defineProps<Props>(), {
	colorSpace: 'hsl',
	xChannel: 'saturation',
	yChannel: 'lightness',
	disabled: false,
})

const modelValue = defineModel<string>({ default: '#56d799' })

const emit = defineEmits<{
	'change-end': [value: string]
}>()
</script>

<template>
	<ColorAreaRoot
		v-slot="{ style }"
		v-model="modelValue"
		class="ui-color-area"
		:color-space="colorSpace"
		:x-channel="xChannel"
		:y-channel="yChannel"
		:disabled="disabled"
		:x-name="xName"
		:y-name="yName"
		@change-end="emit('change-end', $event)"
	>
		<ColorAreaArea
			class="ui-color-area__area"
			:style="style"
		>
			<ColorAreaThumb class="ui-color-area__thumb" />
		</ColorAreaArea>
	</ColorAreaRoot>
</template>

<style scoped lang="scss">
.ui-color-area {
	width: min(240px, 100%);

	&[data-disabled] {
		opacity: 0.5;
	}
}

.ui-color-area__area {
	position: relative;
	width: 100%;
	aspect-ratio: 1;
	overflow: hidden;
	border-radius: 8px;
	cursor: crosshair;

	&[data-disabled] {
		cursor: not-allowed;
	}
}

.ui-color-area__thumb {
	display: block;
	box-sizing: border-box;
	width: 20px;
	height: 20px;
	border: 2px solid var(--white, #ffffff);
	border-radius: 50%;
	background-color: var(--white, #ffffff);
	box-shadow: 0 0 0 1px color-mix(in srgb, var(--text, #000000) 65%, transparent), 0 1px 3px color-mix(in srgb, var(--text, #000000) 35%, transparent);
	transition: box-shadow 0.2s ease;

	&:focus {
		outline: none;
	}

	&:focus-visible {
		box-shadow: 0 0 0 2px var(--white, #ffffff), 0 0 0 5px var(--brand, #4149f2);
	}
}
</style>
