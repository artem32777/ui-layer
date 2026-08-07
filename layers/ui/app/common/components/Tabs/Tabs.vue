<script setup lang="ts" generic="const Items extends ReadonlyArray<{ value: string; label: string }>">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'

// https://reka-ui.com/docs/components/tabs

interface TabsProps {
	/** Заголовки табов */
	items: Items
}

defineProps<TabsProps>()

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
		:default-value="items[0]?.value"
	>
		<TabsList
			class="tabs-list"
			aria-label="Вкладки табов"
		>
			<TabsTrigger
				v-for="item in items"
				:key="item.value"
				class="tabs-list__trigger"
				:value="item.value"
			>
				{{ item.label }}
			</TabsTrigger>
		</TabsList>

		<TabsContent
			v-for="item in items"
			:key="item.value"
			class="tabs-content"
			:value="item.value"
		>
			<slot :name="(item.value as TabValues)" />
		</TabsContent>
	</TabsRoot>
</template>

<style scoped lang="scss">
.tabs-list {
	display: inline-flex;
	align-items: center;
	align-self: flex-start;
	padding: 4px;
	border-radius: 8px;
	background-color: var(--grey, #e2e2e2);
}

.tabs-list__trigger {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	height: 32px;
	padding: 0 12px;
	border-radius: 6px;
	color: var(--additional-2, #6b5b72);
	user-select: none;
	transition: color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;

	&[data-state="active"] {
		color: var(--text, #000000);
		background-color: var(--background, #ffffff);
		box-shadow: 0 1px 2px color-mix(in srgb, var(--text, #000000) 8%, transparent);
	}

  &:hover {
    color: var(--brand, #4149f2);
  }

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand, #4149f2) 35%, transparent);
	}
}

.tabs-content {
	margin-top: 12px;
	padding: 16px;
	border: 1px solid var(--grey, #e2e2e2);
	border-radius: 8px;
	color: var(--additional-2, #6b5b72);
	background-color: var(--background, #ffffff);

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand, #4149f2) 35%, transparent);
	}
}
</style>
