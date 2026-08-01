<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vee-validate'
import Select from '../../../common/components/Select/Select.vue'
import FormSelect from '../../../common/components/Form/FormSelect.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitRow from './UiKitRow.vue'
import UiKitSection from './UiKitSection.vue'

const selectedValues = ref(['apple', 'blueberry'])
const emptyValues = ref<string[]>([])
const disabledValues = ref(['banana'])
const options = [
	{ label: 'Apple', value: 'apple', group: 'Fruits' },
	{ label: 'Banana', value: 'banana', group: 'Fruits' },
	{ label: 'Blueberry', value: 'blueberry', group: 'Fruits' },
	{ label: 'Carrot', value: 'carrot', group: 'Vegetables' },
	{ label: 'Potato', value: 'potato', group: 'Vegetables', disabled: true },
]
</script>

<template>
	<UiKitSection title="Multi Select">
		<UiKitRow>
			<UiKitDemo label="Selected">
				<ClientOnly>
					<Select
						v-model="selectedValues"
						:options="options"
						:multiple="true"
					/>
				</ClientOnly>
			</UiKitDemo>
			<UiKitDemo label="Placeholder">
				<ClientOnly>
					<Select
						v-model="emptyValues"
						:options="options"
						placeholder="Select foods..."
						:multiple="true"
					/>
				</ClientOnly>
			</UiKitDemo>
			<UiKitDemo label="Disabled">
				<ClientOnly>
					<Select
						v-model="disabledValues"
						:options="options"
						:multiple="true"
						disabled
					/>
				</ClientOnly>
			</UiKitDemo>
			<UiKitDemo label="Mistake">
				<Form :initial-errors="{ multiSelectMistake: 'Выберите хотя бы одно значение' }">
					<FormSelect
						name="multiSelectMistake"
						:select-props="{
							options,
							placeholder: 'Select foods...',
							multiple: true,
						}"
					/>
				</Form>
			</UiKitDemo>
		</UiKitRow>
	</UiKitSection>
</template>
