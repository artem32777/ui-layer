<script setup lang="ts">
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import DropdownMenu from '../DropdownMenu.vue'
import type { DropdownMenuItem } from '../DropdownMenu.types'

const items: DropdownMenuItem[] = [
	{ label: 'Редактировать', onClick: () => console.log('Редактировать') },
	{
		label: 'Дополнительно',
		children: [
			{ label: 'Сохранить', onClick: () => console.log('Сохранить') },
			{ label: 'Создать копию', onClick: () => console.log('Создать копию') },
		],
	},
	{ label: 'Удалить', onClick: () => console.log('Удалить') },
]
</script>

<template>
	<DropdownMenu :items="items">
		<Button text="Открыть меню" />
	</DropdownMenu>
</template>
