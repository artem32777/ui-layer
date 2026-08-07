<script setup lang="ts">
import Tabs from '../Tabs.vue'
import type { TabsTitle } from '#layers/ui/app/common/components/Tabs/Tabs.types.ts'

const items = [
	{ value: 'account', label: 'Аккаунт' },
	{ value: 'password', label: 'Пароль' },
] as const satisfies TabsTitle[]
</script>

<template>
	<Tabs
		aria-label="Manage account"
		:items="items"
	>
		<template #account>
			Make changes to your account here.
		</template>

		<template #password>
			Change your password here.
		</template>
	</Tabs>
</template>
