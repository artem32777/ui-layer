<script setup lang="ts">
import type { BreadcrumbsProps } from './Breadcrumb.types'

const props = withDefaults(defineProps<BreadcrumbsProps>(), {
	collapsed: false,
	separator: '/',
})

/** Определяет, нужно ли показывать многоточие вместо элемента. */
const isEllipsisVisible = (index: number) => props.collapsed && index === 1 && props.items.length > 3

/** Определяет, нужно ли показывать элемент хлебных крошек. */
const isBreadcrumbItemVisible = (index: number) => !props.collapsed || index === 0 || index >= props.items.length - 2

/** Определяет, нужно ли показывать разделитель после элемента. */
const isSeparatorVisible = (index: number) =>
	index < props.items.length - 1 && (!props.collapsed || index === 0 || index >= props.items.length - 3)
</script>

<template>
	<nav
		class="breadcrumb"
		aria-label="breadcrumb"
	>
		<ol class="breadcrumb__list">
			<li
				v-for="(item, index) in items"
				:key="`${item.label}-${index}`"
				class="breadcrumb__item"
			>
				<span
					v-if="isEllipsisVisible(index)"
					class="breadcrumb__ellipsis"
					aria-label="Другие страницыы"
					role="img"
				>
					...
				</span>

				<template v-else-if="isBreadcrumbItemVisible(index)">
					<a
						v-if="item.href && !item.current"
						class="breadcrumb__link"
						:href="item.href"
					>
						{{ item.label }}
					</a>

					<span
						v-else
						class="breadcrumb__page"
						aria-current="page"
					>
						{{ item.label }}
					</span>
				</template>

				<span
					v-if="isSeparatorVisible(index)"
					class="breadcrumb__separator"
					aria-hidden="true"
				>
					{{ separator }}
				</span>
			</li>
		</ol>
	</nav>
</template>

<style scoped lang="scss">
.breadcrumb {
	color: var(--additional-2, #6b5b72);
}

.breadcrumb__list {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 8px;
}

.breadcrumb__item {
	display: inline-flex;
	align-items: center;
	gap: 8px;
}

.breadcrumb__link {
	color: var(--additional-2, #6b5b72);
	transition: color 0.3s ease;

	&:hover {
		color: var(--brand, #4149f2);
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--brand, #4149f2);
	}
}

.breadcrumb__page {
	color: var(--text, #000000);
}

.breadcrumb__separator {
	color: var(--additional-2, #6b5b72);
}

.breadcrumb__ellipsis {
	display: inline-flex;
	color: var(--additional-2, #6b5b72);
}
</style>
