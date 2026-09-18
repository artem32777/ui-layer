export const Theme = {
	light: 'theme-light',
	dark: 'theme-dark',
} as const

export type ThemeNames = typeof Theme[keyof typeof Theme]

export const ThemeNamesArray = Object.values(Theme)
