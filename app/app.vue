<script setup lang="ts">
import { onNuxtReady, useId } from '#imports'
import { ConfigProvider } from 'reka-ui'

onNuxtReady(() => document.documentElement.classList.add('app-ready'))
</script>

<template>
	<ConfigProvider :use-id="() => useId()">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</ConfigProvider>
</template>
