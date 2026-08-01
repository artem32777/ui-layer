<script setup lang="ts">
</script>

<template>
	<div
		img-fetch-priority="high"
		img-loading="eager"
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
