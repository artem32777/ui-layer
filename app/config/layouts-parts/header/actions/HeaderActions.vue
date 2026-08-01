<script setup lang="ts">
import HeaderActionsFavorites from './HeaderActionsFavorites.vue'
import HeaderActionsPhone from './HeaderActionsPhone.vue'
import HeaderActionsCallback from './HeaderActionsCallback.vue'
</script>

<template>
	<div class="header-actions">
		<HeaderActionsPhone />
		<HeaderActionsCallback />
		<HeaderActionsFavorites />
	</div>
</template>

<style scoped lang="scss">
.header-actions {
  position: relative;
  z-index: 31;
  display: flex;
  align-items: center;
  gap: 32px;
  flex: 0 0 auto;

  @media (max-width: $lg) {
    gap: 12px;
    margin-right: 0;
  }
}
</style>
