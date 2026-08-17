# UI Layer Guidelines

## SVG Icon Contract

- Добавляй исходники в `app/modules/svg-icon/icon-source`; вложенные каталоги поддерживаются.
- `app/modules/svg-icon/build-icons.ts` генерирует `app/modules/svg-icon/runtime/iconNames.ts` при старте и сборке Nuxt и следит за SVG в dev-режиме. Никогда не редактируй runtime-файл вручную.
- Для пропсов имени используй `iconNames.someName`, для рендера — `Icon` из `app/modules/svg-icon`.

## Component Changes

- При изменении публичного поведения или внешнего вида обновляй соответствующие story, `play`-проверки и MDX.
- В `play`-тестах находи элементы по доступным ролям и именам, а не по CSS-классам.
- Не обновляй visual snapshots, это делает пользователь.
