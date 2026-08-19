<script setup lang="ts">
import type { TypographyItem, TypographyProperty } from './typography.types'

defineProps<{
	item: TypographyItem
	breakpointTokens: string[]
	opened: boolean
}>()

const emit = defineEmits<{
	'toggle': []
	'set-size': [payload: { index: number, event: Event }]
	'set-value': [payload: { property: TypographyProperty, event: Event }]
}>()
</script>

<template>
	<div
		class="typography-preset"
		:class="{ 'typography-preset--opened': opened }"
	>
		<button
			type="button"
			class="typography-preset__summary"
			:aria-expanded="opened"
			@click="emit('toggle')"
		>
			<span class="typography-preset__meta">
				<strong class="typography-preset__token">{{ item.token }}</strong>
				<span class="typography-preset__values">{{ item.sizes.join(' / ') }}px · {{ item.weight }} · {{ item.lineHeight }} · {{ item.letterSpacing }}px</span>
			</span>
			<strong
				class="typography-preset__preview"
				:class="`typography-preset__preview--${item.token}`"
			>
				Пример текста
			</strong>
		</button>

		<div
			v-if="opened"
			class="typography-preset__controls"
		>
			<label
				v-for="(size, index) in item.sizes"
				:key="breakpointTokens[index]"
				class="typography-preset__control"
			>
				<span class="typography-preset__label">Размер {{ breakpointTokens[index] }}</span>
				<input
					class="typography-preset__input"
					type="number"
					min="1"
					step="1"
					:value="size"
					@input="emit('set-size', { index, event: $event })"
				>
			</label>
			<label class="typography-preset__control">
				<span class="typography-preset__label">Толщина</span>
				<input
					class="typography-preset__input"
					type="number"
					min="100"
					max="900"
					step="100"
					:value="item.weight"
					@input="emit('set-value', { property: 'weight', event: $event })"
				>
			</label>
			<label class="typography-preset__control">
				<span class="typography-preset__label">Высота строки</span>
				<input
					class="typography-preset__input"
					type="number"
					min="0.5"
					step="0.05"
					:value="item.lineHeight"
					@input="emit('set-value', { property: 'lineHeight', event: $event })"
				>
			</label>
			<label class="typography-preset__control">
				<span class="typography-preset__label">Letter spacing, px</span>
				<input
					class="typography-preset__input"
					type="number"
					step="0.1"
					:value="item.letterSpacing"
					@input="emit('set-value', { property: 'letterSpacing', event: $event })"
				>
			</label>
		</div>
	</div>
</template>

<style scoped lang="scss">
.typography-preset {
	overflow: hidden;
	border: 1px solid var(--grey);
	border-radius: 8px;
	background: var(--background);
	transition: border-color 0.2s ease;
}

.typography-preset--opened {
	border-color: var(--brand);
}

.typography-preset__summary {
	display: grid;
	grid-template-columns: minmax(180px, 260px) 1fr;
	gap: 20px;
	align-items: center;
	width: 100%;
	padding: 16px;
	border: 0;
	color: var(--text);
	background: transparent;
	text-align: left;
	cursor: pointer;

	&:hover {
		background: color-mix(in srgb, var(--brand) 6%, transparent);
	}

	@media (max-width: $sm) {
		grid-template-columns: 1fr;
	}
}

.typography-preset__meta {
	display: grid;
	gap: 4px;
}

.typography-preset__token {
	color: var(--text);
}

.typography-preset__values {
	color: var(--additional-2);
	font-size: 13px;
}

.typography-preset__preview {
	color: var(--text);
}

// Создаём preview-класс для каждого пресета из той же SCSS-карты, которую редактирует форма.
@each $name, $values in $font-sizes {
	.typography-preset__preview--#{$name} {
		@include font-size($name);
	}
}

.typography-preset__controls {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	gap: 12px;
	padding: 16px;
	border-top: 1px solid var(--grey);
}

.typography-preset__control {
	display: grid;
	gap: 6px;
}

.typography-preset__label {
	color: var(--additional-2);
	font-size: 12px;
}

.typography-preset__input {
	width: 100%;
	padding: 8px 10px;
	border: 1px solid var(--grey);
	border-radius: 6px;
	color: var(--text);
	background: var(--background);
}
</style>
