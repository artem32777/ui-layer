import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoriteStore = defineStore('favorite', () => {
	const favoriteSet = ref(new Set<string>())

	return {
		favoriteSet,
	}
})
