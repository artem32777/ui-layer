<script setup lang="ts">
import Img from '#layers/ui/app/common/components/Img/Img.vue'

defineProps<{
	src: string
}>()
</script>

<template>
	<Img
		:src="src"
		fetch-priority="high"
		loading="eager"
		alt="Логотип"
		class="header-logo"
	/>
</template>

<style scoped lang="scss">
.header-logo {
  display: flex;
  flex: 0 0 72px;
  width: 72px;
  height: 72px;

  @media (max-width: $lg) {
    flex-basis: 60px;
    width: 60px;
    height: 60px;
  }

  @media (max-width: $sm) {
    flex-basis: 56px;
    width: 56px;
    height: 56px;
  }
}
</style>
