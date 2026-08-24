<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
	selectedToken: string | null
	tokens: string[]
}>()

const uploadedFontName = ref('')
const fontError = ref('')

// Загруженный файл регистрируется только в текущем документе Storybook и не записывается в проект.
async function loadFont(event: Event) {
	const file = (event.target as HTMLInputElement).files?.[0]

	if (!file) return

	fontError.value = ''
	const url = URL.createObjectURL(file)

	try {
		const font = new FontFace('StorybookUploadedFont', `url(${url})`)

		await font.load()
		// Оставляем в FontFaceSet только последнюю версию загруженного пользователем шрифта.
		Array.from(document.fonts).filter(loadedFont => loadedFont.family === 'StorybookUploadedFont').forEach(loadedFont => document.fonts.delete(loadedFont))
		document.fonts.add(font)
		uploadedFontName.value = file.name
	} catch {
		fontError.value = 'Не удалось загрузить файл шрифта.'
		uploadedFontName.value = ''
	} finally {
		URL.revokeObjectURL(url)
	}
}

// Глобальная переменная используется всеми пресетами, у которых нет собственного font-family.
function applyFontToAll() {
	// Убираем точечные переопределения, иначе они имели бы приоритет над глобальным шрифтом.
	props.tokens.forEach(token => document.documentElement.style.removeProperty(`--font-${token}-family`))
	document.documentElement.style.setProperty('--font-family', 'StorybookUploadedFont')
}

// Переменная конкретного токена имеет приоритет над глобальной переменной --font-family.
function applyFontToSelected() {
	if (props.selectedToken) document.documentElement.style.setProperty(`--font-${props.selectedToken}-family`, 'StorybookUploadedFont')
}
</script>

<template>
	<div class="typography-font-loader">
		<label class="typography-font-loader__upload">
			<span class="typography-font-loader__upload-label">Загрузить шрифт</span>
			<input
				class="typography-font-loader__file-input"
				type="file"
				accept=".woff2,.woff,.ttf"
				@change="loadFont"
			>
		</label>

		<div
			v-if="uploadedFontName"
			class="typography-font-loader__preview"
		>
			<strong class="typography-font-loader__name">{{ uploadedFontName }}</strong>
			<span class="typography-font-loader__sample">Съешь ещё этих мягких французских булок, да выпей чаю. 0123456789</span>
			<div class="typography-font-loader__actions">
				<button
					type="button"
					class="typography-font-loader__button"
					@click="applyFontToAll"
				>
					Применить ко всем
				</button>
				<button
					type="button"
					class="typography-font-loader__button"
					:disabled="!selectedToken"
					@click="applyFontToSelected"
				>
					Применить к {{ selectedToken ?? 'пресету' }}
				</button>
			</div>
		</div>

		<span
			v-if="fontError"
			class="typography-font-loader__error"
			role="alert"
		>
			{{ fontError }}
		</span>
	</div>
</template>

<style scoped lang="scss">
.typography-font-loader {
	display: grid;
	gap: 12px;
	padding: 16px;
	border: 1px solid var(--neutral-500);
	border-radius: 8px;
	background: var(--white);
}

.typography-font-loader__upload {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	align-items: center;
}

.typography-font-loader__upload-label {
	font-weight: 600;
}

.typography-font-loader__file-input {
	color: var(--neutral-950);
}

.typography-font-loader__preview {
	display: grid;
	gap: 10px;
}

.typography-font-loader__name {
	color: var(--primary-50);
	font-size: 13px;
}

.typography-font-loader__sample {
	font-family: StorybookUploadedFont, sans-serif;
	font-size: 24px !important;
}

.typography-font-loader__actions {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}

.typography-font-loader__button {
	padding: 8px 14px;
	border: 1px solid var(--primary);
	border-radius: 6px;
	color: var(--white-100);
	background: var(--primary);
	cursor: pointer;

	&:hover {
		background: var(--primary-dark);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
}

.typography-font-loader__error {
	color: var(--accent);
}
</style>
