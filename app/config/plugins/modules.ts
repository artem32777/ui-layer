import { defineNuxtPlugin } from '#imports'
import { favoriteToast } from '~/modules/premises/components/add-to-favorite/toast/favoriteToast'

// Регистрируем плагины из modules
export default defineNuxtPlugin<{ toast: typeof favoriteToast }>(() => {
	void favoriteToast
})
