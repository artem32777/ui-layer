<script setup lang="ts">
import { ref } from 'vue'
import Textarea from '../../../common/components/Textarea/Textarea.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitRow from './UiKitRow.vue'
import UiKitSection from './UiKitSection.vue'

const textareaValue = ref('Value')
</script>

<template>
	<UiKitSection title="Textarea">
		<UiKitRow>
			<UiKitDemo label="Default">
				<Textarea
					aria-label="Default textarea"
					placeholder="Placeholder"
				/>
			</UiKitDemo>
			<UiKitDemo label="Texted">
				<Textarea
					v-model="textareaValue"
					aria-label="Texted textarea"
				/>
			</UiKitDemo>
			<UiKitDemo label="Disabled">
				<Textarea
					model-value="Value"
					aria-label="Disabled textarea"
					disabled
				/>
			</UiKitDemo>
		</UiKitRow>
	</UiKitSection>
</template>
