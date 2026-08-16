<script setup lang="ts">
import { Icon } from '#layers/ui/app/modules/svg-icon'
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import Tabs from '#layers/ui/app/common/components/Tabs/Tabs.vue'
import Tooltip from '#layers/ui/app/common/components/Tooltip/Tooltip.vue'
import { useFavoriteStore } from '~/modules/premises'

const favoriteStore = useFavoriteStore()

const tabItems = [
	{ value: 'account', label: 'Account test' },
	{ value: 'password', label: 'Password' },
] as const
</script>

<template>
	<div>
		<Icon name="download" />

		<Button @click="favoriteStore.addToFavorite('toast-example')">
			Добавить в избранное
		</Button>

		<Button @click="favoriteStore.removeFromFavorite('toast-example')">
			Удалить из избранного
		</Button>

		<Tabs :items="tabItems">
			<template #account>
				dsds
			</template>
		</Tabs>

		<Tooltip text="dsdss">
			323232
		</Tooltip>
	</div>
</template>

<style scoped lang="scss">
.test {
  @include font-size(h2);
}
</style>
