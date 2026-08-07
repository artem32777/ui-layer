<script setup lang="ts">
import { ref } from 'vue'
import ColorArea from '../../../common/components/Color/ColorArea/ColorArea.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitRow from './UiKitRow.vue'
import UiKitSection from './UiKitSection.vue'

const color = ref('#56d799')
const disabledColor = ref('#56d799')
</script>

<template>
	<UiKitSection title="Color Area">
		<UiKitRow>
			<UiKitDemo label="Default">
				<ColorArea v-model="color" />
			</UiKitDemo>
			<UiKitDemo label="Disabled">
				<ColorArea
					v-model="disabledColor"
					disabled
				/>
			</UiKitDemo>
		</UiKitRow>
	</UiKitSection>
</template>
