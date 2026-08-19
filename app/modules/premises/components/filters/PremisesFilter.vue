<script setup lang="ts">
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import PremisesFilterRange, { type PremisesFilterRangeProps } from './PremisesFilterRange.vue'
import PremisesFilterSelect, {
	type PremisesFilterSelectProps,
} from './PremisesFilterSelect.vue'

export interface PremisesFilter {
	floor?: number
	buildingId?: number
	rooms: number[]
	area: number[]
	price: number[]
}

export interface PremisesFilterProps {
	floors: PremisesFilterSelectProps<false>
	building: PremisesFilterSelectProps<false>
	rooms: PremisesFilterSelectProps<true>
	areaRange: PremisesFilterRangeProps['range']
	priceRange: PremisesFilterRangeProps['range']
	disabled?: boolean
}

withDefaults(defineProps<PremisesFilterProps>(), {
	disabled: false,
})

const model = defineModel<PremisesFilter>({ required: true })
const emit = defineEmits<{
	submit: [model: PremisesFilter]
	reset: []
}>()
</script>

<template>
	<form
		class="premises-filter"
		@submit.prevent="emit('submit', model)"
	>
		<div class="premises-filter__fields">
			<PremisesFilterSelect
				v-model="model.floor"
				v-bind="floors"
				class="premises-filter__item premises-filter__item--estate"
				:disabled="disabled"
			/>

			<PremisesFilterSelect
				v-model="model.buildingId"
				v-bind="building"
				class="premises-filter__item premises-filter__item--building"
				:disabled="disabled"
			/>

			<PremisesFilterSelect
				v-model="model.rooms"
				v-bind="rooms"
				class="premises-filter__item premises-filter__item--rooms"
				:disabled="disabled"
			/>

			<PremisesFilterRange
				v-model="model.area"
				class="premises-filter__item premises-filter__item--area"
				label="Площадь, м²"
				additional-text=" м²"
				:range="areaRange"
				:disabled="disabled"
			/>

			<PremisesFilterRange
				v-model="model.price"
				class="premises-filter__item premises-filter__item--price"
				label="Стоимость"
				additional-text=" ₽"
				:range="priceRange"
				:disabled="disabled"
			/>

			<div class="premises-filter__actions">
				<Button
					class="premises-filter__action"
					type="button"
					variant="secondary"
					size="big"
					:disabled="disabled"
					@click="emit('reset')"
				>
					Сбросить
				</Button>
				<Button
					class="premises-filter__action"
					type="submit"
					variant="primary"
					size="big"
					:disabled="disabled"
				>
					Показать
				</Button>
			</div>
		</div>
	</form>
</template>

<style scoped lang="scss">
.premises-filter {
	box-sizing: border-box;
	width: 100%;
	padding: 24px;
	border: 1px solid var(--neutral-500);
	border-radius: var(--radius);
	background-color: var(--white);

	@media (max-width: $sm) {
		padding: 16px;
	}
}

.premises-filter__fields {
	display: grid;
	grid-template-areas:
		"estate building rooms"
		"area price actions";
	grid-template-columns: repeat(3, minmax(0, 1fr));
	align-items: end;
	gap: 24px 16px;

	@media (max-width: $md) {
		grid-template-areas:
			"estate building"
			"rooms area"
			"price actions";
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media (max-width: $sm) {
		grid-template-areas:
			"estate"
			"building"
			"rooms"
			"area"
			"price"
			"actions";
		grid-template-columns: minmax(0, 1fr);
	}
}

.premises-filter__item {
	min-width: 0;
}

.premises-filter__item--estate {
	grid-area: estate;
}

.premises-filter__item--building {
	grid-area: building;
}

.premises-filter__item--rooms {
	grid-area: rooms;
}

.premises-filter__item--area {
	grid-area: area;
}

.premises-filter__item--price {
	grid-area: price;
}

.premises-filter__actions {
	grid-area: actions;
	display: flex;
	justify-content: flex-end;
	min-width: 0;
	gap: 12px;

	@media (max-width: $xs) {
		display: grid;
		grid-template-columns: 1fr;
	}
}

.premises-filter__action {
	min-width: 0;
	flex: 1 1 0;

	@media (max-width: $xs) {
		width: 100%;
		min-width: 0;
	}
}
</style>
