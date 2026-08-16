<script setup lang="ts">
// https://reka-ui.com/docs/components/calendar
import { CalendarCell, CalendarCellTrigger, CalendarGrid, CalendarGridBody, CalendarGridHead, CalendarGridRow, CalendarHeadCell, CalendarHeader, CalendarHeading, CalendarNext, CalendarPrev, CalendarRoot, type CalendarRootProps, type DateValue } from 'reka-ui'
import { ref } from 'vue'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'
import MonthPicker from '../MonthPicker/MonthPicker.vue'

export interface CalendarProps {
	/** Доступное название календаря. */
	calendarLabel?: string
	/** Отключает даты за пределами отображаемого месяца. */
	disableDaysOutsideCurrentView?: boolean
	/** Запрещает взаимодействие с календарём. */
	disabled?: boolean
	/** Всегда отображает шесть недель. */
	fixedWeeks?: boolean
	/** Устанавливает фокус на выбранную или текущую дату после монтирования. */
	initialFocus?: boolean
	/** Определяет даты, недоступные для выбора. */
	isDateDisabled?: CalendarRootProps['isDateDisabled']
	/** Определяет даты, которые отображаются как недоступные. */
	isDateUnavailable?: CalendarRootProps['isDateUnavailable']
	/** Локаль форматирования дат. */
	locale?: string
	/** Максимальная доступная дата. */
	maxValue?: DateValue
	/** Минимальная доступная дата. */
	minValue?: DateValue
	/** Разрешает выбрать несколько дат. */
	multiple?: boolean
	/** Количество одновременно отображаемых месяцев. */
	numberOfMonths?: number
	/** Запрещает изменение выбранной даты. */
	readonly?: boolean
	/** Формат подписей дней недели. */
	weekdayFormat?: CalendarRootProps['weekdayFormat']
	/** Первый день недели, от воскресенья (0) до субботы (6). */
	weekStartsOn?: CalendarRootProps['weekStartsOn']
}

withDefaults(defineProps<CalendarProps>(), {
	calendarLabel: 'Календарь',
	fixedWeeks: true,
	locale: 'ru-RU',
	numberOfMonths: 1,
	weekdayFormat: 'short',
	weekStartsOn: 1,
})

const modelValue = defineModel<DateValue | DateValue[]>()
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
	<CalendarRoot
		v-slot="{ date, grid, weekDays }"
		v-model="modelValue"
		v-model:placeholder="placeholder"
		class="calendar"
		:calendar-label="calendarLabel"
		:disable-days-outside-current-view="disableDaysOutsideCurrentView"
		:disabled="disabled"
		:fixed-weeks="fixedWeeks"
		:initial-focus="initialFocus"
		:is-date-disabled="isDateDisabled"
		:is-date-unavailable="isDateUnavailable"
		:locale="locale"
		:max-value="maxValue"
		:min-value="minValue"
		:multiple="multiple"
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

		<CalendarHeader
			class="calendar__header"
			:aria-hidden="isMonthPickerOpen"
			:inert="isMonthPickerOpen"
		>
			<CalendarPrev class="calendar__navigation">
				<Icon
					class="calendar__navigation-icon calendar__navigation-icon--previous"
					:name="iconNames.chevronRight"
					:size="12"
				/>
			</CalendarPrev>
			<CalendarHeading
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
			</CalendarHeading>
			<CalendarNext class="calendar__navigation">
				<Icon
					class="calendar__navigation-icon"
					:name="iconNames.chevronRight"
					:size="12"
				/>
			</CalendarNext>
		</CalendarHeader>

		<div
			class="calendar__months"
			:aria-hidden="isMonthPickerOpen"
			:inert="isMonthPickerOpen"
		>
			<CalendarGrid
				v-for="month in grid"
				:key="month.value.toString()"
				class="calendar__grid"
			>
				<CalendarGridHead>
					<CalendarGridRow>
						<CalendarHeadCell
							v-for="weekDay in weekDays"
							:key="weekDay"
							class="calendar__weekday"
						>
							{{ weekDay }}
						</CalendarHeadCell>
					</CalendarGridRow>
				</CalendarGridHead>

				<CalendarGridBody>
					<CalendarGridRow
						v-for="(week, weekIndex) in month.rows"
						:key="weekIndex"
					>
						<CalendarCell
							v-for="dateItem in week"
							:key="dateItem.toString()"
							class="calendar__cell"
							:date="dateItem"
						>
							<CalendarCellTrigger
								class="calendar__day"
								:day="dateItem"
								:month="month.value"
							/>
						</CalendarCell>
					</CalendarGridRow>
				</CalendarGridBody>
			</CalendarGrid>
		</div>
	</CalendarRoot>
</template>

<style scoped lang="scss">
@use './Calendar.scss';
</style>
