---
name: figma-variables
description: Выгружает все local variables Figma-файла (коллекции, моды, алиасы, hex) и записывает их в `.agents/skills/figma-variables/variables.scss`. Имена как в Figma Dev Mode: `--background-interactive-primary`, без коллекции и без суффикса мода; дефолтный мод в `:root`, остальные — классами (`.dark`). Использовать, когда нужны все переменные или токены файла, а не токены выбранного фрейма; когда пользователь говорит про Local variables, design tokens, collections.
---

# Все переменные Figma-файла

`get_variable_defs` отдаёт только токены выбранного нода. Окно Local variables открывать не нужно.

Читать весь файл через Plugin API в контексте Figma (`figma.variables.*`). В Cursor это `use_figma`; в других средах — тот же JS, если есть выполнение Plugin API. `fileKey` брать из URL.

Перед `use_figma` загрузить skill `figma-use` и передать `skillNames: "figma-use"`. Код без async IIFE, без `figma.notify`/`console.log`, результат только через `return`.

## Порядок

1. Если MCP отвалился — крошечный тест: `return { editorType: figma.editorType, fileName: figma.root.name };`
2. Список коллекций (быстро, почти всегда проходит).
3. Значения — пакетами по именам коллекций, не всё одним `return`. Большой дамп часто падает (`fetch failed`) или обрезается (~20kb). Цвета (`Colors`, `Core - colors`, `Semantic - colors`) отдельным вызовом от spacing/radius/typography/size.
4. Если auto-review блокирует широкий дамп — сразу тот же вызов с `requestSmartModeApproval`.
5. Алиасы сериализовать в `{ alias: "имя" }`, цвета в hex / `{ hex, a }`. В дамп переменной класть `web: variable.codeSyntax.WEB || null`.
6. Когда собраны **все** коллекции — перезаписать `.agents/skills/figma-variables/variables.scss` (та же папка, что и этот `SKILL.md`). Не писать файл после каждого пакета. Не подключать его в приложение, пока пользователь не попросил.

## Запись в `variables.scss`

Файл целиком, UTF-8, только через Write/StrReplace (не PowerShell).

Имена **как в Figma Dev Mode**, не «коллекция + имя + мод».

```scss
:root {
  /* Semantic - colors */
  --background-interactive-primary: var(--primary-500);
  /* Core - colors */
  --primary-500: #310519;
  --white-100: #ffffff;
}

.dark {
  /* Semantic - colors */
  --background-interactive-primary: var(--white-100);
}
```

### Имена (`--*`)

База = **только имя переменной** (`background/interactive/primary` → `--background-interactive-primary`). Имя коллекции (`Semantic - colors`, `Core - colors`) в токен **не входит**. Суффикс мода (`--white`, `--dark`) к имени **не добавлять**.

Если задан `codeSyntax.WEB` — взять его: убрать обёртку `var(…)`, добавить `--`, если нет. Иначе из имени:

- слэши, пробелы и скобки → `-`; выкинуть эмодзи и прочий мусор; схлопнуть `-`; lowercase;
- разбить по `-` и **схлопнуть подряд идущие одинаковые сегменты**: `white/white-100` → `--white-100`, `primary/primary-500` → `--primary-500`; `background/interactive/primary` не трогать.

Алиас → `var(--css-имя-цели)` по той же схеме **только из имени цели** (коллекцию цели не приписывать). Если цели нет в дампе — сырое значение не выдумывать, оставить `/* unresolved alias: ... */`.

### Моды — классы, не суффиксы

Одна и та же переменная на всех модах называется одинаково. Значение дефолтного мода — в `:root`. Остальные моды — селекторы `.{slug}` (`.dark`, `.grey`, `.tablet`), как темы в Dev Mode.

Дефолтный мод (первый совпавший, без учёта регистра): `Default`, затем `Mode 1`, затем `White`, иначе первый мод коллекции. Если мод один — только `:root`, класс не создавать.

Селектор мода: `.` + слаг lowercase (`dark` → `.dark`). Если слаг начинается с цифры — префикс `m-` (`.m-1600`), иначе класс в CSS невалиден.

В блок `.{mode}` писать **только свойства, чьё значение отличается от дефолта**. Несколько коллекций с одним именем мода (White/Grey/Dark) сливать в один класс, внутри группировать комментарием по коллекции.

Порядок в файле: сначала весь `:root` (коллекции как в дампе, внутри — по имени переменной), затем классы модов в порядке первого появления.

Значения:
- FLOAT → `Npx` (сохранить знак; дробные без лишних нулей);
- COLOR hex без альфы → `#rrggbb`; с альфой → `rgb(r g b / a)`;
- STRING → `"значение"`.

После записи перечитать файл как UTF-8 и проверить, что кириллица не сломалась.

## Список коллекций

```js
const collections = await figma.variables.getLocalVariableCollectionsAsync();
return collections.map((c) => ({
  name: c.name,
  varCount: c.variableIds.length,
  modes: c.modes.map((m) => m.name)
}));
```

## Скрипт пакета

Подставить имена коллекций в `wanted`:

```js
const wanted = new Set(["Border-radius", "Spacing"]);
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const allIds = collections.flatMap((c) => c.variableIds);
const fetched = await Promise.all(allIds.map((id) => figma.variables.getVariableByIdAsync(id)));
const byId = new Map();
for (const v of fetched) { if (v) byId.set(v.id, v); }
function serializeValue(value) {
  if (value == null) return null;
  if (typeof value !== "object") return value;
  if (value.type === "VARIABLE_ALIAS") {
    const target = byId.get(value.id);
    if (!target) return { alias: value.id };
    const col = collections.find((c) => c.id === target.variableCollectionId);
    return { alias: target.name, collection: col ? col.name : null };
  }
  if ("r" in value && "g" in value && "b" in value) {
    const r = Math.round(value.r * 255);
    const g = Math.round(value.g * 255);
    const b = Math.round(value.b * 255);
    const a = value.a == null ? 1 : value.a;
    const hex = "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("");
    return a < 1 ? { hex, a } : hex;
  }
  return value;
}
return collections.filter((c) => wanted.has(c.name)).map((collection) => {
  const modeNames = {};
  for (const m of collection.modes) modeNames[m.modeId] = m.name;
  return {
    name: collection.name,
    modes: collection.modes.map((m) => m.name),
    variables: collection.variableIds.map((id) => byId.get(id)).filter(Boolean).map((v) => {
      const values = {};
      for (const [modeId, value] of Object.entries(v.valuesByMode)) {
        values[modeNames[modeId] || modeId] = serializeValue(value);
      }
      return { name: v.name, type: v.resolvedType, web: (v.codeSyntax && v.codeSyntax.WEB) || null, values };
    })
  };
});
```
