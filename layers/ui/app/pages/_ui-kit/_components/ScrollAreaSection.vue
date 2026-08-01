<script setup lang="ts">
import ScrollArea from '../../../common/components/ScrollArea/ScrollArea.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitSection from './UiKitSection.vue'
</script>

<template>
	<UiKitSection title="Scroll Area">
		<UiKitDemo label="Scrollable viewport">
			<ClientOnly>
				<ScrollArea>
					<p
						v-for="index in 18"
						:key="index"
						class="scroll-area-section__item"
					>
						Scrollable item {{ index }}
					</p>
				</ScrollArea>
			</ClientOnly>
		</UiKitDemo>
	</UiKitSection>
</template>

<style scoped lang="scss">
.scroll-area-section__item {
	margin: 0;
	padding: 8px 0;
	border-bottom: 1px solid var(--grey);
	color: var(--additional-2);
	font-size: 14px;
}
</style>
