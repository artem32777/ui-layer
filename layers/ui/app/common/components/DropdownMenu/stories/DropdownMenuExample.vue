<script setup lang="ts">
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import DropdownMenu from '../DropdownMenu.vue'
import type { DropdownMenuItem } from '../DropdownMenu.types'
import { iconNames } from '#layers/ui/app/modules/svg-icon'

const items: DropdownMenuItem[] = [
	{ label: 'Редактировать', value: 'edit', variant: 'simple' },
	{
		label: 'Дополнительно',
		value: 'more',
		children: [
			{ label: 'Сохранить', value: 'save', selected: true },
			{ label: 'Создать копию', value: 'duplicate' },
		],
	},
	{ label: 'С уведомлением', value: 'notify', variant: 'switch', selected: true },
	{ label: 'Избранное', value: 'favorite', variant: 'icon', icon: iconNames['building-01'] },
	{ label: 'Удалить', value: 'delete', disabled: true },
]
</script>

<template>
	<DropdownMenu :items="items">
		<Button text="Открыть меню" />
	</DropdownMenu>
</template>
