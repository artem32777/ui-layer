<script setup lang="ts">
import { PaginationEllipsis, PaginationList, PaginationListItem, PaginationNext, PaginationPrev, PaginationRoot } from 'reka-ui'
import type { PaginationProps } from './Pagination.types.ts'

// https://reka-ui.com/docs/components/pagination

withDefaults(defineProps<PaginationProps>(), {
	totalPages: 100,
	itemsPerPage: 10,
})

/** Номер текущей страницы. */
const modelValue = defineModel<number>('page', { default: 1 })
</script>

<template>
	<PaginationRoot
		v-model:page="modelValue"
		class="pagination"
		:total="totalPages"
		:items-per-page="itemsPerPage"
		:sibling-count="1"
		:disabled="disabled"
		:show-edges="true"
	>
		<PaginationPrev class="pagination__button">
			‹
		</PaginationPrev>
		<PaginationList
			v-slot="{ items }"
			class="pagination__list"
		>
			<template
				v-for="(item, index) in items"
				:key="index"
			>
				<PaginationListItem
					v-if="item.type === 'page'"
					class="pagination__item"
					:value="item.value"
				>
					{{ item.value }}
				</PaginationListItem>
				<PaginationEllipsis
					v-else
					class="pagination__item"
				>
					…
				</PaginationEllipsis>
			</template>
		</PaginationList>
		<PaginationNext class="pagination__button">
			›
		</PaginationNext>
	</PaginationRoot>
</template>

<style scoped lang="scss">
.pagination {
	display: flex;
	align-items: center;
	gap: 6px;
}

.pagination__list {
	display: flex;
	align-items: center;
	gap: 6px;
}

.pagination__item,
.pagination__button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 36px;
	height: 36px;
	border-radius: 6px;
	color: var(--text, #000000);
	background-color: var(--background, #ffffff);
	transition: background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease;
	cursor: pointer;

	&:hover {
		color: var(--primary-dark, #21223c);
		background-color: var(--neutral-500, #e2e2e2);
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand, #4149f2) 35%, transparent);
	}

	&:disabled {
		opacity: 0.45;
		cursor: default;
		pointer-events: none;
	}
}

.pagination__item {
	&[data-selected] {
		color: var(--white, #ffffff);
		background-color: var(--brand, #4149f2);
	}
}
</style>
