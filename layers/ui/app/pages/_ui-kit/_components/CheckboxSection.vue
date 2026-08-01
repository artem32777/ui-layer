<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vee-validate'
import Checkbox from '../../../common/components/Checkbox/Checkbox.vue'
import FormCheckbox from '../../../common/components/Form/FormCheckbox.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitRow from './UiKitRow.vue'
import UiKitSection from './UiKitSection.vue'

const checkboxChecked = ref<boolean | 'indeterminate'>(true)
const checkboxUnchecked = ref<boolean | 'indeterminate'>(false)
const checkboxIndeterminate = ref<boolean | 'indeterminate'>('indeterminate')
</script>

<template>
	<UiKitSection title="Checkbox">
		<UiKitRow>
			<UiKitDemo label="False">
				<Checkbox
					v-model="checkboxUnchecked"
				>
					False
				</Checkbox>
			</UiKitDemo>

			<UiKitDemo label="True">
				<Checkbox
					v-model="checkboxChecked"
				>
					True
				</Checkbox>
			</UiKitDemo>

			<UiKitDemo label="Indeterminate">
				<Checkbox
					v-model="checkboxIndeterminate"
				>
					Indeterminate
				</Checkbox>
			</UiKitDemo>

			<UiKitDemo label="Disabled">
				<Checkbox
					disabled
				>
					Disabled
				</Checkbox>
			</UiKitDemo>

			<UiKitDemo label="Mistake">
				<Form :initial-errors="{ checkboxMistake: 'Подтвердите выбор' }">
					<FormCheckbox
						name="checkboxMistake"
					>
						Required
					</FormCheckbox>
				</Form>
			</UiKitDemo>
		</UiKitRow>
	</UiKitSection>
</template>
