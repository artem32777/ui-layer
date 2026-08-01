<script setup lang="ts">
import ScrollArea from '../ScrollArea.vue'
</script>

<template>
	<ScrollArea>
		<p
			v-for="index in 18"
			:key="index"
		>
			Scrollable item {{ index }}
		</p>
	</ScrollArea>
</template>
