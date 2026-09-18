<script setup lang="ts">
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'

defineProps<{ isNext?: boolean }>()
</script>

<template>
	<button
		class="carousel-nav-button"
		:class="isNext ? '.carousel-nav-next' : '.carousel-nav-prev'"
		:aria-label="`${isNext ? 'Следующий' : 'Предыдущий'} слайд`"
	>
		<Icon :name="iconNames.plus" />
	</button>
</template>

<style scoped lang="scss">
.carousel-nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: var(--primary-hover);
  color: var(--on-primary);
  border-radius: 50px;
  transition: background-color 0.3s ease 0s, color 0.3s ease 0s, opacity 0.3s ease 0s;

  &:hover, &:focus-visible {
    background-color: 	rgba(23, 4, 13, 0.5);
  }
}
</style>
