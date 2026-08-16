# Storybook Color Palette Synchronization

## Goal

Prevent displayed color values in `Colors` from diverging from the CSS custom properties defined in `app/config/styles/colors.scss`.

## Design

Keep the existing token names and human-readable roles in `DesignSystem.stories.ts`. Remove the duplicated hexadecimal values from that list. When the story is created in the browser, read each token's current value from `document.documentElement` with `getComputedStyle(...).getPropertyValue(tokenName).trim()`.

Storybook already imports `app/config/styles/index.scss`, which loads `colors.scss`, so the story needs no direct SCSS import or build configuration change. The color swatches continue to use `var(--token)` and therefore show the same applied value that is printed beneath them.

## Scope

- Change only `layers/ui/app/common/components/DesignSystem/stories/DesignSystem.stories.ts`.
- Keep the current palette token order and role descriptions.
- Do not automatically discover new variables from `colors.scss`.
- Do not change theme handling, Storybook configuration, or `colors.scss`.

## Verification

- Add a focused story test that proves the printed value comes from the active CSS custom property rather than a hexadecimal literal in the story data.
- Run the focused test through the Storybook Vitest project.
- Run Nuxt typecheck because a `.ts` file changes.
