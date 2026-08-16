<script setup lang="ts">
// https://reka-ui.com/docs/components/date-range-picker
import { DateRangePickerCalendar, DateRangePickerCell, DateRangePickerCellTrigger, DateRangePickerContent, DateRangePickerField, DateRangePickerGrid, DateRangePickerGridBody, DateRangePickerGridHead, DateRangePickerGridRow, DateRangePickerHeadCell, DateRangePickerHeader, DateRangePickerHeading, DateRangePickerInput, DateRangePickerNext, DateRangePickerPrev, DateRangePickerRoot, DateRangePickerTrigger, type DateRange, type DateRangePickerRootProps, type DateValue } from 'reka-ui'
import { ref, watch } from 'vue'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'
import MonthPicker from '../MonthPicker/MonthPicker.vue'

export interface DateRangePickerProps {
	/** Разрешает диапазоны, содержащие недоступные даты. */
	allowNonContiguousRanges?: boolean
	/** Закрывает календарь после выбора диапазона. */
	closeOnSelect?: boolean
	/** Начальное состояние панели календаря. */
	defaultOpen?: boolean
	/** Дата, определяющая начальный отображаемый месяц. */
	defaultPlaceholder?: DateValue
	/** Начальное значение диапазона. */
	defaultValue?: DateRange
	/** Направление чтения компонента. */
	dir?: DateRangePickerRootProps['dir']
	/** Запрещает взаимодействие с компонентом. */
	disabled?: boolean
	/** Фиксирует начало или конец диапазона. */
	fixedDate?: DateRangePickerRootProps['fixedDate']
	/** Всегда отображает шесть недель в календаре. */
	fixedWeeks?: boolean
	/** Точность значения даты и времени. */
	granularity?: DateRangePickerRootProps['granularity']
	/** Скрывает сегмент часового пояса. */
	hideTimeZone?: boolean
	/** Формат отображения часов. */
	hourCycle?: DateRangePickerRootProps['hourCycle']
	/** Идентификатор скрытого поля формы. */
	id?: string
	/** Определяет даты, недоступные для выбора. */
	isDateDisabled?: DateRangePickerRootProps['isDateDisabled']
	/** Определяет даты, которые могут быть подсвечены внутри диапазона. */
	isDateHighlightable?: DateRangePickerRootProps['isDateHighlightable']
	/** Определяет даты, отображаемые как недоступные. */
	isDateUnavailable?: DateRangePickerRootProps['isDateUnavailable']
	/** Локаль форматирования дат. */
	locale?: string
	/** Максимальная доступная дата. */
	maxValue?: DateValue
	/** Максимальное количество дней в диапазоне. */
	maximumDays?: number
	/** Минимальная доступная дата. */
	minValue?: DateValue
	/** Делает выпадающую панель модальной. */
	modal?: boolean
	/** Имя скрытого поля формы. */
	name?: string
	/** Количество одновременно отображаемых месяцев. */
	numberOfMonths?: number
	/** Переключает календарь на количество отображаемых месяцев. */
	pagedNavigation?: boolean
	/** Запрещает снять выбор без выбора другого диапазона. */
	preventDeselect?: boolean
	/** Запрещает изменение значения. */
	readonly?: boolean
	/** Делает поле обязательным для заполнения. */
	required?: boolean
	/** Размер поля. */
	size?: 'sm' | 'md' | 'lg'
	/** Шаг для сегментов времени. */
	step?: DateRangePickerRootProps['step']
	/** Визуальный вариант поля. */
	variant?: 'base' | 'secondary'
	/** Формат подписей дней недели. */
	weekdayFormat?: DateRangePickerRootProps['weekdayFormat']
	/** Первый день недели, от воскресенья (0) до субботы (6). */
	weekStartsOn?: DateRangePickerRootProps['weekStartsOn']
}

withDefaults(defineProps<DateRangePickerProps>(), {
	closeOnSelect: false,
	fixedWeeks: true,
	locale: 'ru-RU',
	numberOfMonths: 1,
	size: 'md',
	variant: 'base',
	weekdayFormat: 'short',
	weekStartsOn: 1,
})

const modelValue = defineModel<DateRange>()
const open = defineModel<boolean>('open', { default: false })
const placeholder = defineModel<DateValue>('placeholder')
const isMonthPickerOpen = ref(false)

watch(open, (value) => {
	if (!value)
		isMonthPickerOpen.value = false
})

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
	<DateRangePickerRoot
		:id="id"
		v-model="modelValue"
		v-model:open="open"
		v-model:placeholder="placeholder"
		:allow-non-contiguous-ranges="allowNonContiguousRanges"
		:close-on-select="closeOnSelect"
		:default-open="defaultOpen"
		:default-placeholder="defaultPlaceholder"
		:default-value="defaultValue"
		:dir="dir"
		:disabled="disabled"
		:fixed-date="fixedDate"
		:fixed-weeks="fixedWeeks"
		:granularity="granularity"
		:hide-time-zone="hideTimeZone"
		:hour-cycle="hourCycle"
		:is-date-disabled="isDateDisabled"
		:is-date-highlightable="isDateHighlightable"
		:is-date-unavailable="isDateUnavailable"
		:locale="locale"
		:max-value="maxValue"
		:maximum-days="maximumDays"
		:min-value="minValue"
		:modal="modal"
		:name="name"
		:number-of-months="numberOfMonths"
		:paged-navigation="pagedNavigation"
		:prevent-deselect="preventDeselect"
		:readonly="readonly"
		:required="required"
		:step="step"
		:weekday-format="weekdayFormat"
		:week-starts-on="weekStartsOn"
	>
		<DateRangePickerField
			v-slot="{ segments }"
			class="date-picker__field"
			:class="[
				`date-picker__field--${size}`,
				`date-picker__field--${variant}`,
			]"
		>
			<div class="date-picker__range">
				<div class="date-picker__segments">
					<DateRangePickerInput
						v-for="(segment, segmentIndex) in segments.start"
						:key="`start-${segment.part}-${segmentIndex}`"
						class="date-picker__segment"
						:part="segment.part"
						type="start"
					>
						{{ segment.value }}
					</DateRangePickerInput>
				</div>

				<span
					class="date-picker__range-separator"
					aria-hidden="true"
				>
					—
				</span>

				<div class="date-picker__segments">
					<DateRangePickerInput
						v-for="(segment, segmentIndex) in segments.end"
						:key="`end-${segment.part}-${segmentIndex}`"
						class="date-picker__segment"
						:part="segment.part"
						type="end"
					>
						{{ segment.value }}
					</DateRangePickerInput>
				</div>
			</div>

			<DateRangePickerTrigger
				class="date-picker__trigger"
				aria-label="Открыть календарь выбора диапазона"
			>
				<Icon
					class="date-picker__trigger-icon"
					:name="iconNames.chevronDown"
					:size="12"
				/>
			</DateRangePickerTrigger>
		</DateRangePickerField>

		<DateRangePickerContent
			class="date-picker__content"
			align="start"
			:side-offset="6"
		>
			<DateRangePickerCalendar
				v-slot="{ date, grid, weekDays }"
				class="calendar"
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

				<DateRangePickerHeader
					class="calendar__header"
					:aria-hidden="isMonthPickerOpen"
					:inert="isMonthPickerOpen"
				>
					<DateRangePickerPrev class="calendar__navigation">
						<Icon
							class="calendar__navigation-icon calendar__navigation-icon--previous"
							:name="iconNames.chevronRight"
							:size="12"
						/>
					</DateRangePickerPrev>
					<DateRangePickerHeading
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
					</DateRangePickerHeading>
					<DateRangePickerNext class="calendar__navigation">
						<Icon
							class="calendar__navigation-icon"
							:name="iconNames.chevronRight"
							:size="12"
						/>
					</DateRangePickerNext>
				</DateRangePickerHeader>

				<div
					class="calendar__months"
					:aria-hidden="isMonthPickerOpen"
					:inert="isMonthPickerOpen"
				>
					<DateRangePickerGrid
						v-for="month in grid"
						:key="month.value.toString()"
						class="calendar__grid"
					>
						<DateRangePickerGridHead>
							<DateRangePickerGridRow>
								<DateRangePickerHeadCell
									v-for="weekDay in weekDays"
									:key="weekDay"
									class="calendar__weekday"
								>
									{{ weekDay }}
								</DateRangePickerHeadCell>
							</DateRangePickerGridRow>
						</DateRangePickerGridHead>

						<DateRangePickerGridBody>
							<DateRangePickerGridRow
								v-for="(week, weekIndex) in month.rows"
								:key="weekIndex"
							>
								<DateRangePickerCell
									v-for="dateItem in week"
									:key="dateItem.toString()"
									class="calendar__cell"
									:date="dateItem"
								>
									<DateRangePickerCellTrigger
										class="calendar__day"
										:day="dateItem"
										:month="month.value"
									/>
								</DateRangePickerCell>
							</DateRangePickerGridRow>
						</DateRangePickerGridBody>
					</DateRangePickerGrid>
				</div>
			</DateRangePickerCalendar>
		</DateRangePickerContent>
	</DateRangePickerRoot>
</template>

<style scoped lang="scss">
@use '../DatePicker/DatePicker.scss';

.date-picker__content {
	z-index: $z-dropdown;
}

.date-picker__field {
	min-width: 380px;
}

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
