## Установка

```bash
npm ci
```

Зависимости устанавливаются в версиях из `package-lock.json`. После установки
Nuxt автоматически создаёт служебные файлы и типы.

Для визуальных тестов также нужен браузер Playwright:

```bash
npx playwright install chromium
```

## Приложение

| Команда | Что делает |
| --- | --- |
| `npm run dev` | Запускает dev-сервер на `192.168.1.125` с hot reload и открывает приложение в браузере. |
| `npm run build` | Собирает production-версию в `.output`. |
| `npm run preview` | Локально запускает готовую production-сборку для проверки. |
| `npm run generate` | Генерирует статическую версию приложения. |

## Storybook

Опубликованный Storybook: https://artem32777.github.io/ui-layer/

| Команда | Что делает |
| --- | --- |
| `npm run storybook` | Запускает Storybook на порту `6006`. |
| `npm run build-storybook` | Собирает статический Storybook в `.storybook/storybook-static`. |

Публикация запускается автоматически при push в `master` или вручную через
workflow `Deploy Storybook to GitHub Pages`. Перед первым запуском выберите
`GitHub Actions` в `Settings → Pages → Build and deployment → Source`.

## Тесты

| Команда | Что делает |
| --- | --- |
| `npm run test:stories` | Один раз запускает тесты компонентов через Vitest. |
| `npm run test:stories:watch` | Перезапускает тесты компонентов при изменении файлов. |
| `npm run test:visual` | Запускает визуальные тесты Playwright. Тестовый Storybook поднимается автоматически. |
| `npm run test:visual:update` | Обновляет эталонные снимки визуальных тестов. Используйте только после проверки изменений интерфейса. |

## Автоматические скрипты

Скрипт `postinstall` выполняет `nuxt prepare` после установки зависимостей.
Запускать его вручную не нужно.
