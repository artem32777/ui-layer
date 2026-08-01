import { defineNuxtRouteMiddleware } from '#imports'
import { navigateTo } from '~/common/utils/router'
import { useAuthStore } from '#layers/admin/app/modules/auth/stores/authStore'

const protectedPaths = ['/admin']
const guestPaths = [
	'/auth/login',
	'/auth/register',
	'/auth/password-recovery',
]

export default defineNuxtRouteMiddleware(async (to) => {
	const isProtected = protectedPaths.some(
		path => to.path === path || to.path.startsWith(`${path}/`),
	)
	const isGuest = guestPaths.includes(to.path)

	if (!isProtected && !isGuest) {
		return
	}

	const authStore = useAuthStore()

	await authStore.fetchUser()

	if (isProtected && !authStore.isAuthenticated) {
		return navigateTo({
			path: '/auth/login',
			query: { redirect: to.fullPath },
		})
	}

	if (isGuest && authStore.isAuthenticated) {
		return navigateTo('/')
	}
})
