<script setup lang="ts">
import { useFavoriteStore } from '../../stores/favoriteStore'
import Icon from '#layers/ui/app/modules/svg-icon/components/Icon.vue'

const {
	variant = 'primary',
} = defineProps<{
	id: string | number
	variant?: 'primary' | 'secondary'
}>()

const store = useFavoriteStore()
</script>

<template>
	<button
		class="favorite-button"
		:class="`favorite-button_${variant}`"
		@click="store.favoriteSet.add(String(id))"
	>
		<slot>
			<Icon
				name="plus"
				class="favorite-button__icon"
			/>
		</slot>
	</button>
</template>

<style scoped lang="scss">
.favorite-button {

}

.favorite-button__icon {

}
</style>
