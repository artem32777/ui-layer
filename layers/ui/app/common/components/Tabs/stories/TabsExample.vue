<script setup lang="ts">
import { ref } from 'vue'
import Tabs from '../Tabs.vue'

const activeTab = ref('account')
</script>

<template>
	<Tabs v-model="activeTab" />
</template>
