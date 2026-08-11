<script setup lang="ts">
import { ref } from 'vue'
import ToggleGroup from '../ToggleGroup.vue'
import type { ToggleGroupItemType } from '#layers/ui/app/common/components/ToggleGroup/ToggleGroup.types.ts'

const alignment = ref('center')

const items: ToggleGroupItemType[] = [
	{ label: 'L', value: 'left' },
	{ label: 'C', value: 'center' },
	{ label: 'R', value: 'right' },
]
</script>

<template>
	<ToggleGroup
		v-model="alignment"
		:items="items"
	/>
</template>
