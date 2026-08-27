<script setup lang="ts">
defineProps<{
	label?: string
}>()
</script>

<template>
	<label
		v-if="label"
		class="field-label"
	>
		<span class="field-label__text">
			{{ label }}
		</span>

		<slot />
	</label>
	<slot v-else />
</template>

<style scoped lang="scss">
.field-label {
  display: grid;
  gap: 8px;
}

.field-label__text {
  @include font-size(label);
  color: var(--text-on-surface-tertiary);
  justify-self: start;
}
</style>
