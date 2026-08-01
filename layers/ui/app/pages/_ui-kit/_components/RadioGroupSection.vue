<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vee-validate'
import RadioGroup from '../../../common/components/RadioGroup/RadioGroup.vue'
import FormRadioGroup from '../../../common/components/Form/FormRadioGroup.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitRow from './UiKitRow.vue'
import UiKitSection from './UiKitSection.vue'

const radioValue = ref('true')
const radioOptions = [
	{ label: 'False', value: 'false' },
	{ label: 'True', value: 'true' },
	{ label: 'Disabled', value: 'disabled', disabled: true },
]
</script>

<template>
	<UiKitSection title="Radio">
		<UiKitRow>
			<UiKitDemo label="False / True">
				<RadioGroup
					v-model="radioValue"
					:options="radioOptions"
				/>
			</UiKitDemo>
			<UiKitDemo label="Mistake">
				<Form :initial-errors="{ radioMistake: 'Выберите вариант' }">
					<FormRadioGroup
						name="radioMistake"
						:radio-group-props="{ options: radioOptions }"
					/>
				</Form>
			</UiKitDemo>
		</UiKitRow>
	</UiKitSection>
</template>
