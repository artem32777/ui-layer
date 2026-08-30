<script setup lang="ts">
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'

defineProps<{
	errorMessage?: string
}>()
</script>

<template>
	<span
		v-if="errorMessage"
		class="v-error"
	>
		<Icon :name="iconNames['alert-circle']" />
		{{ errorMessage }}
	</span>
</template>

<style scoped lang="scss">
.v-error {
  @include font-size(p2);
	color: var(--text-on-surface-error);
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
