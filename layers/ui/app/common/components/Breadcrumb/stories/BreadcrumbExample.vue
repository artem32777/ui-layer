<script setup lang="ts">
import Breadcrumb from '../Breadcrumb.vue'
import type { BreadcrumbItem } from '../Breadcrumb.types.ts'

const items: BreadcrumbItem[] = [
	{ label: 'Главная', href: '/' },
	{ label: 'Каталог', href: '/catalog' },
	{ label: 'Смартфоны', current: true },
]
</script>

<template>
	<Breadcrumb :items="items" />
</template>
