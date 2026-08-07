<script setup lang="ts">
import ContextMenu from '../ContextMenu.vue'
import type { ContextMenuItem } from '../ContextMenu.types'

const items: ContextMenuItem[] = [
	{ label: 'Редактировать', onClick: () => console.log('Редактировать') },
	{ label: 'Создать копию', onClick: () => console.log('Создать копию') },
	{
		label: 'Дополнительно',
		children: [
			{ label: 'Сохранить', onClick: () => console.log('Сохранить') },
			{ label: 'Скачать', onClick: () => console.log('Скачать') },
		],
	},
	{ label: 'Удалить', disabled: true, onClick: () => console.log('Удалить') },
]
</script>

<template>
	<ContextMenu :items="items">
		<div class="context-menu-example__target">
			Нажмите правой кнопкой мыши
		</div>
	</ContextMenu>
</template>
