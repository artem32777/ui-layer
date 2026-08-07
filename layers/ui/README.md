# SVG-иконки
В слое используется самописный Nuxt-модуль `svg-icons`.
Как и большинство подобных модулей, он сканирует определенный каталог (по умолчанию `layers/ui/app/modules/svg-icon/icon-source`)
на наличие svg-файлов и создаёт из них данные для рендера иконок через компонент `SvgIcons`.

Просто поместите нужный вам файл иконки в папку, модуль сам увидит это и сразу сгенерирует
пропс для иконки из названия файла.

Важным отличием является то, он делает это с рантайм типизацией. Т.е. вы получите:

1. Подсказки автокомплита при передаче пропса названия иконки;
2. Ошибку типов при передаче неправильного или несуществующего названия пропса иконки;
3. Объект `iconNames` содержайший все актуальные имена иконок
4. Массив `iconNamesList` также содержаший все актуальные имена иконок, но в формате массива
5. Тип `IconNames` с литералами всех акутальным имен иконок
6. Техническую страницу (доступна только в dev-режие) по адресу `/_icons-kit` демонстрирующую все иконки проекта,
с возможностю поиска по имени, а также группировкой по папкам

Модуль является свежим, в нём нет тестов, а также не проверялись всякие узкие кейсы, например, добавление нескольких иконок сразу,
использование одинаковых имён файлов, невалидная разметка и т.п. Поэтому, при использовании нужно быть 
внимательным, пользоваться аккуратно и валидировать каждое добавление :)

Пример использования:

```vue
<script setup lang="ts">
import SvgIcon from '#layers/ui/app/modules/svg-icon/components/SvgIcon.vue'
</script>

<template>
	<SvgIcon
		name="download"
		:size="24"
		color="#111827"
	/>
</template>
```

Для autocomplete импортируй `iconNames`:

```vue
<script setup lang="ts">
import { iconNames } from '#layers/ui/app/modules/svg-icon/runtime/iconNames'
import SvgIcon from '#layers/ui/app/modules/svg-icon/components/SvgIcon.vue'
</script>

<template>
	<SvgIcon :name="iconNames.telegram" />
</template>
```

Для перебора всех иконок можно идти прямо по объекту `iconNames`:
 
```vue
<script setup lang="ts">
import { iconNames } from '#layers/ui/app/modules/svg-icon/runtime/iconNames'
import SvgIcon from '#layers/ui/app/modules/svg-icon/components/SvgIcon.vue'
</script>

<template>
	<div>
		<SvgIcon
			v-for="name in iconNames"
			:key="name"
			:name="name"
		/>
	</div>
</template>
```

Для каталога с группировкой по папкам используй `iconGroups`:

```vue
<script setup lang="ts">
import { iconGroups } from '#layers/ui/app/modules/svg-icon/runtime/iconNames'
import SvgIcon from '#layers/ui/app/modules/svg-icon/components/SvgIcon.vue'
</script>

<template>
	<section
		v-for="group in iconGroups"
		:key="group.dir"
	>
		<h2 v-if="group.dir">
			{{ group.title }}
		</h2>

		<SvgIcon
			v-for="name in group.icons"
			:key="name"
			:name="name"
		/>
	</section>
</template>
```

## Добавление иконок

1. Добавь SVG-файл в `app/modules/svg-icon/icon-source`.
2. Используй имя файла в lowercase kebab-case, например `arrow-right.svg`.
3. Вложенные папки поддерживаются. Имя папки становится частью имени иконки, например `test/download-2.svg` станет `test-download-2`.
4. В dev-режиме перезапуск Nuxt не нужен: модуль следит за SVG-файлами и автоматически обновляет `app/modules/svg-icon/runtime/iconNames.ts`.
5. Для production-сборки выполни `npm run build`.

## Модуль `svg-icons`

Локальный Nuxt-модуль находится в `app/modules/svg-icon/index.ts`.

Настройки модуля задаются в `layers/ui/nuxt.config.ts`:

```ts
modules: [
	resolve('./app/modules/svg-icon'),
],

svgIcons: {
	iconsDir: resolve('./app/modules/svg-icon/icon-source'),
	runtimeIconNamesPath: resolve('./app/modules/svg-icon/runtime/iconNames.ts'),
	rootGroupTitle: 'Корень',
	recursive: true,
}
```

Он:

- сканирует `app/modules/svg-icon/icon-source`;
- следит за SVG-файлами в dev-режиме;
- генерирует типизированный объект `iconNames`;
- генерирует данные SVG в `svgIconData`;
- генерирует группы `iconGroups` для каталогов иконок;
- ограничивает `SvgIcon.name` только существующими локальными SVG;
- рендерит SVG через `SvgIcon` без `@nuxt/icon`.

Не редактируй `app/modules/svg-icon/runtime/iconNames.ts` вручную. Это generated-файл.

## Каталог иконок

Dev-only страница каталога находится в `app/pages/_icons-kit.vue`.

Страницы, которые начинаются с `_`, включаются только в режиме разработки и исключаются из production build через `pages.pattern` в корневом `nuxt.config.ts`.
