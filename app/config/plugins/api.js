import { defineNuxtPlugin, useRequestHeaders, useRuntimeConfig } from '#imports';
export default defineNuxtPlugin(() => {
    const { API_URL } = useRuntimeConfig().public;
    return {
        provide: {
            api: $fetch.create({
                baseURL: API_URL ? `${API_URL.replace(/\/$/, '')}/api` : '/api',
                credentials: 'include',
                headers: useRequestHeaders(['cookie']),
            }),
        },
    };
});
