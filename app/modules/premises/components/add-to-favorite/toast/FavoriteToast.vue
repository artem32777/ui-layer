<script setup lang="ts">
import { Icon } from '#layers/ui/app/modules/svg-icon'
import type { FavoriteAction } from './favoriteToast.ts'

defineProps<{
	action: FavoriteAction
}>()
</script>

<template>
	<div class="favorite-toast">
		<Icon
			name="plus"
			size="20"
			class="favorite-toast__icon"
		/>
		<span class="favorite-toast__text">
			{{ action === 'add' ? 'Добавлено в избранное' : 'Удалено из избранного' }}
		</span>
	</div>
</template>

<style scoped lang="scss">
.favorite-toast {
	display: flex;
	align-items: center;
	gap: 10px;
	width: 100%;
	padding: 12px 16px;
	border-radius: 8px;
	color: #ffffff;
	background-color: #000000;
	box-shadow: 0 8px 24px rgb(0 0 0 / 20%);
}

.favorite-toast__icon {
	color: #ffffff;
}

.favorite-toast__text {
}
</style>
