import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useNuxtApp } from '#imports'

export const useFavoriteStore = defineStore('favorite', () => {
	const favoriteSet = ref(new Set<string>())

	const { $toast } = useNuxtApp()

	function addToFavorite(id: string | number) {
		favoriteSet.value.add(String(id))
		$toast.favorite('add')
	}

	function removeFromFavorite(id: string | number) {
		favoriteSet.value.delete(String(id))
		$toast.favorite('remove')
	}

	return {
		favoriteSet,
		addToFavorite,
		removeFromFavorite,
	}
})
