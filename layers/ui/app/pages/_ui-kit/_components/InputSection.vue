<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vee-validate'
import Input from '../../../common/components/Input/Input.vue'
import FormInput from '../../../common/components/Form/FormInput.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitRow from './UiKitRow.vue'
import UiKitSection from './UiKitSection.vue'

const inputValue = ref('Reka UI')
const inputSizes = [
	{ label: 'Small', value: 'sm' },
	{ label: 'Medium', value: 'md' },
	{ label: 'Large', value: 'lg' },
] as const
const inputVariants = [
	{ label: 'Base', value: 'base' },
	{ label: 'Secondary', value: 'secondary' },
] as const
</script>

<template>
	<UiKitSection title="Input">
		<UiKitRow>
			<UiKitDemo label="Filled">
				<Input
					v-model="inputValue"
					aria-label="Name"
					placeholder="Name"
				/>
			</UiKitDemo>
			<UiKitDemo label="Placeholder">
				<Input
					aria-label="Placeholder"
					placeholder="Placeholder"
				/>
			</UiKitDemo>
			<UiKitDemo label="Disabled">
				<Input
					aria-label="Disabled"
					placeholder="Disabled"
					disabled
				/>
			</UiKitDemo>
			<UiKitDemo label="Mistake">
				<Form :initial-errors="{ inputMistake: 'Введите значение' }">
					<FormInput
						name="inputMistake"
						:input-props="{ placeholder: 'Value' }"
					/>
				</Form>
			</UiKitDemo>
		</UiKitRow>
		<UiKitRow>
			<UiKitDemo
				v-for="size in inputSizes"
				:key="size.value"
				:label="size.label"
			>
				<Input
					:aria-label="size.label"
					:size="size.value"
					:placeholder="size.label"
				/>
			</UiKitDemo>
			<UiKitDemo
				v-for="variant in inputVariants"
				:key="variant.value"
				:label="variant.label"
			>
				<Input
					:aria-label="variant.label"
					:variant="variant.value"
					:placeholder="variant.label"
				/>
			</UiKitDemo>
		</UiKitRow>
	</UiKitSection>
</template>
