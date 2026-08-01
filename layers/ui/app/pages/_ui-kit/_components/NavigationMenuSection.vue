<script setup lang="ts">
import NavigationMenu from '../../../common/components/NavigationMenu/NavigationMenu.vue'
import type { NavigationMenuItem } from '../../../common/components/NavigationMenu/NavigationMenu.types.ts'
import UiKitDemo from './UiKitDemo.vue'
import UiKitSection from './UiKitSection.vue'

const items: NavigationMenuItem[] = [
	{
		id: 'components',
		label: 'Компоненты',
		children: [
			{
				id: 'forms',
				label: 'Формы',
				href: '/_ui-kit#form',
			},
			{
				id: 'navigation',
				label: 'Навигация',
				children: [
					{
						id: 'menus',
						label: 'Меню',
						href: '/_ui-kit#navigation',
					},
					{
						id: 'tabs',
						label: 'Табы',
						href: '/_ui-kit#tabs',
					},
				],
			},
			{
				id: 'feedback',
				label: 'Обратная связь',
				width: 260,
				children: [
					{
						id: 'dialogs',
						label: 'Диалоги и модальные окна',
						href: '/_ui-kit#dialogs',
					},
					{
						id: 'notifications',
						label: 'Уведомления',
						href: '/_ui-kit#notifications',
					},
				],
			},
		],
	},
	{
		id: 'guidelines',
		label: 'Рекомендации',
		children: [
			{
				id: 'getting-started',
				label: 'Начало работы',
				href: '/_ui-kit#getting-started',
			},
		],
	},
	{
		id: 'repository',
		label: 'Репозиторий',
		href: 'https://github.com/',
		target: '_blank',
		rel: 'noreferrer',
	},
]
</script>

<template>
	<UiKitSection
		title="Navigation Menu"
		navigation
	>
		<UiKitDemo label="Menu with nested panels">
			<ClientOnly>
				<NavigationMenu :items="items" />
			</ClientOnly>
		</UiKitDemo>
	</UiKitSection>
</template>
