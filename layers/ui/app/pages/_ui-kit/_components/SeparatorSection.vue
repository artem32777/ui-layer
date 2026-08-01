<script setup lang="ts">
import Separator from '../../../common/components/Separator/Separator.vue'
import UiKitSection from './UiKitSection.vue'
</script>

<template>
	<UiKitSection title="Separator">
		<div class="separator-section__demo">
			<span>Blog</span>
			<Separator orientation="vertical" />
			<span>Docs</span>
			<Separator orientation="vertical" />
			<span>Source</span>
		</div>
		<Separator />
	</UiKitSection>
</template>

<style scoped lang="scss">
.separator-section__demo {
	display: flex;
	align-items: center;
	gap: 12px;
	color: var(--additional-2);
}
</style>
