<script setup lang="ts">
import CarouselNavButton from './CarouselNavButton.vue'

const { xMargin = '40px' } = defineProps<{
	xMargin?: string
}>()
</script>

<template>
	<nav class="carousel-nav">
		<CarouselNavButton
			class="carousel-nav__button"
		/>
		<CarouselNavButton
			is-next
			class="carousel-nav__button"
		/>
	</nav>
</template>

<style scoped lang="scss">
.carousel-nav {
  position: absolute;
  z-index: 2;
  top: 50%;
  width: calc(100% - (v-bind(xMargin)* 2));
  left: v-bind(xMargin);
  right:v-bind(xMargin);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: translateY(-50%);
  pointer-events: none;
}

.carousel-nav__button {
  pointer-events: auto;
  opacity: 0;

  &:not(.swiper-button-disabled) {
    opacity: 1;
  }
}
</style>
