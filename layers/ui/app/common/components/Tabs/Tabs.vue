<script setup lang="ts" generic="const Items extends ReadonlyArray<{ value: string; label: string }>">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import type { TabsProps } from './Tabs.types.ts'

// https://reka-ui.com/docs/components/tabs

interface Props extends TabsProps {
	/** Заголовки табов */
	items: Items
}

withDefaults(defineProps<Props>(), {
	variant: 'button',
	size: 'medium',
})

type TabValues = Items[number]['value']

defineSlots<{
	/** Слоты для контента табов. */
	[K in TabValues]?: () => any
}>()

const modelValue = defineModel<TabValues>()
</script>

<template>
	<TabsRoot
		v-model="modelValue"
		class="tabs"
		:class="[
			`tabs--variant-${variant}`,
			`tabs--size-${size}`,
		]"
		:default-value="items[0]?.value"
	>
		<TabsList
			class="tabs__list"
			aria-label="Вкладки табов"
		>
			<TabsTrigger
				v-for="item in items"
				:key="item.value"
				class="tabs__trigger"
				:value="item.value"
			>
				{{ item.label }}
			</TabsTrigger>
		</TabsList>

		<TabsContent
			v-for="item in items"
			:key="item.value"
			class="tabs__content"
			:value="item.value"
		>
			<slot :name="(item.value as TabValues)" />
		</TabsContent>
	</TabsRoot>
</template>

<style scoped lang="scss">
.tabs {
	display: flex;
	flex-direction: column;
	align-items: stretch;
}

.tabs__list {
	display: flex;
	align-items: center;
	align-self: flex-start;
}

.tabs__trigger {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	@include font-size(button);
	user-select: none;
	transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--border-primary) 35%, transparent);
	}
}

.tabs__content {
	margin-top: 16px;

	&:focus-visible {
		outline: none;
	}
}

// SIZES
.tabs--size-medium {
	.tabs__trigger {
		min-height: var(--ui-height-M);
		padding: 0 16px;
		gap: 8px;
	}

	&.tabs--variant-button {
		.tabs__list {
			padding: 4px;
			gap: 4px;
			border-radius: var(--UI-radius-M);
		}

		.tabs__trigger {
			border-radius: calc(var(--UI-radius-M) - 2px);
		}
	}

	&.tabs--variant-text {
		.tabs__list {
			gap: 24px;
		}

		.tabs__trigger {
			min-height: 0;
			padding: 0 0 10px;
		}
	}
}

.tabs--size-big {
	.tabs__trigger {
		min-height: var(--ui-height-L);
		padding: 0 20px;
		gap: 8px;
	}

	&.tabs--variant-button {
		.tabs__list {
			padding: 4px;
			gap: 4px;
			border-radius: var(--UI-radius-L);
		}

		.tabs__trigger {
			border-radius: calc(var(--UI-radius-L) - 2px);
		}
	}

	&.tabs--variant-text {
		.tabs__list {
			gap: 32px;
		}

		.tabs__trigger {
			min-height: 0;
			padding: 0 0 14px;
		}
	}
}

// VARIANTS
.tabs--variant-button {
	.tabs__list {
		background-color: var(--bg-controls-group);
	}

	.tabs__trigger {
		color: var(--text-on-bg-secondary);
		background-color: transparent;

		&:hover {
			background-color: var(--bg-action-secondary-hover);
		}

		&[data-state="active"] {
			color: var(--text-on-bg-selected);
			background-color: var(--bg-controls-on-group-selected);

			&:hover {
				background-color: var(--bg-controls-on-group-selected);
			}
		}

		&:disabled,
		&[data-disabled] {
			color: var(--text-on-bg-disabled);
			background-color: transparent;
		}
	}
}

.tabs--variant-text {
	.tabs__list {
		width: 100%;
		border-bottom: 1px solid var(--border-neutral);
	}

	.tabs__trigger {
		position: relative;
		color: var(--text-on-surface-dark);
		background-color: transparent;
		margin-bottom: -1px;
		border-bottom: 2px solid transparent;

		&:hover {
			color: var(--text-on-surface-dark-hover);
		}

		&[data-state="active"] {
			color: var(--text-on-surface-accent);
			border-bottom-color: var(--border-accent);
		}

		&:disabled,
		&[data-disabled] {
			color: var(--text-on-bg-disabled);
		}
	}
}
</style>
