import { toast as vueSonnerToast } from 'vue-sonner'
import { markRaw } from 'vue'
import FavoriteToast from './FavoriteToast.vue'

export type FavoriteAction = 'add' | 'remove'

export const favoriteToast = Object.assign(vueSonnerToast, {
	favorite(action: FavoriteAction) {
		return vueSonnerToast.custom(markRaw(FavoriteToast), {
			componentProps: { action },
			position: 'bottom-center',
		})
	},
})
