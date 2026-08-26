---
name: figma-icons
description: Экспортирует SVG-иконки с Figma-фрейма в `layers/ui/app/modules/svg-icon/icon-source` через локальный Figma Dev Mode MCP (`http://127.0.0.1:3845/mcp`). Имя файла = имя иконки справа от SVG в макете. Использовать, когда пользователь просит перенести/скачать/экспортировать иконки из Figma во svg-icon, icon-source, или даёт фрейм с иконками в Dev Mode.
---

# Экспорт иконок Figma → svg-icon

Контракт проекта: исходники только в `layers/ui/app/modules/svg-icon/icon-source`. `iconNames.ts` генерируется сам — руками не править.

## MCP

Предпочитать **локальный** Dev Mode MCP: `http://127.0.0.1:3845/mcp` (Figma desktop, Dev Mode).

Плагинный `plugin-figma-figma` часто отваливается или отдаёт только `mcp_auth` — не ждать его. `use_figma` + `exportAsync` обрезает большие ответы (~20kb); для сотен иконок не использовать.

Если `127.0.0.1:3845` недоступен — остановиться и сказать пользователю включить Dev Mode MCP в Figma.

## Порядок

1. Из URL взять `fileKey` и `node-id` фрейма (`47-3887` → `47:3887`).
2. Запустить скрипт из этой skill (см. ниже). Он:
   - поднимает MCP-сессию;
   - `get_metadata` по фрейму → все `<symbol>`;
   - для каждой недостающей (или всех с `--all`) вызывает `get_design_context`;
   - качает SVG с `http://localhost:3845/assets/….svg`;
   - пишет `<имя>.svg` в `icon-source`.
3. Имя файла = `name` у `<symbol>` (в макете совпадает с подписью справа). Известные ошибки имён слоёв — в [scripts/name-overrides.json](scripts/name-overrides.json).
4. Не удалять чужие иконки вне фрейма (например `themeDark`), если пользователь не просил.
5. После экспорта проверить число файлов и пару SVG (`<svg` + `viewBox`).

## Скрипт

```bash
node .agents/skills/figma-icons/scripts/export-frame-icons.mjs --node-id=47:3887
```

Опции:

| Флаг | По умолчанию | Смысл |
|------|--------------|--------|
| `--node-id` | обязателен | id фрейма |
| `--out` | `layers/ui/app/modules/svg-icon/icon-source` | куда писать |
| `--mcp` | `http://127.0.0.1:3845/mcp` | URL MCP |
| `--all` | выкл. | перезаписать уже существующие |
| `--overrides` | `scripts/name-overrides.json` | `nodeId → filename` |

Скрипт сам докачивает только отсутствующие файлы (без `--all`).

## Ручной fallback (одна иконка)

Если скрипт нельзя запустить:

1. MCP `tools/call` → `get_design_context` с `nodeId` иконки.
2. В ответе взять URL вида `http://localhost:3845/assets/<hash>.svg`.
3. `curl -sL -o icon-source/<name>.svg "<url>"`.

## Не делать

- Не рисовать path руками и не подставлять иконки из других наборов.
- Не править `runtime/iconNames.ts`.
- Не класть PNG вместо SVG.
