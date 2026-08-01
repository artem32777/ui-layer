import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, extname, isAbsolute, join, relative } from 'node:path'
import { createResolver, defineNuxtModule } from 'nuxt/kit'

const normalizeIconName = (path) => path
	.replace(/\.svg$/i, '')
	.replace(/[\\/]/g, '-')
	.replace(/[^a-zA-Z0-9-]/g, '-')
	.replace(/-+/g, '-')
	.replace(/^-|-$/g, '')
const getSvgIconFiles = (dir, baseDir = dir, recursive = true) => readdirSync(dir)
	.flatMap((name) => {
		const path = join(dir, name)
		const stat = statSync(path)
		if (stat.isDirectory()) {
			return recursive
				? getSvgIconFiles(path, baseDir, recursive)
				: []
		}
		return extname(name).toLowerCase() === '.svg'
			? [relative(baseDir, path)]
			: []
	})
const normalizeFsPath = (path) => path.replace(/\\/g, '/')
const getSvgIconData = (content) => {
	const match = content.match(/<svg\s*([^>]*)>([\s\S]*?)<\/svg>/i)
	const attrs = match?.[1]
	const body = match?.[2]
	if (!attrs || !body) {
		return {
			attrs: {},
			body: content,
		}
	}
	return {
		attrs: Object.fromEntries([...attrs.matchAll(/([:\w-]+)(?:="([^"]*)")?/g)]
			.map(([, name, value = '']) => [name, value])),
		body,
	}
}
const getIconFiles = (iconsDir, recursive) => existsSync(iconsDir)
	? getSvgIconFiles(iconsDir, iconsDir, recursive)
			.map((path) => {
				const normalizedPath = normalizeFsPath(path)
				const dir = dirname(normalizedPath)
				const name = normalizeIconName(normalizedPath)
				return {
					dir: dir === '.' ? '' : dir,
					name,
					path: normalizedPath,
					absolutePath: join(iconsDir, path),
				}
			})
			.sort((a, b) => a.path.localeCompare(b.path))
	: []
const buildIconNamesContent = (files, rootGroupTitle) => {
	const iconNames = files.length
		? files.map(({ name }) => `\t${JSON.stringify(name)}: ${JSON.stringify(name)},`).join('\n')
		: ''
	const svgIconData = files.length
		? files.map(({ absolutePath, name }) => `\t${JSON.stringify(name)}: ${JSON.stringify(getSvgIconData(readFileSync(absolutePath, 'utf8')))},`).join('\n')
		: ''
	const rootIcons = files.filter(({ dir }) => !dir)
	const folderNames = Array.from(new Set(files.map(({ dir }) => dir).filter(Boolean))).sort((a, b) => a.localeCompare(b))
	const groups = [
		{ dir: '', title: rootGroupTitle, icons: rootIcons },
		...folderNames.map(dir => ({
			dir,
			title: dir,
			icons: files.filter(file => file.dir === dir),
		})),
	]
	const iconGroups = groups.map(({ dir, title, icons }) => {
		const groupIcons = icons.length
			? icons.map(({ name }) => `\t\t${JSON.stringify(name)}: iconNames[${JSON.stringify(name)}],`).join('\n')
			: ''
		return `\t{
\t\tdir: ${JSON.stringify(dir)},
\t\ttitle: ${JSON.stringify(title)},
\t\ticons: {
${groupIcons}
\t\t},
\t},`
	}).join('\n')
	return `export const iconNames = {
${iconNames}
} as const

export type IconName = keyof typeof iconNames

export const iconNameList = Object.keys(iconNames) as IconName[]

export const svgIconData = {
${svgIconData}
} as const satisfies Record<IconName, SvgIconData>

interface SvgIconData {
	attrs: Record<string, string>
	body: string
}

export const iconGroups = [
${iconGroups}
] as const
`
}
const writeIconNames = (iconsDir, iconNamesPath, rootGroupTitle, recursive) => {
	mkdirSync(dirname(iconNamesPath), { recursive: true })
	writeFileSync(iconNamesPath, buildIconNamesContent(getIconFiles(iconsDir, recursive), rootGroupTitle))
}
const resolvePath = (path, resolve) => isAbsolute(path)
	? path
	: resolve(path)
export default defineNuxtModule({
	meta: {
		name: 'svg-icons',
		configKey: 'svgIcons',
	},
	defaults: {
		iconsDir: './icon-source',
		runtimeIconNamesPath: './runtime/iconNames.ts',
		rootGroupTitle: 'Корень',
		recursive: true,
	},
	setup(options, nuxt) {
		const { resolve } = createResolver(import.meta.url)
		const iconsDir = resolvePath(options.iconsDir, resolve)
		const iconNamesPath = resolvePath(options.runtimeIconNamesPath, resolve)
		writeIconNames(iconsDir, iconNamesPath, options.rootGroupTitle, options.recursive)
		if (nuxt.options.dev) {
			let writeIconNamesTimeout
			const scheduleWriteIconNames = () => {
				if (writeIconNamesTimeout) {
					clearTimeout(writeIconNamesTimeout)
				}
				writeIconNamesTimeout = setTimeout(() => {
					writeIconNames(iconsDir, iconNamesPath, options.rootGroupTitle, options.recursive)
					writeIconNamesTimeout = undefined
				}, 50)
			}
			nuxt.options.watch.push(iconsDir)
			nuxt.hook('builder:watch', (event, path) => {
				const changedPath = isAbsolute(path)
					? path
					: join(nuxt.options.srcDir, path)
				if (['add', 'change', 'unlink'].includes(event)
					&& extname(path).toLowerCase() === '.svg'
					&& normalizeFsPath(changedPath).startsWith(normalizeFsPath(iconsDir))) {
					scheduleWriteIconNames()
				}
			})
		}
	},
})
