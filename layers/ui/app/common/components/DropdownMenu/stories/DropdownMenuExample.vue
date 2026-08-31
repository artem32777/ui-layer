<script setup lang="ts">
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import DropdownMenu from '../DropdownMenu.vue'
import type { DropdownMenuItem } from '../DropdownMenu.types'
import { iconNames } from '#layers/ui/app/modules/svg-icon'

const items: DropdownMenuItem[] = [
	{ label: 'Редактировать', variant: 'simple' },
	{
		label: 'Дополнительно',
		children: [
			{ label: 'Сохранить', selected: true },
			{ label: 'Создать копию' },
		],
	},
	{ label: 'С уведомлением', variant: 'switch', selected: true },
	{ label: 'Избранное', variant: 'icon', icon: iconNames['building-01'] },
	{ label: 'Удалить', disabled: true },
]
</script>

<template>
	<DropdownMenu :items="items">
		<Button text="Открыть меню" />
	</DropdownMenu>
</template>
