<script setup lang="ts">
import { RatingItem, RatingItemIndicator, RatingRoot } from 'reka-ui'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'

export interface RatingProps {
	/** Количество звёзд. */
	length?: number
	/** Шаг изменения. */
	step?: 1 | 0.5 | 0.25 | 0.1
	/** Позволяет сбросить рейтинг повторным выбором текущего значения. */
	clearable?: boolean
	/** Показывает предварительное значение при наведении. */
	hoverable?: boolean
	/** Отключает рейтинг и запрещает взаимодействие. */
	disabled?: boolean
	/** Отображает состояние ошибки. */
	invalid?: boolean
}

withDefaults(defineProps<RatingProps>(), {
	length: 5,
	step: 1,
})

const modelValue = defineModel<number>({ default: 0 })
</script>

<template>
	<RatingRoot
		v-slot="{ items }"
		v-model="modelValue"
		class="rating"
		:class="{ 'rating--invalid': invalid }"
		:length="length"
		:step="step"
		:clearable="clearable"
		:hoverable="hoverable"
		:disabled="disabled"
		:aria-invalid="invalid"
	>
		<RatingItem
			v-for="item in items"
			:key="item"
			v-slot="{ steps }"
			class="rating__item"
			:item="item"
		>
			<Icon
				class="rating__star rating__star--background"
				:name="iconNames.star"
				:size="28"
				aria-hidden="true"
			/>

			<RatingItemIndicator
				v-for="stepValue in steps"
				:key="stepValue"
				class="rating__indicator"
				:step="stepValue"
				:aria-label="`${stepValue} из ${length}`"
			>
				<Icon
					class="rating__star"
					:name="iconNames.star"
					:size="28"
					aria-hidden="true"
				/>
			</RatingItemIndicator>
		</RatingItem>
	</RatingRoot>
</template>

<style scoped lang="scss">
.rating {
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:deep(.rating__indicator) {
    position: absolute;
    top: 0;
    left: 0;
    z-index: var(--reka-rating-item-step-z-index);
    width: var(--reka-rating-item-step-width);
    overflow: hidden;
    color: transparent;
    opacity: var(--reka-rating-item-step-opacity);
    transition: color 0.2s ease, opacity 0.2s ease;

    &:focus-visible {
      outline: 2px solid var(--brand-dark, #292fba);
      outline-offset: 2px;
    }

    &[data-state="active"] {
      color: var(--brand, #4149f2);
    }

    &[data-disabled] {
      opacity: 0.5;
      cursor: default;
    }
  }

  &--invalid {
    border-bottom: 1px solid var(--accent, #ff001f);
  }
}

.rating__item {
  position: relative;
  width: 28px;
  height: 28px;
}

.rating__star {
  width: 28px;
  max-width: none;
  height: 28px;
  color: currentColor;

  &--background {
    color: var(--neutral-500, #e2e2e2);
    transition: color 0.2s ease;
  }
}
</style>
