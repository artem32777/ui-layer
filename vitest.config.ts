/**
 * Compatibility bridge for @storybook/addon-vitest.
 *
 * Storybook 10.5 searches for Vitest configuration only from the package root
 * upwards. The actual, fully documented config lives in `.storybook`, while
 * this re-export keeps both the Storybook testing widget and plain `vitest`
 * CLI auto-discovery working.
 */
export { default } from './.storybook/vitest.config'
