<script setup lang="ts">
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import Tabs from '#layers/ui/app/common/components/Tabs/Tabs.vue'
import Tooltip from '#layers/ui/app/common/components/Tooltip/Tooltip.vue'
import { useFavoriteStore } from '~/modules/premises'
import ThemeSwitcher from '#layers/ui/app/common/components/ThemeSwitcher/ThemeSwitcher.vue'
import Select from '#layers/ui/app/common/components/Select/Select.vue'
import type { SelectOption } from '#layers/ui/app/common/components/Select/Select.types.ts'
import { ref } from 'vue'

const selectOptions = [
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
] as unknown as SelectOption[]

const selectValue = ref('')
const selectValueMultiple = ref<string[]>([])
</script>

<template>
	<div>
		<Select
			v-model="selectValue"
			placeholder="один выбор"
			:options="selectOptions"
		/>
		<Select
			v-model="selectValueMultiple"
			placeholder="несколько"
			:options="selectOptions"
			multiple
		/>
	</div>
</template>

<style scoped lang="scss">

</style>
