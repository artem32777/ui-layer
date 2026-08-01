<script setup lang="ts">
import { ref } from 'vue'
import Pagination from '../Pagination.vue'

const page = ref(1)
</script>

<template>
	<Pagination v-model:page="page" />
</template>
