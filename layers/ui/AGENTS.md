# UI Layer Guidelines

## SVG Icon Contract

- Добавляй исходники в `app/modules/svg-icon/icon-source`; вложенные каталоги поддерживаются.
- `app/modules/svg-icon/build-icons.ts` генерирует `app/modules/svg-icon/runtime/iconNames.ts` при старте и сборке Nuxt и следит за SVG в dev-режиме. Никогда не редактируй runtime-файл вручную.
- `app/modules/svg-icon/index.ts` — публичный barrel, а не генератор.
- Для пропсов используй `IconName`, для конкретных значений — `iconNames.someName`, для рендера — `app/modules/svg-icon/components/Icon.vue`.

## Component Changes

- При изменении публичного поведения или внешнего вида обновляй соответствующие story, `play`-проверки и MDX.
- В `play`-тестах находи элементы по доступным ролям и именам, а не по CSS-классам.
- Не обновляй visual snapshots без просмотра actual/reference/diff.
- Перед изменением инфраструктуры Storybook прочитай корневой `.storybook/README.md`: там зафиксированы адаптеры Nuxt, visual workflow и compatibility workaround Storybook 10.5.5.
