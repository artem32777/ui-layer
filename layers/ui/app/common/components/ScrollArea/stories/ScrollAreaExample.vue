<script setup lang="ts">
import ScrollArea from '../ScrollArea.vue'

withDefaults(defineProps<{
	count?: number
}>(), {
	count: 18,
})
</script>

<template>
	<div class="scroll-area-example">
		<ScrollArea>
			<p
				v-for="index in count"
				:key="index"
				class="scroll-area-example__item"
			>
				Scrollable item {{ index }}
			</p>
		</ScrollArea>
	</div>
</template>

<style scoped lang="scss">
.scroll-area-example {
  height: 200px;
}

.scroll-area-example__item {
  margin: 0;
  padding: 8px 0;
  border-bottom: 1px solid var(--grey);
  color: var(--additional-2);
  font-size: 14px;
}
</style>
