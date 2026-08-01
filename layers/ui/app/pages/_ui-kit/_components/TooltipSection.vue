<script setup lang="ts">
import Button from '../../../common/components/Button/Button.vue'
import Tooltip from '../../../common/components/Tooltip/Tooltip.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitSection from './UiKitSection.vue'
</script>

<template>
	<UiKitSection title="Tooltip">
		<UiKitDemo label="Hover / focus">
			<Tooltip text="Add to library">
				<template #trigger>
					<Button variant="outline">
						Hover or focus
					</Button>
				</template>
			</Tooltip>
		</UiKitDemo>
	</UiKitSection>
</template>
