<script setup lang="ts">
import { ref } from 'vue'
import Switch from '../../../common/components/Switch/Switch.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitRow from './UiKitRow.vue'
import UiKitSection from './UiKitSection.vue'

const switchTrue = ref(true)
const switchFalse = ref(false)
</script>

<template>
	<UiKitSection title="Switch">
		<UiKitRow>
			<UiKitDemo label="False">
				<Switch v-model="switchFalse" />
			</UiKitDemo>

			<UiKitDemo label="True">
				<Switch v-model="switchTrue" />
			</UiKitDemo>

			<UiKitDemo label="Disabled">
				<Switch disabled />
			</UiKitDemo>
		</UiKitRow>
	</UiKitSection>
</template>
