<script setup lang="ts">

import SliderNavButton from './SliderNavButton.vue'

const { xMargin = '40px' } = defineProps<{
	xMargin?: string
}>()
</script>

<template>
	<nav class="slider__nav">1
		<SliderNavButton />
		<SliderNavButton is-next />
	</nav>
</template>

<style scoped lang="scss">
.slider__nav {
  position: absolute;
  z-index: 114;
  top: 50%;
  right: v-bind(xMargin);
  left: v-bind(xMargin);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: translateY(-50%);
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.slider__nav-button {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--brand, #4149f2);
  color: var(--white, #ffffff);
  transition: background-color 0.3s ease;

  &:hover,
  &:focus-visible {
    background-color: var(--brand-dark, #292fba);
  }
}

.slider__nav-button :global(.ui-icon) {
  width: 20px;
  height: 20px;
}
</style>
