<script setup lang="ts">
import { onNuxtReady, useId } from '#imports'
import { ConfigProvider } from 'reka-ui'
import Toast from '#layers/ui/app/common/components/Toast/Toast.vue'

onNuxtReady(() => document.documentElement.classList.add('app-ready'))
</script>

<template>
	<ConfigProvider :use-id="() => useId()">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
		<Toast />
	</ConfigProvider>
</template>
