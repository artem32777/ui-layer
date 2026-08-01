<script setup lang="ts">
import type { PictureProps } from './Picture.types'
import Img from '../Img/Img.vue'

defineProps<PictureProps>()
</script>

<template>
	<picture class="picture">
		<source
			v-for="item in srcSet"
			:key="item.width"
			:srcset="item.src"
			:media="`(${item.type}-width: ${item.width}px)`"
		>
		<Img
			v-bind="imageOptions"
			:src="src"
			:alt="alt"
		/>
	</picture>
</template>

<style scoped lang="scss">
.picture {
  width: 100%;
  height: 100%;
}
</style>
