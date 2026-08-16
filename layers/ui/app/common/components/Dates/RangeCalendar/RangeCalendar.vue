<script setup lang="ts">
// https://reka-ui.com/docs/components/range-calendar
import { RangeCalendarCell, RangeCalendarCellTrigger, RangeCalendarGrid, RangeCalendarGridBody, RangeCalendarGridHead, RangeCalendarGridRow, RangeCalendarHeadCell, RangeCalendarHeader, RangeCalendarHeading, RangeCalendarNext, RangeCalendarPrev, RangeCalendarRoot, type DateRange, type DateValue, type RangeCalendarRootProps } from 'reka-ui'
import { ref } from 'vue'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'
import MonthPicker from '../MonthPicker/MonthPicker.vue'

export interface RangeCalendarProps {
	/** Разрешает диапазоны, содержащие недоступные даты. */
	allowNonContiguousRanges?: boolean
	/** Доступное название календаря. */
	calendarLabel?: string
	/** Отключает даты за пределами отображаемого месяца. */
	disableDaysOutsideCurrentView?: boolean
	/** Запрещает взаимодействие с календарём. */
	disabled?: boolean
	/** Фиксирует начало или конец диапазона. */
	fixedDate?: RangeCalendarRootProps['fixedDate']
	/** Всегда отображает шесть недель. */
	fixedWeeks?: boolean
	/** Устанавливает фокус на выбранную или текущую дату после монтирования. */
	initialFocus?: boolean
	/** Определяет даты, недоступные для выбора. */
	isDateDisabled?: RangeCalendarRootProps['isDateDisabled']
	/** Определяет даты, которые могут быть подсвечены в диапазоне. */
	isDateHighlightable?: RangeCalendarRootProps['isDateHighlightable']
	/** Определяет даты, которые отображаются как недоступные. */
	isDateUnavailable?: RangeCalendarRootProps['isDateUnavailable']
	/** Локаль форматирования дат. */
	locale?: string
	/** Максимальная доступная дата. */
	maxValue?: DateValue
	/** Максимальное количество дней в диапазоне. */
	maximumDays?: number
	/** Минимальная доступная дата. */
	minValue?: DateValue
	/** Количество одновременно отображаемых месяцев. */
	numberOfMonths?: number
	/** Запрещает изменение выбранного диапазона. */
	readonly?: boolean
	/** Формат подписей дней недели. */
	weekdayFormat?: RangeCalendarRootProps['weekdayFormat']
	/** Первый день недели, от воскресенья (0) до субботы (6). */
	weekStartsOn?: RangeCalendarRootProps['weekStartsOn']
}

withDefaults(defineProps<RangeCalendarProps>(), {
	calendarLabel: 'Календарь выбора диапазона',
	fixedWeeks: true,
	locale: 'ru-RU',
	numberOfMonths: 1,
	weekdayFormat: 'short',
	weekStartsOn: 1,
})

const modelValue = defineModel<DateRange>()
const placeholder = ref<DateValue>()
const isMonthPickerOpen = ref(false)

function openMonthPicker(value: DateValue) {
	placeholder.value = value
	isMonthPickerOpen.value = true
}

function selectMonth(value: DateValue | DateValue[] | undefined) {
	if (!value || Array.isArray(value))
		return

	placeholder.value = value
	isMonthPickerOpen.value = false
}
</script>

<template>
	<RangeCalendarRoot
		v-slot="{ date, grid, weekDays }"
		v-model="modelValue"
		v-model:placeholder="placeholder"
		class="calendar"
		:allow-non-contiguous-ranges="allowNonContiguousRanges"
		:calendar-label="calendarLabel"
		:disable-days-outside-current-view="disableDaysOutsideCurrentView"
		:disabled="disabled"
		:fixed-date="fixedDate"
		:fixed-weeks="fixedWeeks"
		:initial-focus="initialFocus"
		:is-date-disabled="isDateDisabled"
		:is-date-highlightable="isDateHighlightable"
		:is-date-unavailable="isDateUnavailable"
		:locale="locale"
		:max-value="maxValue"
		:maximum-days="maximumDays"
		:min-value="minValue"
		:number-of-months="numberOfMonths"
		:readonly="readonly"
		:weekday-format="weekdayFormat"
		:week-starts-on="weekStartsOn"
	>
		<MonthPicker
			v-if="isMonthPickerOpen"
			class="calendar__month-picker"
			:disabled="disabled"
			initial-focus
			:locale="locale"
			:max-value="maxValue"
			:min-value="minValue"
			:model-value="placeholder"
			prevent-deselect
			@update:model-value="selectMonth"
		/>

		<RangeCalendarHeader
			class="calendar__header"
			:aria-hidden="isMonthPickerOpen"
			:inert="isMonthPickerOpen"
		>
			<RangeCalendarPrev class="calendar__navigation">
				<Icon
					class="calendar__navigation-icon calendar__navigation-icon--previous"
					:name="iconNames.chevronRight"
					:size="12"
				/>
			</RangeCalendarPrev>
			<RangeCalendarHeading
				v-slot="{ headingValue }"
				class="calendar__heading"
			>
				<button
					class="calendar__heading-button"
					type="button"
					:disabled="disabled"
					@click="openMonthPicker(date)"
				>
					{{ headingValue }}
				</button>
			</RangeCalendarHeading>
			<RangeCalendarNext class="calendar__navigation">
				<Icon
					class="calendar__navigation-icon"
					:name="iconNames.chevronRight"
					:size="12"
				/>
			</RangeCalendarNext>
		</RangeCalendarHeader>

		<div
			class="calendar__months"
			:aria-hidden="isMonthPickerOpen"
			:inert="isMonthPickerOpen"
		>
			<RangeCalendarGrid
				v-for="month in grid"
				:key="month.value.toString()"
				class="calendar__grid"
			>
				<RangeCalendarGridHead>
					<RangeCalendarGridRow>
						<RangeCalendarHeadCell
							v-for="weekDay in weekDays"
							:key="weekDay"
							class="calendar__weekday"
						>
							{{ weekDay }}
						</RangeCalendarHeadCell>
					</RangeCalendarGridRow>
				</RangeCalendarGridHead>

				<RangeCalendarGridBody>
					<RangeCalendarGridRow
						v-for="(week, weekIndex) in month.rows"
						:key="weekIndex"
					>
						<RangeCalendarCell
							v-for="dateItem in week"
							:key="dateItem.toString()"
							class="calendar__cell"
							:date="dateItem"
						>
							<RangeCalendarCellTrigger
								class="calendar__day"
								:day="dateItem"
								:month="month.value"
							/>
						</RangeCalendarCell>
					</RangeCalendarGridRow>
				</RangeCalendarGridBody>
			</RangeCalendarGrid>
		</div>
	</RangeCalendarRoot>
</template>

<style scoped lang="scss">
@use '../Calendar/Calendar.scss';

.calendar__day {
	&[data-highlighted],
	&[data-selected] {
		color: var(--text, #000000);
		background-color: color-mix(in srgb, var(--brand, #4149f2) 16%, transparent);

		&:hover {
			background-color: color-mix(in srgb, var(--brand, #4149f2) 24%, transparent);
		}
	}

	&[data-selected][data-today] {
		box-shadow: inset 0 0 0 1px var(--brand, #4149f2);
	}

	&[data-selection-start],
	&[data-selection-end],
	&[data-highlighted-start],
	&[data-highlighted-end] {
		color: var(--white, #ffffff);
		background-color: var(--brand, #4149f2);

		&:hover {
			background-color: var(--brand-dark, #3037c9);
		}

		&[data-today] {
			box-shadow: inset 0 0 0 1px var(--white, #ffffff);
		}
	}
}
</style>
