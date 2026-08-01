<script setup lang="ts">
import { ref } from 'vue'
import Toggle from '../../../common/components/Toggle/Toggle.vue'
import ToggleGroup from '../../../common/components/ToggleGroup/ToggleGroup.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitRow from './UiKitRow.vue'
import UiKitSection from './UiKitSection.vue'

const togglePressed = ref(false)
const toggleGroupValue = ref('center')
const toggleGroupMultiple = ref(['bold'])
const toggleSizes = [
	{ label: 'Small', value: 'sm' },
	{ label: 'Large', value: 'lg' },
] as const
const toggleOptions = [
	{ label: 'L', value: 'left' },
	{ label: 'C', value: 'center' },
	{ label: 'R', value: 'right' },
]
const formatOptions = [
	{ label: 'B', value: 'bold' },
	{ label: 'I', value: 'italic' },
	{ label: 'U', value: 'underline' },
]
</script>

<template>
	<UiKitSection title="Toggle / Toggle Group">
		<UiKitRow>
			<UiKitDemo label="Base">
				<Toggle v-model="togglePressed">
					B
				</Toggle>
			</UiKitDemo>
			<UiKitDemo label="Outline">
				<Toggle
					v-model="togglePressed"
					variant="outline"
				>
					B
				</Toggle>
			</UiKitDemo>
			<UiKitDemo
				v-for="size in toggleSizes"
				:key="size.value"
				:label="size.label"
			>
				<Toggle
					v-model="togglePressed"
					:size="size.value"
				>
					B
				</Toggle>
			</UiKitDemo>
			<UiKitDemo label="Single group">
				<ToggleGroup
					v-model="toggleGroupValue"
					:options="toggleOptions"
				/>
			</UiKitDemo>
			<UiKitDemo label="Multiple group">
				<ToggleGroup
					v-model="toggleGroupMultiple"
					:options="formatOptions"
					type="multiple"
				/>
			</UiKitDemo>
		</UiKitRow>
	</UiKitSection>
</template>
