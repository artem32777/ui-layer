<script setup lang="ts">
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import { iconNames } from '#layers/ui/app/modules/svg-icon'
import { CarouselNavClass } from '../Carousel.types.ts'

defineProps<{ isNext?: boolean }>()
</script>

<template>
	<Button
		class="carousel-nav-button"
		:class="isNext ? CarouselNavClass.nextEl : CarouselNavClass.prevEl"
		:aria-label="`${isNext ? 'Следующий' : 'Предыдущий'} слайд`"
		:icon-left="isNext ? iconNames.chevronRight : iconNames.chevronLeft"
	/>
</template>

<style scoped lang="scss">

</style>
