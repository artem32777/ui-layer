# Storybook и тесты UI-компонентов

В этой директории собрана вся инфраструктура Storybook, component-тестов,
accessibility-проверок и визуальных регрессий.

## Структура

```text
.storybook/
├── main.ts                 # Поиск stories, addons, Vite aliases и SCSS
├── preview.ts              # Глобальный Vue runtime и параметры stories
├── nuxt-imports.ts         # Browser-only адаптер Nuxt composables
├── env.d.ts                # Типы для SCSS imports
├── tsconfig.json           # TypeScript-проверка файлов этой директории
├── vitest.config.ts        # Component/interaction/a11y tests в Chromium
├── playwright.config.ts    # Настройки visual regression tests
└── visual-tests/
    ├── docs.spec.ts        # Regression-тест клиентского перехода Canvas → Docs
    ├── storybook.spec.ts   # Автоматический обход всех stories
    └── *.spec.ts-snapshots # Эталонные PNG для текущей платформы
```

В корне проекта остаётся только `vitest.config.ts`-bridge. Storybook 10.5
ищет Vitest config от package root вверх и не поддерживает произвольный путь.
Bridge реэкспортирует настоящую конфигурацию отсюда и сохраняет работу кнопки
запуска тестов внутри Storybook.

## Команды

```bash
# Интерактивный Storybook на http://localhost:6006
npm run storybook

# Однократный прогон render, play и a11y-проверок
npm run test:stories

# Watch-режим тех же тестов
npm run test:stories:watch

# Сравнение всех stories с PNG-эталонами
npm run test:visual

# Перезапись PNG после намеренного изменения интерфейса
npm run test:visual:update

# Проверка production-сборки документации
npm run build-storybook

# Проверка типов конфигурации
npx tsc --noEmit -p .storybook/tsconfig.json
```

После первой установки зависимостей Chromium устанавливается отдельно:

```bash
npx playwright install chromium
```

## Component и interaction tests

`@storybook/addon-vitest` превращает каждую story в browser test. Даже story
без `play` получает smoke-проверку: компонент должен успешно отрисоваться.

Проверка поведения пишется прямо в `play`:

```ts
import { expect } from 'storybook/test'

export const Tests: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'Сохранить' })

    await userEvent.click(button)
    await expect(button).toHaveAttribute('aria-pressed', 'true')
  },
}
```

Используйте запросы по доступным ролям и именам (`getByRole`), а не CSS-классам:
так тест одновременно проверяет пользовательский контракт компонента.

## Accessibility tests

`@storybook/addon-a11y` запускает axe в настоящем Chromium. Чтобы нарушение
доступности падало в CLI и CI, укажите параметр на story или component meta:

```ts
const meta = {
  component: Checkbox,
  parameters: {
    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Checkbox>
```

Допустимые режимы:

- `error` — нарушение роняет тест;
- `todo` — нарушение остаётся видимым, но временно не блокирует сборку;
- `off` — автоматическая проверка отключена для конкретной story.

В интерактивном Storybook подробности отображаются во вкладке Accessibility.

## Visual regression tests

`.storybook/visual-tests/storybook.spec.ts` читает сгенерированный
`/index.json`, фильтрует записи типа `story` и автоматически снимает каждую.
Новые stories не нужно вручную добавлять в Playwright suite.

Обычный рабочий процесс:

1. Запустите `npm run test:visual`.
2. Если тест упал, изучите actual/reference/diff в `.storybook/test-results`.
3. Если изменение ожидаемое, выполните `npm run test:visual:update`.
4. Просмотрите изменённые PNG и добавьте их в коммит вместе с кодом.

Скриншоты зависят от ОС и браузера. Текущие эталоны созданы для Chromium на
Windows; для Linux CI нужно один раз создать и закоммитить Linux-варианты.

Playwright для каждого запуска самостоятельно поднимает Storybook на порту
`6007` и завершает его после тестов. Не запускайте отдельный Storybook на этом
порту: тест намеренно не переиспользует чужие процессы, чтобы прерванный или
устаревший server не вызвал `ERR_CONNECTION_REFUSED` посреди visual suite.

## Совместимость Docs со Storybook 10.5.5

Встроенный instrumentation loader Storybook 10.5.5 заменяет
`HTMLElement.prototype.focus` getter-обёрткой. При клиентском переходе
Canvas → Docs React Aria читает этот getter с prototype, из-за чего Chrome
выбрасывает `TypeError: Illegal invocation`.

Loader в `preview.ts` выполняется после core loaders Storybook и возвращает
нативный method descriptor. Исправление применяется только при наличии
проблемного getter и не заменяет обычные focus wrappers компонентов.

`.storybook/visual-tests/docs.spec.ts` воспроизводит именно переход через
manager UI. Не заменяйте его прямым открытием Docs URL: при полной перезагрузке
preview runtime исходная ошибка не воспроизводится.

## Зачем нужны Storybook adapters

Компоненты слоя обычно работают внутри Nuxt и получают часть возможностей
автоматически. Storybook использует чистый Vue runtime, поэтому `preview.ts`
явно добавляет:

- новый Pinia instance для каждой story;
- простой browser-only `ClientOnly`;
- `SelectRoot`, который в приложении регистрирует модуль Reka UI.

`nuxt-imports.ts` заменяет только два composable, нужных ThemeSwitcher:
`useCookie` и `useHead`. Это не общий mock Nuxt runtime. Если новый компонент
использует другой auto-imported composable, добавьте узкий адаптер и опишите,
какой сценарий он покрывает.

## Где искать проблемы

- Story не найдена: проверьте globs в `main.ts`.
- Не разрешается `#layers/ui`: проверьте Vite aliases в `main.ts`.
- SCSS не видит mixin/variable: проверьте `getSharedScssAdditionalData`.
- Компонент доступен в Nuxt, но не в Storybook: зарегистрируйте его в
  `preview.ts` или импортируйте явно в исходном компоненте.
- `Illegal invocation` при открытии Docs: запустите `docs.spec.ts` и проверьте
  compatibility loader `restoreNativeHTMLElementFocus` в `preview.ts`.
- `ERR_CONNECTION_REFUSED` на Windows: не удаляйте IPv4 `browser.api.host`
  из `vitest.config.ts`.
