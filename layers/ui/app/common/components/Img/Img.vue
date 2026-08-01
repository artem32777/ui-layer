<script setup lang="ts">
export interface ImgProps {
	/** URL изображения. */
	src: string
	/** Альтернативный текст для скринридеров и SEO. */
	alt: string
	/** Ширина изображения для резервирования места в layout. */
	width?: string | number
	/** Высота изображения для резервирования места в layout. */
	height?: string | number
	/** Режим загрузки изображения. */
	loading?: 'eager' | 'lazy'
	/** Приоритет загрузки для оптимизации LCP. */
	fetchPriority?: 'auto' | 'high' | 'low'
	/** Режим декодирования изображения. */
	decoding?: 'auto' | 'async' | 'sync'
}

withDefaults(defineProps<ImgProps>(), {
	loading: 'lazy',
})
</script>

<template>
	<img
		:src="src"
		:width="width"
		:height="height"
		:fetchpriority="fetchPriority"
		:decoding="decoding"
		:loading="loading"
		:alt="alt"
		class="img"
	>
</template>

<style scoped lang="scss">
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
