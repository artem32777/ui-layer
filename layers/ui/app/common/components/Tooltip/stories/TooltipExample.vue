<script setup lang="ts">
import Tooltip from '../Tooltip.vue'
</script>

<template>
	<Tooltip text="Удалить элемент">
		<template #trigger>
			<button type="button">
				Удалить
			</button>
		</template>
	</Tooltip>
</template>
