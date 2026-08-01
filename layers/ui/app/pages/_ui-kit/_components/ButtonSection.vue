<script setup lang="ts">
import Button from '../../../common/components/Button/Button.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitRow from './UiKitRow.vue'
import UiKitSection from './UiKitSection.vue'

const buttonVariants = [
	{ label: 'Base', value: 'base' },
	{ label: 'Outline', value: 'outline' },
	{ label: 'Ghost', value: 'ghost' },
] as const

const buttonSizes = [
	{ label: 'M', value: 'm' },
	{ label: 'L', value: 'l' },
	{ label: 'XL', value: 'xl' },
] as const

const buttonStates = [
	{ label: 'Default', value: 'default' },
	{ label: 'Disabled', value: 'disabled' },
	{ label: 'Progress', value: 'progress' },
	{ label: 'Focused', value: 'focused' },
	{ label: 'Hovered', value: 'hovered' },
	{ label: 'Pressed', value: 'pressed' },
] as const
</script>

<template>
	<UiKitSection title="Button">
		<UiKitRow
			v-for="variant in buttonVariants"
			:key="variant.value"
		>
			<UiKitDemo
				v-for="state in buttonStates"
				:key="state.value"
				:label="`${variant.label} / ${state.label}`"
			>
				<Button
					:variant="variant.value"
					:state="state.value"
				>
					Label
				</Button>
			</UiKitDemo>
		</UiKitRow>

		<UiKitRow>
			<UiKitDemo
				v-for="size in buttonSizes"
				:key="size.value"
				:label="`Size ${size.label}`"
			>
				<Button :size="size.value">
					Label
				</Button>
			</UiKitDemo>
		</UiKitRow>

		<UiKitRow>
			<UiKitDemo label="Icon left">
				<Button icon-left="plus">
					Label
				</Button>
			</UiKitDemo>

			<UiKitDemo label="Icon right">
				<Button icon-right="download">
					Label
				</Button>
			</UiKitDemo>

			<UiKitDemo label="Icons left and right">
				<Button
					icon-left="plus"
					icon-right="download"
				>
					Label
				</Button>
			</UiKitDemo>

			<UiKitDemo label="Icon only">
				<Button
					icon-left="plus"
					aria-label="Добавить"
				/>
			</UiKitDemo>
		</UiKitRow>
	</UiKitSection>
</template>
