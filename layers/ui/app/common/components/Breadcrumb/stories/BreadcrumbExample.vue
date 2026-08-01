<script setup lang="ts">
import Breadcrumb, { type BreadcrumbItem } from '../Breadcrumb.vue'

const items: BreadcrumbItem[] = [
	{ label: 'Главная', href: '/' },
	{ label: 'Каталог', href: '/catalog' },
	{ label: 'Смартфоны', current: true },
]
</script>

<template>
	<Breadcrumb :items="items" />
</template>
