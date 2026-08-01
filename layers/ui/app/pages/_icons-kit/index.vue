<script setup lang="ts">
import { computed, ref } from 'vue'
import { iconGroups, iconNames, type IconName } from '#layers/ui/app/modules/svg-icon'
import SvgIcon from '#layers/ui/app/modules/svg-icon/components/SvgIcon.vue'

const search = ref('')
const iconCount = Object.keys(iconNames).length

const filteredIconGroups = computed(() => {
	const query = search.value.trim().toLowerCase()

	if (!query) {
		return iconGroups
	}

	return iconGroups
		.map(group => ({
			...group,
			icons: Object.fromEntries(
				Object.entries(group.icons).filter(([name]) => name.includes(query)),
			) as Record<string, IconName>,
		}))
		.filter(group => Object.keys(group.icons).length)
})

const filteredIconCount = computed(() => filteredIconGroups.value
	.reduce((count, group) => count + Object.keys(group.icons).length, 0))
</script>

<template>
	<div class="icons-page">
		<header class="icons-page__header">
			<div>
				<h1 class="icons-page__title">
					Иконки
				</h1>
				<p class="icons-page__meta">
					{{ filteredIconCount }} / {{ iconCount }}
				</p>
			</div>

			<label class="icons-page__search">
				<span class="icons-page__search-label">Search</span>
				<input
					v-model="search"
					class="icons-page__search-input"
					type="search"
					placeholder="download"
					autocomplete="off"
				>
			</label>
		</header>

		<div
			v-if="filteredIconCount"
			class="icons-page__sections"
		>
			<section
				v-for="group in filteredIconGroups"
				:key="group.dir"
				class="icons-page__section"
			>
				<h2
					v-if="group.dir"
					class="icons-page__section-title"
				>
					{{ group.title }}
				</h2>

				<div class="icons-page__grid">
					<article
						v-for="name in group.icons"
						:key="name"
						class="icons-page__card"
					>
						<div class="icons-page__preview">
							<SvgIcon
								:name="name"
								size="32"
								class="icons-page__icon"
								aria-hidden="true"
							/>
						</div>
						<span class="icons-page__name">{{ name }}</span>
					</article>
				</div>
			</section>
		</div>

		<p
			v-else
			class="icons-page__empty"
		>
			Иконки не найдены
		</p>
	</div>
</template>

<style scoped lang="scss">
.icons-page {
	min-height: 100vh;
	padding: 32px;
	background: color-mix(in srgb, var(--grey) 35%, var(--background));
	color: var(--text);

	@media (max-width: $sm) {
		padding: 20px;
	}
}

.icons-page__header {
	display: flex;
	gap: 24px;
	align-items: end;
	justify-content: space-between;
	margin-bottom: 28px;

	@media (max-width: $sm) {
		display: grid;
		align-items: start;
	}
}

.icons-page__title {
	margin: 0;
	font-size: 32px;
	font-weight: 700;
	line-height: 1.1;
}

.icons-page__meta {
	margin: 8px 0 0;
	color: var(--additional-2);
	font-size: 14px;
}

.icons-page__search {
	display: grid;
	gap: 8px;
	width: min(100%, 320px);

	@media (max-width: $sm) {
		width: 100%;
	}
}

.icons-page__search-label {
	color: var(--additional-2);
	font-size: 13px;
	font-weight: 600;
}

.icons-page__search-input {
	width: 100%;
	height: 42px;
	padding: 0 14px;
	border: 1px solid var(--grey);
	border-radius: 8px;
	background: var(--background);
	color: inherit;
	font: inherit;
	outline: none;

	&:focus {
		border-color: var(--brand);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand) 14%, transparent);
	}
}

.icons-page__sections {
	display: grid;
	gap: 28px;
}

.icons-page__section {
	display: grid;
	gap: 12px;
}

.icons-page__section-title {
	margin: 0;
	color: var(--text);
	font-size: 18px;
	font-weight: 700;
	line-height: 1.2;
}

.icons-page__grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	gap: 12px;
}

.icons-page__card {
	display: grid;
	gap: 12px;
	justify-items: center;
	min-width: 0;
	padding: 18px 12px;
	border: 1px solid var(--grey);
	border-radius: 8px;
	background: var(--background);
}

.icons-page__preview {
	display: grid;
	place-items: center;
	width: 56px;
	height: 56px;
	border-radius: 8px;
	background: var(--additional-1);
}

.icons-page__icon {
	color: var(--white);
}

.icons-page__name {
	max-width: 100%;
	overflow: hidden;
	color: var(--additional-1);
	font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
	font-size: 13px;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.icons-page__empty {
	padding: 24px;
	border: 1px dashed var(--grey);
	border-radius: 8px;
	background: var(--background);
	color: var(--additional-2);
	text-align: center;
}
</style>
