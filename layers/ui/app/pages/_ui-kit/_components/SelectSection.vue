<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vee-validate'
import Select from '../../../common/components/Select/Select.vue'
import FormSelect from '../../../common/components/Form/FormSelect.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitRow from './UiKitRow.vue'
import UiKitSection from './UiKitSection.vue'

const selectValue = ref('apple')
const disabledSelectValue = ref('banana')
const selectOptions = [
	{ label: 'Apple', value: 'apple', group: 'Fruits' },
	{ label: 'Banana', value: 'banana', group: 'Fruits' },
	{ label: 'Blueberry', value: 'blueberry', group: 'Fruits' },
	{ label: 'Carrot', value: 'carrot', group: 'Vegetables' },
	{ label: 'Potato', value: 'potato', group: 'Vegetables', disabled: true },
]
</script>

<template>
	<UiKitSection title="Select">
		<UiKitRow>
			<UiKitDemo label="Selected">
				<ClientOnly>
					<Select
						v-model="selectValue"
						:options="selectOptions"
						placeholder="Select a food..."
					/>
				</ClientOnly>
			</UiKitDemo>
			<UiKitDemo label="Placeholder">
				<ClientOnly>
					<Select
						:options="selectOptions"
						placeholder="With placeholder..."
					/>
				</ClientOnly>
			</UiKitDemo>
			<UiKitDemo label="Disabled">
				<ClientOnly>
					<Select
						v-model="disabledSelectValue"
						:options="selectOptions"
						placeholder="Disabled select..."
						disabled
					/>
				</ClientOnly>
			</UiKitDemo>
			<UiKitDemo label="Mistake">
				<Form :initial-errors="{ selectMistake: 'Выберите значение' }">
					<FormSelect
						name="selectMistake"
						:select-props="{
							options: selectOptions,
							placeholder: 'Select a food...',
						}"
					/>
				</Form>
			</UiKitDemo>
		</UiKitRow>
	</UiKitSection>
</template>
