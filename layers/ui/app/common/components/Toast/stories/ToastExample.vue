<script setup lang="ts">
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import Toast from '../Toast.vue'
</script>

<template>
	<Toast>
		<template #trigger="{ showToast }">
			<Button
				variant="outline"
				@click="showToast"
			>
				Показать уведомление
			</Button>
		</template>
	</Toast>
</template>
