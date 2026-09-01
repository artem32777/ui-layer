<script setup lang="ts">
import { iconNames } from '#layers/ui/app/modules/svg-icon'
import Select from '#layers/ui/app/common/components/Select/Select.vue'
import { ref } from 'vue'
import type { SelectOption } from '#layers/ui/app/common/components/Select/Select.types.ts'

const selectOptions: SelectOption[] = [
	{ label: '1111', value: '1111' },
	{ label: '2222', value: '2222' },
	{ label: '3333', value: '3333' },
	{
		label: 'Nested',
		value: 'nested',
		group: 'Вложенные',
		children: [
			{ label: 'Child simple', value: 'child-simple', variant: 'simple' },
			{ label: 'Child icon', value: 'child-icon', variant: 'icon', icon: iconNames['star-01'] },
			{ label: 'Child checkbox', value: 'child-checkbox', variant: 'checkbox' },
		],
	},
]

const selectOptions2: SelectOption[] = [
	{ label: '1111', value: '1111' },
	{ label: '2222', value: '2222' },
	{ label: '3333', value: '3333' },
	{ label: 'Simple', value: 'simple', description: 'Description', variant: 'simple' },
	{ label: 'Icon', value: 'icon', description: 'Description', variant: 'icon', icon: iconNames['building-01'] },
	{ label: 'Checkbox', value: 'checkbox', variant: 'checkbox', group: 'Контролы' },
	{ label: 'Radio', value: 'radio', variant: 'radio', group: 'Контролы' },
	{ label: 'Switch', value: 'switch', variant: 'switch', group: 'Контролы' },
	{ label: 'Disabled', value: 'disabled', variant: 'checkbox', disabled: true, group: 'Контролы' },
	{
		label: 'Nested',
		value: 'nested',
		group: 'Вложенные',
		children: [
			{ label: 'Child simple', value: 'child-simple', variant: 'simple' },
			{ label: 'Child icon', value: 'child-icon', variant: 'icon', icon: iconNames['star-01'] },
			{ label: 'Child checkbox', value: 'child-checkbox', variant: 'checkbox' },
		],
	},
]

const selectValue = ref('')
const selectValueMultiple = ref<string[]>([])
</script>

<template>
	<div style="width: 300px">
		<Select
			v-model="selectValue"
			placeholder="один выбор"
			:options="selectOptions"
		/>
		<Select
			v-model="selectValueMultiple"
			placeholder="несколько"
			:options="selectOptions2"
			:multiple="true"
		/>
	</div>
</template>

<style scoped lang="scss">

</style>
