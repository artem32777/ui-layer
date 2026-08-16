<script setup lang="ts">
// https://reka-ui.com/docs/components/date-picker
import { DatePickerCalendar, DatePickerCell, DatePickerCellTrigger, DatePickerContent, DatePickerField, DatePickerGrid, DatePickerGridBody, DatePickerGridHead, DatePickerGridRow, DatePickerHeadCell, DatePickerHeader, DatePickerHeading, DatePickerInput, DatePickerNext, DatePickerPrev, DatePickerRoot, DatePickerTrigger, type DatePickerRootProps, type DateValue } from 'reka-ui'
import { ref, watch } from 'vue'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'
import MonthPicker from '../MonthPicker/MonthPicker.vue'

export interface DatePickerProps {
	/** Закрывает календарь после выбора даты. */
	closeOnSelect?: boolean
	/** Начальное состояние панели календаря. */
	defaultOpen?: boolean
	/** Дата, определяющая начальный отображаемый месяц. */
	defaultPlaceholder?: DateValue
	/** Начальное значение даты. */
	defaultValue?: DateValue
	/** Направление чтения компонента. */
	dir?: DatePickerRootProps['dir']
	/** Запрещает взаимодействие с компонентом. */
	disabled?: boolean
	/** Всегда отображает шесть недель в календаре. */
	fixedWeeks?: boolean
	/** Точность значения даты и времени. */
	granularity?: DatePickerRootProps['granularity']
	/** Скрывает сегмент часового пояса. */
	hideTimeZone?: boolean
	/** Формат отображения часов. */
	hourCycle?: DatePickerRootProps['hourCycle']
	/** Идентификатор скрытого поля формы. */
	id?: string
	/** Определяет даты, недоступные для выбора. */
	isDateDisabled?: DatePickerRootProps['isDateDisabled']
	/** Определяет даты, отображаемые как недоступные. */
	isDateUnavailable?: DatePickerRootProps['isDateUnavailable']
	/** Локаль форматирования дат. */
	locale?: string
	/** Максимальная доступная дата. */
	maxValue?: DateValue
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
	/** Запрещает снять выбор без выбора другой даты. */
	preventDeselect?: boolean
	/** Запрещает изменение значения. */
	readonly?: boolean
	/** Делает поле обязательным для заполнения. */
	required?: boolean
	/** Размер поля. */
	size?: 'sm' | 'md' | 'lg'
	/** Шаг для сегментов времени. */
	step?: DatePickerRootProps['step']
	/** Привязывает введённое время к ближайшему шагу. */
	stepSnapping?: boolean
	/** Визуальный вариант поля. */
	variant?: 'base' | 'secondary'
	/** Формат подписей дней недели. */
	weekdayFormat?: DatePickerRootProps['weekdayFormat']
	/** Первый день недели, от воскресенья (0) до субботы (6). */
	weekStartsOn?: DatePickerRootProps['weekStartsOn']
}

withDefaults(defineProps<DatePickerProps>(), {
	closeOnSelect: false,
	fixedWeeks: true,
	locale: 'ru-RU',
	numberOfMonths: 1,
	size: 'md',
	variant: 'base',
	weekdayFormat: 'short',
	weekStartsOn: 1,
})

const modelValue = defineModel<DateValue>()
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
	<DatePickerRoot
		:id="id"
		v-model="modelValue"
		v-model:open="open"
		v-model:placeholder="placeholder"
		:close-on-select="closeOnSelect"
		:default-open="defaultOpen"
		:default-placeholder="defaultPlaceholder"
		:default-value="defaultValue"
		:dir="dir"
		:disabled="disabled"
		:fixed-weeks="fixedWeeks"
		:granularity="granularity"
		:hide-time-zone="hideTimeZone"
		:hour-cycle="hourCycle"
		:is-date-disabled="isDateDisabled"
		:is-date-unavailable="isDateUnavailable"
		:locale="locale"
		:max-value="maxValue"
		:min-value="minValue"
		:modal="modal"
		:name="name"
		:number-of-months="numberOfMonths"
		:paged-navigation="pagedNavigation"
		:prevent-deselect="preventDeselect"
		:readonly="readonly"
		:required="required"
		:step="step"
		:step-snapping="stepSnapping"
		:weekday-format="weekdayFormat"
		:week-starts-on="weekStartsOn"
	>
		<DatePickerField
			v-slot="{ segments }"
			class="date-picker__field"
			:class="[
				`date-picker__field--${size}`,
				`date-picker__field--${variant}`,
			]"
		>
			<div class="date-picker__segments">
				<DatePickerInput
					v-for="(segment, segmentIndex) in segments"
					:key="`${segment.part}-${segmentIndex}`"
					class="date-picker__segment"
					:part="segment.part"
				>
					{{ segment.value }}
				</DatePickerInput>
			</div>

			<DatePickerTrigger
				class="date-picker__trigger"
				aria-label="Открыть календарь"
			>
				<Icon
					class="date-picker__trigger-icon"
					:name="iconNames.chevronDown"
					:size="12"
				/>
			</DatePickerTrigger>
		</DatePickerField>

		<DatePickerContent
			class="date-picker__content"
			align="start"
			:side-offset="6"
		>
			<DatePickerCalendar
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

				<DatePickerHeader
					class="calendar__header"
					:aria-hidden="isMonthPickerOpen"
					:inert="isMonthPickerOpen"
				>
					<DatePickerPrev class="calendar__navigation">
						<Icon
							class="calendar__navigation-icon calendar__navigation-icon--previous"
							:name="iconNames.chevronRight"
							:size="12"
						/>
					</DatePickerPrev>
					<DatePickerHeading
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
					</DatePickerHeading>
					<DatePickerNext class="calendar__navigation">
						<Icon
							class="calendar__navigation-icon"
							:name="iconNames.chevronRight"
							:size="12"
						/>
					</DatePickerNext>
				</DatePickerHeader>

				<div
					class="calendar__months"
					:aria-hidden="isMonthPickerOpen"
					:inert="isMonthPickerOpen"
				>
					<DatePickerGrid
						v-for="month in grid"
						:key="month.value.toString()"
						class="calendar__grid"
					>
						<DatePickerGridHead>
							<DatePickerGridRow>
								<DatePickerHeadCell
									v-for="weekDay in weekDays"
									:key="weekDay"
									class="calendar__weekday"
								>
									{{ weekDay }}
								</DatePickerHeadCell>
							</DatePickerGridRow>
						</DatePickerGridHead>

						<DatePickerGridBody>
							<DatePickerGridRow
								v-for="(week, weekIndex) in month.rows"
								:key="weekIndex"
							>
								<DatePickerCell
									v-for="dateItem in week"
									:key="dateItem.toString()"
									class="calendar__cell"
									:date="dateItem"
								>
									<DatePickerCellTrigger
										class="calendar__day"
										:day="dateItem"
										:month="month.value"
									/>
								</DatePickerCell>
							</DatePickerGridRow>
						</DatePickerGridBody>
					</DatePickerGrid>
				</div>
			</DatePickerCalendar>
		</DatePickerContent>
	</DatePickerRoot>
</template>

<style scoped lang="scss">
@use './DatePicker.scss';

.date-picker__content {
	z-index: $z-dropdown;
}
</style>
