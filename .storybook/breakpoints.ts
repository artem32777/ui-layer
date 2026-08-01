import type { ViewportMap, ViewportType } from 'storybook/viewport'
import { existsSync, readFileSync } from 'node:fs'

interface Breakpoint {
	name: string
	width: number
}

const fallbackBreakpoints: Breakpoint[] = [
	{ name: '320', width: 320 },
	{ name: '768', width: 768 },
	{ name: '1280', width: 1280 },
	{ name: '1920', width: 1920 },
]

/**
 * Reads pixel-valued Sass variables and converts them to Storybook viewport options.
 * Falls back to the standard project widths when the file is missing or contains no
 * supported breakpoint declarations.
 */
export function getBreakpointViewports(filePath: string): ViewportMap {
	const breakpoints = existsSync(filePath)
		? parseBreakpoints(readFileSync(filePath, 'utf8'))
		: fallbackBreakpoints

	return Object.fromEntries(
		(breakpoints.length > 0 ? breakpoints : fallbackBreakpoints)
			.sort((left, right) => left.width - right.width)
			.map(({ name, width }) => [
				name,
				{
					name: `${name} — ${width}px`,
					styles: {
						width: `${width}px`,
						height: '100%',
					},
					type: getViewportType(width),
				},
			]),
	)
}

function parseBreakpoints(source: string): Breakpoint[] {
	const sourceWithoutComments = source
		.replace(/\/\*[\s\S]*?\*\//g, '')
		.replace(/\/\/.*$/gm, '')
	const declarationPattern
		= /^\s*\$([\w-]+)\s*:\s*(\d+(?:\.\d+)?)px(?:\s*![\w-]+)*\s*;/gm
	const breakpoints = new Map<string, number>()

	for (const match of sourceWithoutComments.matchAll(declarationPattern)) {
		const [, name, rawWidth] = match
		const width = Number(rawWidth)

		if (name && Number.isFinite(width) && width > 0) {
			breakpoints.set(name, width)
		}
	}

	return Array.from(breakpoints, ([name, width]) => ({ name, width }))
}

function getViewportType(width: number): ViewportType {
	if (width < 768) {
		return 'mobile'
	}

	if (width < 1280) {
		return 'tablet'
	}

	return 'desktop'
}
