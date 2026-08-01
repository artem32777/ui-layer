<script setup lang="ts">
import { ref } from 'vue'
import Pagination from '../../../common/components/Pagination/Pagination.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitSection from './UiKitSection.vue'

const paginationPage = ref(2)
</script>

<template>
	<UiKitSection title="Pagination">
		<UiKitDemo label="Edges and sibling">
			<Pagination v-model:page="paginationPage" />
		</UiKitDemo>
	</UiKitSection>
</template>
