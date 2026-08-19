<script setup lang="ts">
import CarouselNavButton from './CarouselNavButton.vue'

const { xMargin = '40px' } = defineProps<{
	xMargin?: string
}>()
</script>

<template>
	<nav class="carousel-nav">
		<CarouselNavButton class="carousel-nav__button" />
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
  width: 100%;
  //right: v-bind(xMargin);
  //left: v-bind(xMargin);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: translateY(-50%);
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.carousel-nav__button {
  pointer-events: auto;
  //display: flex;
  //align-items: center;
  //justify-content: center;
  //width: 48px;
  //height: 48px;
  //border-radius: 50%;
  //background-color: var(--brand, #4149f2);
  //color: var(--white, #ffffff);
  //transition: background-color 0.3s ease;

  &:hover,
  &:focus-visible {
    background-color: var(--brand-dark, #292fba);
  }
}
</style>
