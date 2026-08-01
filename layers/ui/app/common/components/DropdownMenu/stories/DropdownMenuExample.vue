<script setup lang="ts">
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import DropdownMenu, { type DropdownMenuItem } from '../DropdownMenu.vue'

const items: DropdownMenuItem[] = [
	{ label: 'Редактировать' },
	{
		label: 'Дополнительно',
		children: [
			{ label: 'Сохранить' },
			{ label: 'Создать копию' },
		],
	},
	{ label: 'Удалить' },
]
</script>

<template>
	<DropdownMenu :items="items">
		<template #trigger>
			<Button text="Открыть меню" />
		</template>
	</DropdownMenu>
</template>
