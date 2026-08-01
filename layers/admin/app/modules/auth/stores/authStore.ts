import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { FetchError } from 'ofetch'
import { useNuxtApp } from '#imports'

export interface AuthUser {
	id: number | string
	name: string
	email: string
}

type AuthStatus = 'unknown' | 'authenticated' | 'guest'

export const useAuthStore = defineStore('auth', () => {
	const user = ref<AuthUser | null>(null)
	const status = ref<AuthStatus>('unknown')
	const isAuthenticated = computed(() => status.value === 'authenticated')
	let userRequest: Promise<AuthUser | null> | null = null

	const setUser = (value: AuthUser) => {
		user.value = value
		status.value = 'authenticated'
	}

	const clearUser = () => {
		user.value = null
		status.value = 'guest'
	}

	const fetchUser = async (force = false) => {
		if (userRequest) {
			return userRequest
		}

		if (!force && status.value !== 'unknown') {
			return user.value
		}

		userRequest = useNuxtApp().$api<AuthUser>('/auth/me')
			.then((value) => {
				setUser(value)
				return value
			})
			.catch((error) => {
				if (error instanceof FetchError && error.response?.status === 401) {
					clearUser()
					return null
				}

				throw error
			})
			.finally(() => {
				userRequest = null
			})

		return userRequest
	}

	return {
		user,
		status,
		isAuthenticated,
		setUser,
		clearUser,
		fetchUser,
	}
})
