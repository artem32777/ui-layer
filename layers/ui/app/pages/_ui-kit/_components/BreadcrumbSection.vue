<script setup lang="ts">
import Breadcrumb from '../../../common/components/Breadcrumb/Breadcrumb.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitRow from './UiKitRow.vue'
import UiKitSection from './UiKitSection.vue'

const breadcrumbItems = [
	{ label: 'Home', href: '#' },
	{ label: 'Docs', href: '#' },
	{ label: 'Components', href: '#' },
	{ label: 'Breadcrumb', current: true },
]
</script>

<template>
	<UiKitSection title="Breadcrumb">
		<UiKitRow>
			<UiKitDemo label="Default">
				<Breadcrumb :items="breadcrumbItems" />
			</UiKitDemo>
			<UiKitDemo label="Collapsed">
				<Breadcrumb
					:items="breadcrumbItems"
					collapsed
				/>
			</UiKitDemo>
		</UiKitRow>
	</UiKitSection>
</template>
