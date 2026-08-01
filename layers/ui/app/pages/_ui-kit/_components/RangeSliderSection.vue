<script setup lang="ts">
import { ref } from 'vue'
import MultiRangeSlider from '../../../common/components/RangeSlider/MultiRangeSlider.vue'
import RangeSlider from '../../../common/components/RangeSlider/RangeSlider.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitRow from './UiKitRow.vue'
import UiKitSection from './UiKitSection.vue'

const lineDoubleDefault = ref([0, 100])
const lineDoubleTouched = ref([25, 65])
const blockDoubleDefault = ref([0, 100])
const blockDoubleTouched = ref([25, 65])
const lineOneRangeDefault = ref([0])
const lineOneRangeTouched = ref([37])
const multiRangeValues = ref([10, 30, 60, 90])
const disabledMultiRangeValues = ref([15, 35, 55, 75])
</script>

<template>
	<UiKitSection title="Range Slider">
		<UiKitRow>
			<UiKitDemo label="Line / Double / Default">
				<RangeSlider
					v-model="lineDoubleDefault"
					variant="line"
					state="default"
					type="double"
				/>
			</UiKitDemo>

			<UiKitDemo label="Line / Double / Touched">
				<RangeSlider
					v-model="lineDoubleTouched"
					variant="line"
					state="touched"
					type="double"
				/>
			</UiKitDemo>
		</UiKitRow>

		<UiKitRow>
			<UiKitDemo label="Block / Double / Default">
				<RangeSlider
					v-model="blockDoubleDefault"
					variant="block"
					state="default"
					type="double"
				/>
			</UiKitDemo>

			<UiKitDemo label="Block / Double / Touched">
				<RangeSlider
					v-model="blockDoubleTouched"
					variant="block"
					state="touched"
					type="double"
				/>
			</UiKitDemo>
		</UiKitRow>

		<UiKitRow>
			<UiKitDemo label="Line / One Range / Default">
				<RangeSlider
					v-model="lineOneRangeDefault"
					variant="line"
					state="default"
					type="one-range"
				/>
			</UiKitDemo>

			<UiKitDemo label="Line / One Range / Touched">
				<RangeSlider
					v-model="lineOneRangeTouched"
					variant="line"
					state="touched"
					type="one-range"
				/>
			</UiKitDemo>
		</UiKitRow>

		<UiKitRow>
			<UiKitDemo label="Multi / Two ranges">
				<MultiRangeSlider
					v-model="multiRangeValues"
					:step="5"
				/>
			</UiKitDemo>
			<UiKitDemo label="Multi / Disabled">
				<MultiRangeSlider
					v-model="disabledMultiRangeValues"
					disabled
				/>
			</UiKitDemo>
		</UiKitRow>
	</UiKitSection>
</template>
