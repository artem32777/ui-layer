<script setup lang="ts" generic="const T extends ReadonlyArray<TabsTitle>">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import type { TabsProps, TabsTitle } from './Tabs.types.ts'
import { Icon } from '#layers/ui/app/modules/svg-icon'

// https://reka-ui.com/docs/components/tabs

withDefaults(defineProps<TabsProps<T>>(), {
	variant: 'button',
	size: 'medium',
})

type TabValues = T[number]['value']

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
		:default-value="items[0]?.value"
	>
		<TabsList
			class="tabs__list"
			:class="[
				`tabs__list--variant-${variant}`,
				`tabs__list--size-${size}`,
				{ 'tabs__list--indent': indent },
			]"
			aria-label="Вкладки табов"
		>
			<TabsTrigger
				v-for="item in items"
				:key="item.value"
				class="tabs__trigger"
				:class="{ 'tabs__trigger--icon': item.icon }"
				:value="item.value"
				:aria-label="item.icon ? item.label : undefined"
			>
				<Icon
					v-if="item.icon"
					:name="item.icon"
					:size="16"
					class="tabs__icon"
					aria-hidden="true"
				/>
				<template v-else>
					<Icon
						v-if="item.iconLeft"
						:name="item.iconLeft"
						:size="16"
						class="tabs__icon"
						aria-hidden="true"
					/>
					{{ item.label }}
					<Icon
						v-if="item.iconRight"
						:name="item.iconRight"
						:size="16"
						class="tabs__icon"
						aria-hidden="true"
					/>
				</template>
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
  gap: 16px
}

.tabs__list {
  display: flex;
  align-items: center;
  align-self: flex-start;

  &--variant-button {
    background-color: var(--bg-controls-group);
    border-radius: var(--UI-radius-L);

    .tabs__trigger {
      @include font-size(button);
      color: var(--text-on-bg-secondary);

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

    &.tabs__list--size-big {
      .tabs__trigger {
        height: var(--ui-height-L);
        min-width: var(--ui-height-L);
        border-radius: var(--UI-radius-L);
        padding: 0 22px;

        &.tabs__trigger--icon {
          padding: 0 17px;
        }
      }
    }

    &.tabs__list--size-medium {
      .tabs__trigger {
        height: var(--ui-height-M);
        min-width: var(--ui-height-M);
        border-radius: var(--UI-radius-M);
        padding: 0 16px;

        &.tabs__trigger--icon {
          padding: 0 11px;
        }
      }
    }
  }

  &--variant-text {
    border-radius: var(--UI-radius-L);

    .tabs__trigger {
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

    &.tabs__list--size-big {
      gap: 30px;

      .tabs__trigger {
        @include font-size(lead);
        padding-bottom: 24px;
      }
    }

    &.tabs__list--size-medium {
      gap: 26px;

      .tabs__trigger {
        @include font-size(button);
        padding-bottom: 24px;
      }
    }

    &.tabs__list--size-small {
      gap: 20px;

      .tabs__trigger {
        @include font-size(button-small);
        padding-bottom: 16px;
      }
    }
  }

  &--indent {
    margin-left: 30px;
    margin-right: 30px;
  }
}

.tabs__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  user-select: none;
  transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-visible {
    outline: none;
  }
}

.tabs__icon {
  flex-shrink: 0;
}
</style>
