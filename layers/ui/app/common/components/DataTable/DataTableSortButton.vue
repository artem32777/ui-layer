<script setup lang="ts" generic="TData">
import type { Column } from '@tanstack/vue-table'
import { computed } from 'vue'

const props = defineProps<{
	/** Колонка TanStack Table, доступная в header-slot компонента DataTable. */
	column: Column<TData, unknown>
}>()

defineSlots<{
	/** Текст заголовка сортируемой колонки. */
	default?: () => any
}>()

const sortDirection = computed(() => props.column.getIsSorted())
const sortLabel = computed(() => {
	if (sortDirection.value === 'asc') {
		return 'Сортировка по возрастанию. Переключить на убывание'
	}

	if (sortDirection.value === 'desc') {
		return 'Сортировка по убыванию. Сбросить сортировку'
	}

	return 'Включить сортировку по возрастанию'
})
</script>

<template>
	<button
		v-if="column.getCanSort()"
		class="ui-data-table-sort"
		type="button"
		:aria-label="sortLabel"
		:aria-pressed="Boolean(sortDirection)"
		@click="column.getToggleSortingHandler()?.($event)"
	>
		<span class="ui-data-table-sort__label">
			<slot />
		</span>
		<span
			class="ui-data-table-sort__icon"
			aria-hidden="true"
		>
			{{ sortDirection === 'asc' ? '↑' : sortDirection === 'desc' ? '↓' : '↕' }}
		</span>
	</button>

	<span v-else>
		<slot />
	</span>
</template>

<style scoped lang="scss">
.ui-data-table-sort {
	all: unset;
	display: inline-flex;
	align-items: center;
	gap: 6px;
	border-radius: 4px;
	color: inherit;
	cursor: pointer;

	&:hover {
		color: var(--text, #000000);
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand, #4149f2) 30%, transparent);
	}
}

.ui-data-table-sort__icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 16px;
	color: var(--brand, #4149f2);
	font-size: 14px;
	line-height: 1;
}
</style>
