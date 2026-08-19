<script setup lang="ts">
// https://reka-ui.com/docs/components/month-picker
import { MonthPickerCell, MonthPickerCellTrigger, MonthPickerGrid, MonthPickerGridBody, MonthPickerGridRow, MonthPickerHeader, MonthPickerHeading, MonthPickerNext, MonthPickerPrev, MonthPickerRoot, type DateValue, type MonthPickerRootProps } from 'reka-ui'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'

export interface MonthPickerProps {
	/** Доступное название выбора месяца. */
	calendarLabel?: string
	/** Запрещает взаимодействие с выбором месяца. */
	disabled?: boolean
	/** Устанавливает фокус на выбранный или текущий месяц после монтирования. */
	initialFocus?: boolean
	/** Определяет месяцы, недоступные для выбора. */
	isMonthDisabled?: MonthPickerRootProps['isMonthDisabled']
	/** Определяет месяцы, которые отображаются как недоступные. */
	isMonthUnavailable?: MonthPickerRootProps['isMonthUnavailable']
	/** Локаль форматирования месяцев. */
	locale?: string
	/** Максимальная доступная дата. */
	maxValue?: DateValue
	/** Минимальная доступная дата. */
	minValue?: DateValue
	/** Разрешает выбрать несколько месяцев. */
	multiple?: boolean
	/** Запрещает снимать выбор без выбора другого месяца. */
	preventDeselect?: boolean
	/** Запрещает изменение выбранного месяца. */
	readonly?: boolean
}

withDefaults(defineProps<MonthPickerProps>(), {
	calendarLabel: 'Выбор месяца',
	locale: 'ru-RU',
})

const modelValue = defineModel<DateValue | DateValue[]>()
</script>

<template>
	<MonthPickerRoot
		v-slot="{ grid }"
		v-model="modelValue"
		class="month-picker"
		:calendar-label="calendarLabel"
		:disabled="disabled"
		:initial-focus="initialFocus"
		:is-month-disabled="isMonthDisabled"
		:is-month-unavailable="isMonthUnavailable"
		:locale="locale"
		:max-value="maxValue"
		:min-value="minValue"
		:multiple="multiple"
		:prevent-deselect="preventDeselect"
		:readonly="readonly"
	>
		<MonthPickerHeader class="month-picker__header">
			<MonthPickerPrev class="month-picker__navigation">
				<Icon
					class="month-picker__navigation-icon month-picker__navigation-icon--previous"
					:name="iconNames.chevronRight"
					:size="12"
				/>
			</MonthPickerPrev>
			<MonthPickerHeading class="month-picker__heading" />
			<MonthPickerNext class="month-picker__navigation">
				<Icon
					class="month-picker__navigation-icon"
					:name="iconNames.chevronRight"
					:size="12"
				/>
			</MonthPickerNext>
		</MonthPickerHeader>

		<MonthPickerGrid class="month-picker__grid">
			<MonthPickerGridBody>
				<MonthPickerGridRow
					v-for="(row, rowIndex) in grid.rows"
					:key="rowIndex"
				>
					<MonthPickerCell
						v-for="month in row"
						:key="month.toString()"
						class="month-picker__cell"
						:date="month"
					>
						<MonthPickerCellTrigger
							class="month-picker__month"
							:month="month"
						/>
					</MonthPickerCell>
				</MonthPickerGridRow>
			</MonthPickerGridBody>
		</MonthPickerGrid>
	</MonthPickerRoot>
</template>

<style scoped lang="scss">
.month-picker {
	display: inline-flex;
	flex-direction: column;
	gap: 12px;
	box-sizing: border-box;
	width: fit-content;
	padding: 16px;
	border: 1px solid var(--neutral-500, #e2e2e2);
	border-radius: var(--radius, 8px);
	color: var(--text, #000000);
	background-color: var(--background, #ffffff);

	&[data-disabled] {
		pointer-events: none;
	}

	&[data-readonly] {
		.month-picker__month {
			cursor: default;
		}
	}
}

.month-picker__header {
	display: grid;
	grid-template-columns: 36px minmax(0, 1fr) 36px;
	align-items: center;
	gap: 8px;
}

.month-picker__heading {
	color: var(--neutral-950);
	font-size: 16px;
	font-weight: 600;
	line-height: 24px;
	text-align: center;
}

.month-picker__navigation {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	width: 36px;
	height: 36px;
	padding: 0;
	border: 0;
	border-radius: 6px;
	color: var(--text, #000000);
	background-color: transparent;
	transition:
		color 0.3s ease,
		background-color 0.3s ease,
		box-shadow 0.3s ease,
		opacity 0.3s ease;
	cursor: pointer;

	&:hover {
		color: var(--primary-dark, #21223c);
		background-color: var(--neutral-500, #e2e2e2);
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand, #4149f2) 35%, transparent);
	}

	&[data-disabled] {
		opacity: 0.45;
		pointer-events: none;
	}
}

.month-picker__navigation-icon {
	transition: transform 0.3s ease;
}

.month-picker__navigation-icon--previous {
	transform: rotate(180deg);
}

.month-picker__grid {
	width: 288px;
	border-spacing: 4px;
	table-layout: fixed;
}

.month-picker__cell {
	box-sizing: border-box;
	width: 64px;
	height: 44px;
	padding: 0;
	text-align: center;
}

.month-picker__month {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	width: 100%;
	height: 40px;
	border-radius: 6px;
	color: var(--text, #000000);
	font-size: 14px;
	line-height: 20px;
	text-transform: capitalize;
	transition:
		color 0.3s ease,
		background-color 0.3s ease,
		box-shadow 0.3s ease,
		opacity 0.3s ease;
	cursor: pointer;
	user-select: none;

	&:not([data-selected]):not([data-disabled]):not([data-unavailable]):hover {
		color: var(--primary-dark, #21223c);
		background-color: var(--neutral-500, #e2e2e2);
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand, #4149f2) 35%, transparent);
	}

	&[data-selected] {
		color: var(--white, #ffffff);
		background-color: var(--brand, #4149f2);

		&:hover {
			background-color: var(--brand-dark, #3037c9);
		}
	}

	&[data-today] {
		box-shadow: inset 0 0 0 1px var(--brand, #4149f2);
	}

	&[data-selected][data-today] {
		box-shadow: inset 0 0 0 1px var(--white, #ffffff);
	}

	&[data-unavailable] {
		color: var(--primary-50, #888888);
		text-decoration: line-through;
		cursor: not-allowed;
	}

	&[data-disabled] {
		opacity: 0.35;
		cursor: not-allowed;
	}
}
</style>
