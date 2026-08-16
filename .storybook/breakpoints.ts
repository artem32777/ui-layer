import type { ViewportMap, ViewportType } from 'storybook/viewport'

interface Breakpoint {
	name: string
	width: number
}

/**
 * Converts pixel-valued Sass variables to Storybook viewport options.
 */
export function getBreakpointViewports(source: string): ViewportMap {
	const breakpoints = parseBreakpoints(source)

	if (breakpoints.length === 0) {
		throw new Error('No pixel breakpoints found')
	}

	return Object.fromEntries(
		breakpoints
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
