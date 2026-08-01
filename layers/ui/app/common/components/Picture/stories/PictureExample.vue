<script setup lang="ts">
import Picture from '../Picture.vue'
import type { PictureSrcSetItem } from '../Picture.types.ts'

const srcSet: PictureSrcSetItem[] = [
	{ type: 'max' as const, width: 767, src: '/images/hero-mobile.jpg' },
	{ type: 'min' as const, width: 768, src: '/images/hero-desktop.jpg' },
]
</script>

<template>
	<Picture
		src="/images/hero-desktop.jpg"
		alt="Главный баннер"
		:src-set="srcSet"
		:image-options="{
			loading: 'eager',
			fetchPriority: 'high',
		}"
	/>
</template>
