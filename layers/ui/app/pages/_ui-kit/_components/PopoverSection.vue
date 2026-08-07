<script setup lang="ts">
import Button from '../../../common/components/Button/Button.vue'
import Popover from '../../../common/components/Popover/Popover.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitSection from './UiKitSection.vue'
</script>

<template>
	<UiKitSection title="Popover">
		<UiKitDemo>
			<Popover>
				<template #trigger>
					<Button text="Open popover" />
				</template>

				<template #content="{ close }">
					<p>Place arbitrary interactive content here.</p>
					<Button
						text="Close"
						@click="close"
					/>
				</template>
			</Popover>
		</UiKitDemo>
	</UiKitSection>
</template>
