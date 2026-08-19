<script setup lang="ts">
import { computed, ref } from 'vue'
import Icon from '#layers/ui/app/modules/svg-icon/components/Icon.vue'
import { iconNameList, type IconName } from '#layers/ui/app/modules/svg-icon/runtime/iconNames'

const modelValue = defineModel<IconName>()

const search = ref('')
const filteredIconNames = computed(() => iconNameList.filter(iconName => iconName.toLowerCase().includes(search.value.trim().toLowerCase())))
</script>

<template>
	<div class="icon-picker">
		<label class="icon-picker__search">
			<span class="icon-picker__search-label">Поиск</span>
			<input
				v-model="search"
				type="search"
				class="icon-picker__search-input"
				placeholder="Название иконки"
				autocomplete="off"
			>
		</label>

		<div
			v-if="filteredIconNames.length"
			class="icon-picker__options"
		>
			<button
				v-for="iconName in filteredIconNames"
				:key="iconName"
				type="button"
				class="icon-picker__option"
				:class="{ 'icon-picker__option--selected': modelValue === iconName }"
				:aria-pressed="modelValue === iconName"
				:title="`Выбрать ${iconName}`"
				@click="modelValue = iconName"
			>
				<Icon
					:name="iconName"
					:size="24"
				/>
				<span class="icon-picker__option-name">{{ iconName }}</span>
			</button>
		</div>

		<p
			v-else
			class="icon-picker__empty"
		>
			Иконки не найдены
		</p>
	</div>
</template>

<style scoped lang="scss">
.icon-picker {
	display: grid;
	gap: 12px;
	min-width: 280px;
	padding: 16px;
	border: 1px solid var(--neutral-600);
	border-radius: 12px;
	background: var(--white);
}

.icon-picker__header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
}

.icon-picker__title {
	font-size: 16px;
}

.icon-picker__clear {
	padding: 0;
	border: 0;
	color: var(--primary);
	background: transparent;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
}

.icon-picker__preview {
	display: flex;
	align-items: center;
	gap: 10px;
	min-height: 52px;
	padding: 10px 12px;
	border-radius: 8px;
	color: var(--neutral-950);
	background: var(--neutral-500);
}

.icon-picker__search {
	display: grid;
	gap: 6px;
}

.icon-picker__search-label {
	font-size: 13px;
	font-weight: 600;
}

.icon-picker__search-input {
	width: 100%;
	height: 38px;
	padding: 0 12px;
	border: 1px solid var(--neutral-700);
	border-radius: 8px;
	background: var(--white);

	&:focus-visible {
		outline: 2px solid var(--primary);
		outline-offset: 1px;
	}
}

.icon-picker__options {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(76px, 1fr));
	gap: 8px;
	max-height: 300px;
	overflow-y: auto;
}

.icon-picker__option {
	display: grid;
	gap: 6px;
	justify-items: center;
	min-width: 0;
	padding: 10px 6px;
	border: 1px solid var(--neutral-600);
	border-radius: 8px;
	color: var(--neutral-950);
	background: var(--white);
	cursor: pointer;

	&:hover {
		border-color: var(--primary);
	}

	&:focus-visible {
		outline: 2px solid var(--primary);
		outline-offset: 1px;
	}
}

.icon-picker__option--selected {
	border-color: var(--primary);
	box-shadow: inset 0 0 0 1px var(--primary);
}

.icon-picker__option-name {
	max-width: 100%;
	overflow: hidden;
	font-size: 11px;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.icon-picker__empty {
	margin: 0;
	padding: 20px;
	border: 1px dashed var(--neutral-700);
	border-radius: 8px;
	text-align: center;
}
</style>
