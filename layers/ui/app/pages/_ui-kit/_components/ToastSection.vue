<script setup lang="ts">
import Button from '../../../common/components/Button/Button.vue'
import Toast from '../../../common/components/Toast/Toast.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitSection from './UiKitSection.vue'
</script>

<template>
	<UiKitSection title="Toast">
		<UiKitDemo label="Bottom-right viewport">
			<Toast>
				<template #trigger="{ showToast }">
					<Button
						variant="outline"
						@click="showToast"
					>
						Show toast
					</Button>
				</template>
			</Toast>
		</UiKitDemo>
	</UiKitSection>
</template>
